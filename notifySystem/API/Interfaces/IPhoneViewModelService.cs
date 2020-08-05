using API.ViewModels;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IPhoneViewModelService
    {
        Task<PhonesViewModel> GetPhones();
    }
}
