using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoOrm.Models;

namespace Rozklad.API.Entities
{
    [BsonIgnoreExtraElements]
    public class Lesson : IDocument
    {    //Todo add validation
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [Key]
        public string Id { get; set; }
        
        // [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        [BsonElement("subject")]
        public ObjectId Subject { get; set; }
        
        [Required]
        [EnumDataType(typeof(Weeks))]
        [BsonElement("week")]
        public int Week { get; set; }
        
        [Required]
        [EnumDataType(typeof(DayOfWeek))]
        [BsonElement("dayOfWeek")]
        public int DayOfWeek { get; set; }
        
        [Required]
        [RegularExpression("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")]
        [BsonElement("timeStart")]
        public string TimeStart { get; set; }
        // Todo ["Лек", "Лаб"] 
        [BsonElement("type")]
        public string Type { get; set; }
        
        // public Subject Subject { get; set; }

    }

    
    
}