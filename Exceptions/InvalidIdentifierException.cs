using System;

namespace Rozklad.API.Exceptions
{
    public class InvalidIdentifierException : ArgumentException
    {
        public InvalidIdentifierException(string exceptionText) : base(exceptionText)
        {
            
        }
    }
}