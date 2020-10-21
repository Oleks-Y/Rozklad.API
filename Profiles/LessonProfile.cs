using AutoMapper;

namespace Rozklad.API.Profiles
{
    public class LessonProfile : Profile
    {
        public LessonProfile()
        {
            CreateMap<Entities.Lesson, Models.LessonDto>();

            CreateMap<Entities.LessonWithSubject, Models.LessonWithSubjectDto>();
        }

    }
}