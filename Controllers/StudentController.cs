using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozklad.API.Entities;
using Rozklad.API.Models;
using Rozklad.API.Services;

namespace Rozklad.API.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly IRozkladRepository _repository;
        private readonly IMapper _mapper;
        public StudentController(IRozkladRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpGet("{studentId:objectId}", Name = "GetStudent")]
        public IActionResult Get(string studentId)
        {
            //Get student 
            // Map to studentDto 
            // Send
            var studentEntity = _repository.GetStudent(studentId);
            if (studentEntity == null)
            {
                return NotFound();
            }
            var studentDto =_mapper.Map<Entities.Student, Models.StudentDto>(studentEntity);
            return Ok(studentDto);
        }
        [HttpPost("login")]
        public ActionResult<string> LoginStudent([FromBody] StudentLoginData studentData)
        {
            var studentEntity = _repository.GetStudentByLastname(studentData.Lastname, studentData.Group);
            if (studentEntity == null)
            {
                return Unauthorized();
            }
            // var studentDto = _mapper.Map<Entities.Student, Models.StudentDto>(studentEntity);
            return Ok(new { student_id = studentEntity.Id});
        }
        [HttpPost]
        public ActionResult<StudentDto> Create([FromBody] StudentForCreatingDto studentForCreatingDto)
        {
            var studentEntity = _mapper.Map<Entities.Student>(studentForCreatingDto);
            _repository.AddStudent(studentEntity);
            _repository.Save();

            var studentToReturn = _mapper.Map<StudentDto>(studentEntity);
            return CreatedAtRoute("GetStudent", new
            {
                studentId = studentToReturn.Id
            }, studentToReturn);
        }

        [HttpPut("{studentId:objectId}")]
        public IActionResult UpdateStudent(string studentId, [FromBody] StudentForCreatingDto student)
        {
            
            var studentFromRepo = _repository.GetStudent(studentId);
            if (studentFromRepo == null)
            {
                // Student not exists, by REST PUT we must create new student
                var studentToAdd = _mapper.Map<Entities.Student>(student);
                studentToAdd.Id = studentId;
                _repository.AddStudent(studentToAdd);
                
                _repository.Save();

                var studentToReturn = _mapper.Map<StudentDto>(studentToAdd);
                return CreatedAtRoute("GetStudent", new
                {
                    studentId = studentToReturn.Id
                }, studentToReturn);
                
            }
            
            // course exist, we update one 
            _mapper.Map(student, studentFromRepo);
            
            _repository.UpdateStudent(studentId,studentFromRepo);
            
            _repository.Save();

            return NoContent();

        }

        [HttpDelete("{studentId:objectId}")]
        public ActionResult DeleteStudent(string studentId)
        {
            if (!_repository.StudentExists(studentId))
            {
                return NotFound();
            }
            
            var studentFromRepo = _repository.GetStudent(studentId);
            if (studentFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeleteStudent(studentFromRepo);

            return NoContent();
        }

    }
}