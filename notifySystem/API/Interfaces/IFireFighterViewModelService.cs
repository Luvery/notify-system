using API.ViewModels.FireFighter;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IFireFighterViewModelService
    {
        Task<FireFightersIndexViewModel> GetFireFighters();
        Task<FireFighterViewModel> DetailsFireFighter(int id);
        Task AddFireFighter(FireFighterCreateViewModel fireFighterCreateViewModel);
        Task EditFireFighter(FireFighterViewModel fireFighterEditViewModel);
        Task DeleteFireFighter(FireFighterViewModel fireFighterEditViewModel);
        Task<FireFightersIndexViewModel> GetAvailableFireFighters();

    }
}
