namespace backend.DTOs;

public class ExamFilter
{
    public string? PatientId { get; set; }
    public string? PatientName { get; set; }
    public string? Gender { get; set; }
    public DateTime? Birthdate { get; set; }
    public string? Email { get; set; }

    public string? ExamType { get; set; }
    public DateTime? ExamDateFrom { get; set; }
    public DateTime? ExamDateTo { get; set; }

    public string? Status { get; set; }
}
