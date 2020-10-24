using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using MongoDB.Bson;
using Rozklad.API.Exceptions;
using Rozklad.API.Services;

namespace Rozklad.API.Helpers
{
    public class ListOfObjectIdThatExistsAttribute : ValidationAttribute
    {
        // private readonly IRozkladRepository _repository;
        //
        // public ListOfObjectIdThatExistsAttribute(IRozkladRepository repository)
        // {
        //     _repository = repository;
        // }

        public override bool IsValid(object value)
        {
            var list = value as List<string>;
            return 
                list != null 
                   && 
                   list.All(id => ObjectId.TryParse(id, out _));
        }
    }
}