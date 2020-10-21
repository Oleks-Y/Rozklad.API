using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoOrm.Models;
using Rozklad.API.Entities.NestedItems;

namespace Rozklad.API.Entities
{
    public class LessonWithSubject : IDocument
    {
        [Key]
        public string Id { get; set; }
        
        // [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public Subject Subject { get; set; }
        
        [Required]
        [EnumDataType(typeof(Weeks))]
        public int Week { get; set; }
        
        [Required]
        [EnumDataType(typeof(DaysOfWeek))]
        public int DayOfWeek { get; set; }
        
        [Required]
        [RegularExpression("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")]
        public string TimeStart { get; set; }
        // Todo ["Лек", "Лаб"] 
        public string Type { get; set; }
    }
    
    
}