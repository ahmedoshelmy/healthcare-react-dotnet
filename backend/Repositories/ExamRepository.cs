using Dapper;
using backend.Models;
using backend.Data;
using System.Text;
using backend.DTOs;

namespace backend.Repositories;

public class ExamRepository : IExamRepository
{
    private readonly DapperContext _context;

    public ExamRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Exam>> GetAllAsync(ExamFilter? filter = null)
    {
        var query = new StringBuilder("SELECT * FROM Exams WHERE 1=1");
        var parameters = new DynamicParameters();
        if (filter != null)
        {
            if (!string.IsNullOrWhiteSpace(filter.PatientId))
            {
                query.Append(" AND PatientId = @PatientId");
                parameters.Add("PatientId", filter.PatientId);
            }

            if (!string.IsNullOrWhiteSpace(filter.PatientName))
            {
                query.Append(" AND PatientName LIKE @PatientName");
                parameters.Add("PatientName", $"%{filter.PatientName}%");
            }

            if (!string.IsNullOrWhiteSpace(filter.Gender))
            {
                query.Append(" AND Gender = @Gender");
                parameters.Add("Gender", filter.Gender);
            }

            if (filter.Birthdate.HasValue)
            {
                query.Append(" AND Birthdate = @Birthdate");
                parameters.Add("Birthdate", filter.Birthdate.Value.Date);
            }

            if (!string.IsNullOrWhiteSpace(filter.Email))
            {
                query.Append(" AND Email = @Email");
                parameters.Add("Email", filter.Email);
            }

            if (!string.IsNullOrWhiteSpace(filter.ExamType))
            {
                query.Append(" AND ExamType = @ExamType");
                parameters.Add("ExamType", filter.ExamType);
            }

            if (filter.ExamDateFrom.HasValue)
            {
                query.Append(" AND ExamDate >= @ExamDateFrom");
                parameters.Add("ExamDateFrom", filter.ExamDateFrom.Value);
            }

            if (filter.ExamDateTo.HasValue)
            {
                query.Append(" AND ExamDate <= @ExamDateTo");
                parameters.Add("ExamDateTo", filter.ExamDateTo.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.Status))
            {
                query.Append(" AND Status = @Status");
                parameters.Add("Status", filter.Status);
            }
        }

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Exam>(query.ToString(), parameters);
    }

    public async Task<int> AddAsync(Exam exam)
    {
        var query = @"
            INSERT INTO Exams (
                PatientId, PatientName, Gender, Birthdate, Email,
                ExamType, ExamDate, Comments, Status
            ) VALUES (
                @PatientId, @PatientName, @Gender, @Birthdate, @Email,
                @ExamType, @ExamDate, @Comments, @Status
            )";

        using var connection = _context.CreateConnection();
        return await connection.ExecuteAsync(query, exam);
    }
}
