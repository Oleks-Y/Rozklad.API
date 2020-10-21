using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozklad.API.Models;
using Rozklad.API.Services;

namespace Rozklad.API.Controllers
{     
    [ApiController]
    [Route("api/student/{studentId:objectId}/timetable")]
    public class TimeTableController : ControllerBase
    {
        private readonly IRozkladRepository _repository;
        private readonly IMapper _mapper;
        public TimeTableController(IRozkladRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<LessonWithSubjectDto>> GetTimetable(string studentId)
        {
            // Todo optimize time of request
            if (!_repository.StudentExists(studentId))
            {
                return NotFound();
            }

            var lessonsEntities = _repository.GetLessonsWithSubjectsForStudent(studentId);
            var lessonDtos = lessonsEntities.Select(l => _mapper.Map<LessonWithSubjectDto>(l));
            return Ok(lessonDtos.OrderBy(l=>l.Week)
                .ThenBy(l=>l.DayOfWeek)
                .ThenBy(l=>l.TimeStart));
        }
    }
}