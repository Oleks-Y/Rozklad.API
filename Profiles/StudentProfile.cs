using System.Collections.Generic;
using AutoMapper;

namespace Rozklad.API.Profiles
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<Entities.Student, Models.StudentDto>()
                .ForMember(
                    dest => dest.FullName,
                    opt =>
                        opt.MapFrom(src => $"{src.LastName} {src.FirstName[0]}."));


            CreateMap<Models.StudentForCreatingDto, Entities.Student>();
            // .ForMember(
            //     dest=>dest.Subjects,
            //     opt=>opt.MapFrom(_=> new List<string>()));
            CreateMap<Models.StudentForUpdateDto, Entities.Student>();
            CreateMap<Entities.Student,Models.StudentForUpdateDto>();
        }
    }
}