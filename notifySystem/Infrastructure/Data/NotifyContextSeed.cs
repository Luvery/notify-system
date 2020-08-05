using ApplicationCore.Entities.FireAggregate;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class NotifyContextSeed
    {
        public static async Task SeedAsync(NotifyContext notifyContext, ILoggerFactory loggerFactory, int? retry = 0)
        {
            int retryForAvailability = retry.Value;
            try
            {
                //if (!notifyContext.Phones.Any())
                //{
                //    notifyContext.Phones.AddRange(GetPreconfiguredPhones());

                //    await notifyContext.SaveChangesAsync();
                //}

                if (!notifyContext.FireDepartments.Any())
                {
                    notifyContext.FireDepartments.AddRange(GetPreconfiguredFireDepartments());

                    await notifyContext.SaveChangesAsync();
                }

                if (!notifyContext.FireFighters.Any())
                {
                    notifyContext.FireFighters.AddRange(GetPreconfiguredFireFighters());

                    await notifyContext.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {

                if (retryForAvailability < 10)
                {
                    retryForAvailability++;
                    var log = loggerFactory.CreateLogger<NotifyContextSeed>();
                    log.LogError(ex.Message);
                    await SeedAsync(notifyContext, loggerFactory, retryForAvailability);
                }
                throw;
            }
        }

        static IEnumerable<FireFighter> GetPreconfiguredFireFighters()
        {
            return new List<FireFighter>()
            {
                new FireFighter("Wojciech", "Kowalski", "wojtek@abc.com",1, new Phone("111-333-222")),
                new FireFighter("Zenon", "Bojaźliwy", "zenon@abc.com",1, new Phone("444-666-555"))
            };
        }
        static IEnumerable<FireDepartment> GetPreconfiguredFireDepartments()
        {
            return new List<FireDepartment>()
            {
                new FireDepartment("OSP Roczyny", new Address("Roczyny", "Bielska","101","34-120"))

            };
        }
        static IEnumerable<Phone> GetPreconfiguredPhones()
        {
            return new List<Phone>()
            {
                //new Phone("111-222-333"),
                //new Phone("444-555-111")

            };
        }
    }
};
