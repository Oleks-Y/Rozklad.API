using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Rozklad.API.DataAccess.Configuration;
using Rozklad.API.Entities;

namespace Rozklad.API.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DatabaseSettings settings) : base(settings)
        {
            
        }

        public DbCollection<Lesson> Lessons { get; set; }

        public DbCollection<Student> Students { get; set; }
        
        public DbCollection<Subject> Subjects { get; set; }


        public void SaveChanges()
        {
            Lessons.Save();
            Students.Save();
            Subjects.Save();
        }
        
        public async Task SaveChangesAsync()
        {
            var tasks = new List<Task>()
            {
                Task.Run(() => Lessons.Save()),
                Task.Run(() => Students.Save()),
                Task.Run(() => Subjects.Save()),
            };

            await Task.WhenAll(tasks);
        }
        
    }
}