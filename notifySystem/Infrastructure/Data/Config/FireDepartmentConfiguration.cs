using ApplicationCore.Entities.FireAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data.Config
{
    public class FireDepartmentConfiguration : IEntityTypeConfiguration<FireDepartment>
    {
        public void Configure(EntityTypeBuilder<FireDepartment> builder)
        {
            var navigation = builder.Metadata.FindNavigation(nameof(FireDepartment.FireFighters));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            builder.Property(fd => fd.FireDepartmentName)
            .IsRequired(true)
            .HasMaxLength(50);

            builder.OwnsOne(fd => fd.FireDepartmentAddress, a =>
            {
                a.WithOwner();

                a.Property(a => a.Street)
                .HasMaxLength(180)
                .IsRequired();

                a.Property(a => a.City)
                .HasMaxLength(100)
                .IsRequired();

                a.Property(a => a.ZipCode)
                .HasMaxLength(18)
                .IsRequired();

                a.Property(a => a.StreetNumber)
                .HasMaxLength(10)
                .IsRequired();
            });
        }
    }
}
