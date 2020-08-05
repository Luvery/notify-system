using API.Interfaces;
using API.ViewModels;
using ApplicationCore.Entities.FireAggregate;
using ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class PhoneViewModelService : IPhoneViewModelService
    {
        private readonly ILogger<PhoneViewModelService> _logger;
        private readonly IAsyncRepository<Phone> _phoneRepository;

        public PhoneViewModelService(ILoggerFactory loggerFactory, IAsyncRepository<Phone> phoneRepository)
        {
            _logger = loggerFactory.CreateLogger<PhoneViewModelService>();
            this._phoneRepository = phoneRepository;
        }
        public async Task<PhonesViewModel> GetPhones()
        {
            _logger.LogInformation("GetPhones called");

            var phones = await _phoneRepository.ListAllAsync();

            var vm = new PhonesViewModel()
            {
                PhoneNumbers = phones.Select(p => new PhoneViewModel()
                {
                    PhoneNumber = p.PhoneNumber
                })

            };
            return vm;

        }
    }
}
