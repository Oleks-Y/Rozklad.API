using System.Collections.Generic;
using Rozklad.API.Entities;

namespace Rozklad.API.Services
{
    public interface IRozkladRepository
    {
        // Todo get lessons for student 
        IEnumerable<Subject> GetSubjects();
        Subject GetSubject(string subjectId);

        IEnumerable<Lesson> GetLessons();
        Lesson GetLesson(string lessonId);
        IEnumerable<Subject> GetSubjectsForStudent(string studentId, bool withRequired);
        IEnumerable<Student> GetStudents();
        Student GetStudent(string studentId);

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
        void Save();

    }
}