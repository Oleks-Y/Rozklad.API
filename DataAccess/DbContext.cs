using System;
using System.Reflection;
using MongoDB.Driver;
using Rozklad.API.DataAccess.Configuration;

namespace Rozklad.API.DataAccess
{
    public abstract class DbContext
    {
        public DbContext(DatabaseSettings settings)
        {
            var obj = this.GetType();
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            foreach (var property in obj.GetProperties())
            {
                var collectionName = property.Name.ToLower() + "s";
                var type = property.PropertyType.GenericTypeArguments[0];
                object[] args = {
                    database
                };
                property.SetValue(this, Activator.CreateInstance(property.PropertyType, args));
            }
        }
    }
}