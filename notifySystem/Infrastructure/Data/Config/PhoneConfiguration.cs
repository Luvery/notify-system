using ApplicationCore.Entities.FireAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PhoneConfiguration : IEntityTypeConfiguration<Phone>
    {
        public void Configure(EntityTypeBuilder<Phone> builder)
        {

            builder.Property(ff => ff.PhoneNumber)
                .IsRequired(true)
                .HasMaxLength(20);
        }
    }
}
