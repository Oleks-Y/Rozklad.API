using System.ComponentModel.DataAnnotations;

namespace Rozklad.API.Models
{
    public class StudentDto
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string Group { get; set; }
        // public IEnumerable<string> Subjects { get; set; }
    }
}