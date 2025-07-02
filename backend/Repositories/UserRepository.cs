using Dapper;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DapperContext _context;

    public UserRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var query = "SELECT * FROM Users";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<User>(query);
    }

    public async Task<int> AddAsync(User user)
    {
        var query = "INSERT INTO Users (Name, Email) VALUES (@Name, @Email)";
        using var connection = _context.CreateConnection();
        return await connection.ExecuteAsync(query, user);
    }
}
