using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Rozklad.API.Entities.NestedItems
{
    public class LinkInfo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [Key]
        public string Id { get; set; }
        [BsonElement("url")]
        public string Url { get; set; }
        [BsonElement("accessCode")]
        public string AccessCode { get; set; }
    }
}