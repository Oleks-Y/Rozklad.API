using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Rozklad.API.Models;
using Rozklad.API.Services;

namespace Rozklad.API.Controllers
{
    [ApiController]
    [Route("api/subject")]
    public class SubjectsController : ControllerBase
    {
        private readonly IRozkladRepository _repository;
        private readonly IMapper _mapper;
        public SubjectsController(IRozkladRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPatch("{subjectId:objectId}")]
        public ActionResult PatchSubject(string subjectId, [FromBody] JsonPatchDocument<SubjectToUpdate> patchDocument)
        {
            if (patchDocument == null)
            {
                return BadRequest();
            }

            var subjectFromRepo = _repository.GetSubject(subjectId);
            if (subjectFromRepo == null)
            {
                return NotFound();
            }

            var subjectToPatch = _mapper.Map<SubjectToUpdate>(subjectFromRepo);
            patchDocument.ApplyTo(subjectToPatch, ModelState);
            if (!TryValidateModel(subjectToPatch))
            {
                return ValidationProblem();
            }

            _mapper.Map(subjectToPatch, subjectFromRepo);
            
            _repository.UpdateSubject(subjectFromRepo.Id, subjectFromRepo);
            
            _repository.Save();

            return NoContent();
        }

    }
}