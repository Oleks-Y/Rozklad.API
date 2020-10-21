using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozklad.API.Models;
using Rozklad.API.Services;

namespace Rozklad.API.Controllers
{
    [ApiController]
    [Route("api/student/{studentId:objectId}/subject")]
    public class LessonForStudentController : ControllerBase
    {
        private readonly IRozkladRepository _repository;
        private readonly IMapper _mapper;
        public LessonForStudentController(IRozkladRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<SubjectDto>> GetLessons(string studentId, bool withRequired)
        {
            if (string.IsNullOrEmpty(studentId))
            {
                return NotFound();
            }

            var subjectsEntities = _repository.GetSubjectsForStudent(studentId, withRequired);
            var subjectsDtos = subjectsEntities.Select(s => _mapper.Map<SubjectDto>(s)).ToList();
            return subjectsDtos;
        }
    }
}