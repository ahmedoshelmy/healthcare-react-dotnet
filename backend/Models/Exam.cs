using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Exam
    {
        public int Id { get; set; }

        // Patient Details
        [Required]
        public string PatientId { get; set; } = null!;

        [Required]
        public string PatientName { get; set; } = null!;

        [Required]
        [RegularExpression("Male|Female|Other", ErrorMessage = "Gender must be Male, Female, or Other")]
        public string Gender { get; set; } = null!;

        [Required]
        public DateTime Birthdate { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        // Exam Details
        [Required]
        public string ExamType { get; set; } = null!;  // e.g., "CT Brain", "Chest X-Ray"

        [Required]
        public DateTime ExamDate { get; set; }         // Includes both date & time

        public string? Comments { get; set; }

        // Status
        [Required]
        [RegularExpression("Scheduled|Arrived|Canceled|Completed", ErrorMessage = "Invalid status")]
        public string Status { get; set; } = null!;
    }
}
