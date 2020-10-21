using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoOrm.Models;
using Rozklad.API.Entities.NestedItems;

namespace Rozklad.API.Entities
{
    [BsonIgnoreExtraElements]
    public class Subject : IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [Key]
        public string Id { get; set; }
        
        [Required]
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("teachers")]
        public string Teachers { get; set; }    
        [BsonElement("lessonsZoom")]
        public IEnumerable<LinkInfo> LessonsZoom { get; set; }
        [BsonElement("labsZoom")]
        public IEnumerable<LinkInfo> LabsZoom { get; set; }
        [BsonElement("isRequired")]
        public bool IsRequired { get; set; }
        

    }
}