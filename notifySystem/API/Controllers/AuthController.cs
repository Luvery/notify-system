using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Helpers;
using API.ViewModels.Auth;
using ApplicationCore.Constants;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{

    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IConfiguration config;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AuthController(IConfiguration config,
                              UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              RoleManager<IdentityRole> roleManager)
        {
            this.config = config;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateToken(LoginViewModel model)
        {

            if (model == null) return Unauthorized();

            bool validUser = await Authenticate(model);
            string tokenString;
            if (validUser)
            {
                var user = await userManager.FindByNameAsync(model.UserName);
                var userInAdmins = await userManager.IsInRoleAsync(user, AuthorizationConstants.Roles.ADMINISTRATORS);

                if (userInAdmins)
                {
                    tokenString = BuildToken(AuthorizationConstants.Roles.ADMINISTRATORS, user.Id);
                    return Ok(new { Token = tokenString });
                }
                else tokenString = BuildToken(AuthorizationConstants.Roles.USERS, user.Id);
                return Ok(new { Token = tokenString });

            }
            else
            {
                return Unauthorized();
            }

        }

        private string BuildToken(string roleName, string userId)
        {
            var jwtOptions = config.GetSection("JwtOptions");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = jwtOptions["Audience"],
                Issuer = jwtOptions["Issuer"],
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userId ),
                    new Claim(ClaimTypes.Role, roleName)
                }),
                Expires = DateTime.Now.AddMinutes(double.Parse(jwtOptions["ValidForMinutes"])),
                SigningCredentials= creds
            };
            var tokenHandler = new JwtSecurityTokenHandler(); 
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<bool> Authenticate(LoginViewModel model)
        {
            var validUser = false;

            var result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, true, false);

            if (result.Succeeded)
            {
                //logger TODO
                validUser = true;
            }
     
            return validUser;
        }

    }
}