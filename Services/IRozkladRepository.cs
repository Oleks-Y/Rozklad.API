using System.Collections.Generic;
using System.Threading.Tasks;
using Rozklad.API.Entities;

namespace Rozklad.API.Services
{
    public interface IRozkladRepository
    {
        // Todo get lessons for student 
        IEnumerable<Subject> GetSubjects();
        Subject GetSubject(string subjectId);
        IEnumerable<Subject> GetAvailableSubjectsForStudent(string studentId);
        IEnumerable<Lesson> GetLessons();
        Lesson GetLesson(string lessonId);
        IEnumerable<Subject> GetSubjectsForStudent(string studentId, bool withRequired);
        void AddSubjectToStudent(string studentId, string subjectId);
        void DeleteSubjectFromStudent(string studentId, string subjectId);
        IEnumerable<Student> GetStudents();
        Student GetStudent(string studentId);
        Student GetStudentByLastname(string lastname, string group);
        void AddSubject(Subject subject);
        void AddLesson(Lesson lesson);
        void AddStudent(Student student);
        
        void UpdateSubject(string subjectId,Subject subject);
        void UpdateLesson(string lessonId,Lesson lesson);
        void UpdateStudent(string studentId,Student student);

        void DeleteSubject(Subject subject);
        void DeleteLesson(Lesson lesson);
        void DeleteStudent(Student student);

        bool StudentExists(string studentId);
        public bool SubjectExists(string subjectId);
        public LessonWithSubject GetLessonWithSubject(string lessonId);

        public IEnumerable<LessonWithSubject> GetLessonsWithSubjectsForStudent(string studentId);
        public Task<IEnumerable<LessonWithSubject>> GetLessonsWithSubjectsForStudentAsync(string studentId);
        void Save();

    }
}