using backend.DTOs;
using backend.Models;

namespace backend.Repositories;

public interface IExamRepository
{
    Task<IEnumerable<Exam>> GetAllAsync(ExamFilter? filter = null);
    Task<int> AddAsync(Exam exam);
}
