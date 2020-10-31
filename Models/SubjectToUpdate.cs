using System.Collections.Generic;
using Rozklad.API.Entities.NestedItems;

namespace Rozklad.API.Models
{
    public class SubjectToUpdate
    {
        public string Name { get; set; }
        public string Teachers { get; set; }
        public IEnumerable<LinkInfo> LessonsZoom { get; set; }
        public IEnumerable<LinkInfo> LabsZoom { get; set; }
    }
}