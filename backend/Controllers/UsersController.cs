using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly TokenService _tokenService;

    public UsersController(IUserRepository userRepo, TokenService tokenService)
    {
        _userRepo = userRepo;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        Console.WriteLine($"Login attempt for email: {dto.Email}");

        var user = await _userRepo.GetByEmailAsync(dto.Email);

        if (user == null)
        {
            Console.WriteLine("User not found.");
            return Unauthorized("Invalid credentials");
        }

        if (!_userRepo.VerifyPassword(dto.Password, user.PasswordHash))
        {
            Console.WriteLine("Password verification failed.");
            return Unauthorized("Invalid credentials");
        }

        var token = _tokenService.CreateToken(user);
        Console.WriteLine($"Token created for user: {user.Email}");

        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        });

        Console.WriteLine("JWT cookie set in response.");

        return Ok(new { message = "Login successful" });
    }
    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto dto)
    {
        // Check if user already exists
        var existingUser = await _userRepo.GetByEmailAsync(dto.Email);
        if (existingUser != null)
        {
            return BadRequest("Email is already registered");
        }

        // Hash the password
        var passwordHash = _userRepo.HashPassword(dto.Password);

        var newUser = new User
        {
            Email = dto.Email,
            PasswordHash = passwordHash,
            FullName = dto.FullName,
        };

        var created = await _userRepo.CreateAsync(newUser);
        if (!created)
        {
            return StatusCode(500, "Failed to create user");
        }

        return Ok(new { message = "User registered successfully" });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetCurrentUser()
    {
        Console.WriteLine("GetCurrentUser endpoint called.");
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        Console.WriteLine($"Extracted email from claims: {email}");
        return Ok(new { email });
    }

}
