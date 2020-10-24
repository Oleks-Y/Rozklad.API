using System.ComponentModel.DataAnnotations;

namespace Rozklad.API.Models
{
    public class StudentLoginData
    {
        [Required]
        public string Lastname{ get; set; }
        public string Group { get; set; }
    }
}