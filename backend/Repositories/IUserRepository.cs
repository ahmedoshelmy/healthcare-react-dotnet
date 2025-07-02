using backend.Models;

namespace backend.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<int> AddAsync(User user);
}
