using System.Security.Cryptography;
using System.Text;
using Dapper;
using backend.Models;
using backend.Data;

namespace backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DapperContext _context;

    public UserRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var query = "SELECT * FROM Users WHERE Email = @Email";
        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(query, new { Email = email });
    }

    public bool VerifyPassword(string password, string storedHash)
    {
        var hash = HashPassword(password);
        return hash == storedHash;
    }

    public string HashPassword(string password)
    {
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = SHA256.HashData(bytes);
        return Convert.ToBase64String(hash);
    }

    public async Task<bool> CreateAsync(User user)
    {
        var query = @"INSERT INTO Users (Email, PasswordHash, FullName)
                      VALUES (@Email, @PasswordHash, @FullName)";
        using var connection = _context.CreateConnection();
        var result = await connection.ExecuteAsync(query, user);
        return result > 0;
    }
}
