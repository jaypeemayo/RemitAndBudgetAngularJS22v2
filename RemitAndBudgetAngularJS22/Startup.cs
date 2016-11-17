using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using RemitAndBudgetAngularJS22.Provider;
using Newtonsoft.Json.Serialization;

[assembly: OwinStartup(typeof(RemitAndBudgetAngularJS22.Startup))]

namespace RemitAndBudgetAngularJS22
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuth(app);
            HttpConfiguration config = new HttpConfiguration();

            //#region prevent a capital first letter when serialization.        
            //var serializeSettings = config.Formatters.JsonFormatter.SerializerSettings;
            //serializeSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //serializeSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            //#endregion

            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

        }
    }
}
