using API.Helpers;
using API.Hubs;
using API.Interfaces;
using API.Services;
using ApplicationCore.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Infrastructure.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            ConfigureDbServices(services);
        }

        public void ConfigureDbServices(IServiceCollection services)
        {
            services.AddDbContext<NotifyContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("NotifyConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(config => { config.SignIn.RequireConfirmedEmail = true; })
                .AddEntityFrameworkStores<NotifyContext>();


            var jwtOptions = Configuration.GetSection(nameof(JwtOptions));
            services.Configure<JwtOptions>(options =>
            {
                options.Audience = jwtOptions["Audience"];
                options.Issuer = jwtOptions["Issuer"];
                options.SecretKey = jwtOptions["SecretKey"];
                options.ValidForMinutes = double.Parse(jwtOptions["ValidForMinutes"]);
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(cfg =>
              {
                  cfg.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateIssuer = true,
                      ValidIssuer = jwtOptions["Issuer"],
                      ValidateAudience = true,
                      ValidAudience = jwtOptions["Audience"],
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions["SecretKey"])),
                  };
              });

            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
                options.KeepAliveInterval = TimeSpan.FromMinutes(1);
                options.ClientTimeoutInterval = TimeSpan.FromMinutes(2);
            });
            
            services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .SetIsOriginAllowed((host) => true)
                       .AllowCredentials();
            }));

            services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
            services.AddScoped(typeof(IAppLogger<>), typeof(LoggerAdapter<>));
            services.AddScoped<IFireFighterViewModelService, FireFighterViewModelService>();
            services.AddScoped<IPhoneViewModelService, PhoneViewModelService>();
            services.AddScoped<IFireDepartmentViewModelService, FireDepartmentViewModelService>();



            services.AddSwaggerGen(a =>
            {
                a.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "My API", Version = "V1" });
                a.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. <BR/> 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      <BR/>Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                a.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference= new OpenApiReference
                            {
                                Type= ReferenceType.SecurityScheme,
                                Id="Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });

            services.AddControllers();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger();

            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotifyHub>("/api/notifyhub");
                endpoints.MapControllers();
            });


        }
    }
}
