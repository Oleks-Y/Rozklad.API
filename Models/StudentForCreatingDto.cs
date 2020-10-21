using System.Collections.Generic;
using MongoDB.Bson;
using Rozklad.API.Helpers;
using Rozklad.API.Services;

namespace Rozklad.API.Models
{
    public class StudentForCreatingDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Group { get; set; }
        [ListOfObjectIdThatExists]
        public IEnumerable<string> Subjects { get; set; } = new List<string>();
    }
}