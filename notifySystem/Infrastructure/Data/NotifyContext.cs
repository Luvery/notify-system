using ApplicationCore.Entities.FireAggregate;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Infrastructure.Data
{
    public class NotifyContext : IdentityDbContext<ApplicationUser>
    {
        public NotifyContext(DbContextOptions<NotifyContext> options) : base(options)
        {
        }
        public DbSet<FireFighter> FireFighters { get; set; }
        public DbSet<FireDepartment> FireDepartments { get; set; }
        public DbSet<Phone> Phones{ get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

    }
}
