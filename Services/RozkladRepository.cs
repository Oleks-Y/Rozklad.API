﻿using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Rozklad.API.DataAccess;
using Rozklad.API.Entities;
using Rozklad.API.Exceptions;

namespace Rozklad.API.Services
{
    public class RozkladRepository : IRozkladRepository
    {
        private readonly ApplicationDbContext _context;

        public RozkladRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IEnumerable<Subject> GetSubjects()
        {
            return _context.Subjects.OrderBy(s => s.IsRequired).ToList();
        }

        public Subject GetSubject(string subjectId)
        {
            return _context.Subjects.FirstOrDefault(s => s.Id == subjectId);
        }

        public IEnumerable<Lesson> GetLessons()
        {
            return _context.Lessons.OrderBy(l => l.Week)
                .ThenBy(l => l.DayOfWeek)
                .ThenBy(l => l.TimeStart)
                .ToList();
        }

        public Lesson GetLesson(string lessonId)
        {
            return _context.Lessons.FirstOrDefault(l => l.Id == lessonId);
        }

        public IEnumerable<Student> GetStudents()
        {
            return _context.Students.OrderBy(s => s.LastName)
                .ToList();
        }

        public Student GetStudent(string studentId)
        {
            return _context.Students.FirstOrDefault(s => s.Id == studentId);
        }

        public void AddSubject(Subject subject)
        {
            if (subject == null)
            {
                throw new ArgumentNullException(nameof(subject));
            }

            // Todo set Id 
            _context.Subjects.Create(subject);
        }

        public void AddLesson(Lesson lesson)
        {
            if (lesson == null)
            {
                throw new ArgumentNullException(nameof(lesson));
            }

            _context.Lessons.Create(lesson);
        }

        public void AddStudent(Student student)
        {
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }

            _context.Students.Create(student);
        }

        public void UpdateSubject(string subjectId, Subject subject)
        {
        }

        public void UpdateLesson(string lessonId, Lesson lesson)
        {
        }

        public void UpdateStudent(string studentId, Student student)
        {
        }

        public void DeleteSubject(Subject subject)
        {
            if (subject == null)
            {
                throw new ArgumentNullException(nameof(subject));
            }

            _context.Subjects.Remove(subject);
        }

        public void DeleteLesson(Lesson lesson)
        {
            if (lesson == null)
            {
                throw new ArgumentNullException(nameof(lesson));
            }

            _context.Lessons.Remove(lesson);
        }

        public void DeleteStudent(Student student)
        {
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }

            _context.Students.Remove(student);
        }

        // public void DeleteStudent(string studentId)
        // {
        //     if (string.IsNullOrEmpty(studentId))
        //     {
        //         throw new ArgumentNullException(nameof(studentId));
        //     }
        //     
        //     _context.Students.Remove(studentId);
        // }
        public bool StudentExists(string studentId)
        {
            ObjectId objectId;
            if (!ObjectId.TryParse(studentId, out objectId))
            {
                // throw new InvalidIdentifierException(nameof(studentId));
                return false;
            }

            return _context.Students.Any(s => s.Id == studentId);
        }

        // Add subjcet exist
        public bool SubjectExists(string subjectId)
        {
            ObjectId objectId;
            if (!ObjectId.TryParse(subjectId, out objectId))
            {
                // throw new InvalidIdentifierException(nameof(subjectId)); 
                return false;
            }

            return _context.Subjects.Any(s => s.Id == subjectId);
        }

        // Todo remove this logic to lib
        public LessonWithSubject GetLessonWithSubject(string lessonId)
        {
            var lesson = _context.Lessons.FirstOrDefault(l => l.Id == lessonId);
            if (lesson != null)
            {
                return new LessonWithSubject
                {
                    Id = lesson.Id,
                    Type = lesson.Type,
                    Subject = _context.Subjects.Get(lesson.Subject.ToString()),
                    Week = lesson.Week,
                    TimeStart = lesson.TimeStart,
                    DayOfWeek = lesson.DayOfWeek
                };
            }

            return null;
        }

        public IEnumerable<LessonWithSubject> GetLessonsWithSubjectsForStudent(string studentId)
        {
            //Todo add asyncronus grouping of data
            //Get required lessons 
            var requiredSubjects = _context.Subjects.Where(s => s.IsRequired);
            var requiredLessons = 
                (from subject in requiredSubjects 
                    from lesson in _context.Lessons 
                    where lesson.Subject.ToString() == subject.Id 
                    select GetLessonWithSubject(lesson.Id)).ToList();
            //Get optional lessons
            var optionalSubjectsForStudent = _context.Students.Get(studentId).Subjects.ToList();
            var optionalLessons = 
                (from subjectId in optionalSubjectsForStudent 
                    from lesson in _context.Lessons 
                    select GetLessonWithSubject(lesson.Id)).ToList();
            var lessonsResult = optionalLessons.Concat(requiredLessons);
            return lessonsResult;
        }

        public IEnumerable<Subject> GetSubjectsForStudent(string studentId, bool withRequired)
        {
            // Todo check if student exists
            var studentSubjects = _context.Students.FirstOrDefault(s => s.Id == studentId)?.Subjects.ToList();
            if (studentSubjects == null || !studentSubjects.Any())
            {
                return null;
            }

            var optionalSubjects = studentSubjects
                .Select(subjectId => _context.Subjects.Get(subjectId))
                .Where(subject => subject != null).ToList();
            if (!withRequired) return optionalSubjects;
            var requiredSubjects = _context.Subjects.Where(s => s.IsRequired).ToList();
            var resultSubjects = optionalSubjects.Concat(requiredSubjects);
            return requiredSubjects;
        }

        public void Save()
        {
            _context.SaveChangesAsync();
        }
    }
}