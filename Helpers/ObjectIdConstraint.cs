using System;
using System.Globalization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MongoDB.Bson;

namespace Rozklad.API.Helpers
{
    public class ObjectIdConstraint : IRouteConstraint
    {
        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values,
            RouteDirection routeDirection)
        {
            if (!values.TryGetValue(routeKey, out object value)) return false;
            var parameterValueString = Convert.ToString(value, CultureInfo.InvariantCulture);

            return parameterValueString != null && ObjectId.TryParse(parameterValueString, out _);
        }
    }
}