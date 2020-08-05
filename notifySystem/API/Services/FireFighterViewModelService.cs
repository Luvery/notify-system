using API.Interfaces;
using API.ViewModels.FireFighter;
using ApplicationCore.Entities.FireAggregate;
using ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class FireFighterViewModelService : IFireFighterViewModelService
    {
        private readonly ILogger<FireFighterViewModelService> logger;

        private readonly IAsyncRepository<FireFighter> fireFighterRepository;
        private readonly IAsyncRepository<Phone> phoneRepository;

        public FireFighterViewModelService(ILoggerFactory loggerFactory,
            IAsyncRepository<FireFighter> fireFighterRepository,
            IAsyncRepository<Phone> phoneRepository)
        {
            this.logger = loggerFactory.CreateLogger<FireFighterViewModelService>();
            this.fireFighterRepository = fireFighterRepository;
            this.phoneRepository = phoneRepository;
        }

        public async Task AddFireFighter(FireFighterCreateViewModel model)
        {
            logger.LogInformation("AddFireFighter called");

            if (model.PhoneNumber == null)
            {
                model.PhoneNumber = "none";
            }

            var fireFighter = new FireFighter();
            fireFighter.Update(model.FirstName, model.LastName, model.Email, new Phone(model.PhoneNumber),model.FireDepartmentId);
            await fireFighterRepository.AddAsync(fireFighter);
        }

        public async Task DeleteFireFighter(FireFighterViewModel model)
        {
            var fireFighter = await fireFighterRepository.GetByIdAsync(model.Id);

            await fireFighterRepository.DeleteAsync(fireFighter);
        }

        public async Task<FireFighterViewModel> DetailsFireFighter(int id)
        {
            var phones = await phoneRepository.ListAllAsync();
            var fireFighter = await fireFighterRepository.GetByIdAsync(id);
            var vm = new FireFighterViewModel
            {
                Id = fireFighter.Id,
                FirstName = fireFighter.FirstName,
                LastName = fireFighter.LastName,
                Email = fireFighter.Email,
                PhoneNumber = fireFighter.Phone.PhoneNumber
            };
            return vm;
        }

        public async Task EditFireFighter(FireFighterViewModel model)
        {
            var fireFighter = await fireFighterRepository.GetByIdAsync(model.Id);
            if (fireFighter==null)
            {
                throw new ApplicationException("There is no firefighter");
            }
            
            var phoneNumber = await phoneRepository.ListAllAsync();
            Phone phone = phoneNumber.Where(x => x.FireFighterId == model.Id).FirstOrDefault();

            phone.PhoneNumber = model.PhoneNumber;

            fireFighter.Update(model.FirstName, model.LastName, model.Email, phone, model.FireDepartmentId);

            await fireFighterRepository.UpdateAsync(fireFighter);
        }

        public async Task<FireFightersIndexViewModel> GetAvailableFireFighters()
        {
            logger.LogInformation("GetFireFighters called");

            var fighters = await fireFighterRepository.ListAllAsync();
            var phoneNr = await phoneRepository.ListAllAsync();

            //fighters.Where(x => x.FireDepartmentId == null);

            var vm = new FireFightersIndexViewModel()
            {
                FireFightersVm = fighters.Where(x => x.FireDepartmentId == null).Select(fighters => new FireFighterViewModel()
                {
                    Id = fighters.Id,
                    Email = fighters.Email,
                    FirstName = fighters.FirstName,
                    LastName = fighters.LastName,
                    PhoneNumber = fighters.Phone.PhoneNumber
                }),
            };
            return vm;
        }

        public async Task<FireFightersIndexViewModel> GetFireFighters()
        {
            logger.LogInformation("GetFireFighters called");

            var fighters = await fireFighterRepository.ListAllAsync();
            var phoneNr = await phoneRepository.ListAllAsync();
            
            var vm = new FireFightersIndexViewModel()
            {
                FireFightersVm = fighters.Select(fighters => new FireFighterViewModel()
                {
                    Id = fighters.Id,
                    Email = fighters.Email,
                    FirstName = fighters.FirstName,
                    LastName = fighters.LastName,
                    PhoneNumber = fighters.Phone.PhoneNumber
                }),

            };
            return vm;
        }
    }
}
