using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamsController : ControllerBase
{
    private readonly IExamRepository _repo;

    public ExamsController(IExamRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ExamFilter filter)
    {
        var exams = await _repo.GetAllAsync(filter);
        return Ok(exams);
    }

    [HttpPost]
    public async Task<IActionResult> Add(Exam exam)
    {
        await _repo.AddAsync(exam);
        return Ok("Created");
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var exam = await _repo.GetByIdAsync(id);
        if (exam == null)
            return NotFound();
        return Ok(exam);
    }

}
