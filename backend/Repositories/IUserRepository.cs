using backend.Models;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    bool VerifyPassword(string password, string storedHash);
    string HashPassword(string password);
    Task<bool> CreateAsync(User user);

}
