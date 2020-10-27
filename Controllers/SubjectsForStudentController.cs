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

        [HttpGet(Name = "GetSubjectsForStudent")]
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

        [HttpPatch("add")]
        public ActionResult AddSubjects(string studentId, SubjectsToStudentOperatins subjectToAdd)
        {
            var studentFromRepo = _repository.GetStudent(studentId);
            if (studentId == null)
            {
                return NotFound();
            }

            foreach (var subjectId in subjectToAdd.Subjects)
            {
                if (_repository.SubjectExists(subjectId))
                    _repository.AddSubjectToStudent(studentFromRepo.Id, subjectId);
            }

            _repository.UpdateStudent(studentFromRepo.Id, studentFromRepo);
            _repository.Save();
            var subjectsEntities = _repository.GetSubjectsForStudent(studentId, false);
            var subjectsDtos = subjectsEntities.Select(s => _mapper.Map<SubjectDto>(s)).ToList();
            return CreatedAtRoute("GetSubjectsForStudent", new { }, subjectsDtos);
            // Todo GET available subjects to add 
        }
        [HttpPatch("remove")]
        public ActionResult DeleteSubjects(string studentId, SubjectsToStudentOperatins subjectToDelete)
        {
            var studentFromRepo = _repository.GetStudent(studentId);
            if (studentId == null)
            {
                return NotFound();
            }

            foreach (var subjectId in subjectToDelete.Subjects)
            {
                if (_repository.SubjectExists(subjectId))
                    _repository.DeleteSubjectFromStudent(studentFromRepo.Id, subjectId);
            }

            _repository.UpdateStudent(studentFromRepo.Id, studentFromRepo);
            _repository.Save();
            var subjectsEntities = _repository.GetSubjectsForStudent(studentId, false);
            var subjectsDtos = subjectsEntities.Select(s => _mapper.Map<SubjectDto>(s)).ToList();
            return CreatedAtRoute("GetSubjectsForStudent", new { }, subjectsDtos);
            // Todo GET available subjects to add 
        }

        [HttpGet("choice")]
        public ActionResult<IEnumerable<SubjectDto>> GetAvailableSubjects(string studentId)
        {
            if (!_repository.StudentExists(studentId))
            {
                return NotFound();
            }
            var subjectFromRepo = _repository.GetAvailableSubjectsForStudent(studentId);
            var subjectsDtos = subjectFromRepo.Select(s => _mapper.Map<SubjectDto>(s)).ToList();

            return subjectsDtos;
        } 
    }
}