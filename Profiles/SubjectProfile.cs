using AutoMapper;
using Rozklad.API.Entities;
using Rozklad.API.Models;

namespace Rozklad.API.Profiles
{
    public class SubjectProfile : Profile
    {
        public SubjectProfile()
        {
            CreateMap<Subject, SubjectDto>();
            CreateMap<SubjectToUpdate, Subject>();
            CreateMap<Subject, SubjectToUpdate>();
        }
    }
}