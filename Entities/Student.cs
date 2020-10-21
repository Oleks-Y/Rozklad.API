using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoOrm.Models;

namespace Rozklad.API.Entities
{
    [BsonIgnoreExtraElements]
    public class Student : IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [Key]
        public string Id { get; set; }

        [BsonElement("firstName")] 
        public string FirstName { get; set; }
        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("group")]
        public string Group { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("subjects")]
        public IEnumerable<string> Subjects { get; set; }
    }
}