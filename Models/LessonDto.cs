using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Rozklad.API.Entities;

namespace Rozklad.API.Models
{
    public class LessonDto
    {
        
        [Key]
        public string Id { get; set; }
        
        // [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public string Subject { get; set; }
        
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
    public enum Weeks
    {
        First=1,
        Two = 2
    }

    public enum DaysOfWeek
    {
        Monday=1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday
    }
}