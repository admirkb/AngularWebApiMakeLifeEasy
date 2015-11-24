using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using AngularWebApiMakeLifeEasyModel.Model;

namespace AngularWebApiMakeLifeEasy
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.Remove(config.Formatters.XmlFormatter);


            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Supplier>("oDataSuppliers");
            builder.EntitySet<Customer>("oDataCustomers");
            var productFiles = builder.EntitySet<ProductFile>("oDataProductFiles");
            productFiles.EntityType.HasKey(c => c.CustomerId); // tell the key explicitly through code
            productFiles.EntityType.HasKey(c => c.ProductCode); // tell the key explicitly through code

            builder.EntitySet<Staff>("oDataStaffs");
            builder.EntitySet<Band>("oDataBands");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

        }
    }
}
