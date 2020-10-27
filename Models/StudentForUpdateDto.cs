using System.Collections.Generic;
using Rozklad.API.Helpers;

namespace Rozklad.API.Models
{
    public class StudentForUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Group { get; set; }
        [ListOfObjectIdThatExists]
        public IEnumerable<string> Subjects { get; set; } = new List<string>();
    }
}