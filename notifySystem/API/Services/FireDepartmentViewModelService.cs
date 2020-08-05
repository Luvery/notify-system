using API.Interfaces;
using API.ViewModels.FireDepartment;
using API.ViewModels.FireFighter;
using ApplicationCore.Entities.FireAggregate;
using ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class FireDepartmentViewModelService : IFireDepartmentViewModelService
    {
        private readonly ILogger<FireDepartmentViewModelService> logger;
        private readonly IAsyncRepository<FireFighter> fireFighterRepository;
        private readonly IAsyncRepository<Phone> phoneRepository;
        private readonly IAsyncRepository<FireDepartment> fireDepartmentRepository;

        public FireDepartmentViewModelService(
            ILoggerFactory loggerFactory,
            IAsyncRepository<FireFighter> fireFighterRepository,
            IAsyncRepository<Phone> phoneRepository,
            IAsyncRepository<FireDepartment> fireDepartmentRepository)
        {
            this.logger = loggerFactory.CreateLogger<FireDepartmentViewModelService>();
            this.fireFighterRepository = fireFighterRepository;
            this.phoneRepository = phoneRepository;
            this.fireDepartmentRepository = fireDepartmentRepository;
        }

        public async Task AddFireDepartment(CreateFireDepartmentViewModel model)
        {

            var fireDepartment = new FireDepartment(model.FireDepartmentName, new Address(model.City, model.Street, model.StreetNumber, model.ZipCode));

            await fireDepartmentRepository.AddAsync(fireDepartment);

        }

        public async Task<DetailsFireDepartmentViewModel> DetailsFireDepartment(int id)
        {
            var fireDepartment = await fireDepartmentRepository.GetByIdAsync(id);
            var fireFighters = await fireFighterRepository.ListAllAsync();
            var phones = await phoneRepository.ListAllAsync();
            if (fireDepartment == null)
            {
                throw new ApplicationException($"Fire Department with Id = { id } doesn't exist");
            }
            var vm = new DetailsFireDepartmentViewModel
            {
                Id = fireDepartment.Id,
                FireDepartmentName = fireDepartment.FireDepartmentName,
                City = fireDepartment.FireDepartmentAddress.City,
                Street = fireDepartment.FireDepartmentAddress.Street,
                StreetNumber = fireDepartment.FireDepartmentAddress.StreetNumber,
                ZipCode = fireDepartment.FireDepartmentAddress.ZipCode,
                FireFighters = fireDepartment.FireFighters.Select(p => new FireFighterViewModel()
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    PhoneNumber = p.Phone.PhoneNumber,
                    Email = p.Email
                })
            };
            return vm;
        }

        public async Task EditFireDepartment(EditFireDepartmentViewModel model)
        {
            var fireDepartment = await fireDepartmentRepository.GetByIdAsync(model.Id);
            if (fireDepartment == null)
            {
                throw new ApplicationException($"Fire Department with Id = {model.Id} doesn't exist");
            }
            var address = fireDepartment.FireDepartmentAddress;
            address.Update(model.City, model.Street, model.StreetNumber, model.ZipCode);

            fireDepartment.Update(model.FireDepartmentName, address);
            await fireDepartmentRepository.UpdateAsync(fireDepartment);
        }

        public async Task<FireDepartmentsViewModel> GetFireDepartments()
        {
            logger.LogInformation("GetFireDepartments called");

            var departments = await fireDepartmentRepository.ListAllAsync();
            var fighters = await fireFighterRepository.ListAllAsync();
            var phoneNr = await phoneRepository.ListAllAsync();

            var vm = new FireDepartmentsViewModel()
            {
                FireDepartmentsVm = departments.Select(departments => new FireDepartmentViewModel()
                {
                    Id = departments.Id,
                    FireDepartmentName = departments.FireDepartmentName,
                    City = departments.FireDepartmentAddress.City,
                    Street = departments.FireDepartmentAddress.Street,
                    StreetNumber = departments.FireDepartmentAddress.StreetNumber,
                    ZipCode = departments.FireDepartmentAddress.ZipCode,
                })
            };
            return vm;
        }
    }
}
