using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Rozklad.API.Entities;

namespace Rozklad.API.DataAccess
{
    public class DbCollection<T> where T : IDocument
    {
        // Todo think about IEnumerable interface
        private readonly IMongoCollection<T> _collection;

        // public DbCollection(IMongoCollection<T> collectionFromDb)
        // {
        //     _collection = collectionFromDb;
        // }

        public DbCollection(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }
        public IEnumerable<T> GetAll() =>
            _collection.Find(elment => true).ToList();

        public T Get(string id) =>
            _collection.Find(element => element.Id == id).FirstOrDefault();

        public T Create(T element)
        {
            _collection.InsertOne(element);
            return element;
        }

        public void Update(string id, T element) =>
            _collection.ReplaceOne(elementFromDb => elementFromDb.Id == element.Id, element);

        public void Remove(T element) =>
            _collection.DeleteOne(elementFromDb => elementFromDb.Id == element.Id);

        public void Remove(string id) =>
            _collection.DeleteOne(elementFromDb => elementFromDb.Id == id);
    }
}