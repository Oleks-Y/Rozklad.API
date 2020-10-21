using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Rozklad.API.Entities.NestedItems;

namespace Rozklad.API.Models
{
    public class SubjectDto
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Teachers { get; set; }
        public IEnumerable<LinkInfo> LessonsZoom { get; set; }
        public IEnumerable<LinkInfo> LabsZoom { get; set; }
        public bool IsRequired { get; set; }
    }
}