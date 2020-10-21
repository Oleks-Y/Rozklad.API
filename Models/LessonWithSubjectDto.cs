using System;
using System.ComponentModel.DataAnnotations;
using Rozklad.API.Entities;

namespace Rozklad.API.Models
{
    public class LessonWithSubjectDto
    {
        [Key]
        public string Id { get; set; }
        
        // [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public SubjectDto Subject { get; set; }
        
        [Required]
        [EnumDataType(typeof(Weeks))]
        public int Week { get; set; }
        
        [Required]
        [EnumDataType(typeof(DayOfWeek))]
        public int DayOfWeek { get; set; }
        
        [Required]
        [RegularExpression("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")]
        public string TimeStart { get; set; }
        // Todo ["Лек", "Лаб"] 
        public string Type { get; set; }
    }
}