using ApplicationCore.Entities.FireAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class FireFighterConfiguration : IEntityTypeConfiguration<FireFighter>
    {
        public void Configure(EntityTypeBuilder<FireFighter> builder)
        {
            builder.HasOne(b => b.Phone)
                .WithOne(i => i.FireFighter)
                .HasForeignKey<Phone>(i => i.FireFighterId);

            builder.Property(ff => ff.FirstName)
                .IsRequired(true)
                .HasMaxLength(50);

            builder.Property(ff => ff.LastName)
              .IsRequired(true)
              .HasMaxLength(50);

            builder.Property(ff => ff.Email)
            .IsRequired(true)
            .HasMaxLength(50);

            //builder.HasOne(ff => ff.FireDepartment)
            //    .WithMany(fd => fd.FireFighters)
            //    .HasForeignKey(ff => ff.FireDepartmentId);


        }
    }
}
