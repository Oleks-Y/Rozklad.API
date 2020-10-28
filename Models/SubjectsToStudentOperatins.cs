using System.Collections.Generic;
using Rozklad.API.Helpers;

namespace Rozklad.API.Models
{
    public class SubjectsToStudentOperatins
    {
        [ListOfObjectIdThatExists]
        public IEnumerable<string> Subjects { get; set; } = new List<string>();
    }
}