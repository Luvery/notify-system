using API.Interfaces;
using API.ViewModels.FireDepartment;
using API.ViewModels.FireFighter;
using ApplicationCore.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = AuthorizationConstants.Roles.ADMINISTRATORS)]
    public class NotifyController : BaseController
    {
        private readonly IPhoneViewModelService phoneViewModelService;

        private readonly IFireFighterViewModelService fireFighterViewModelService;
        private readonly IFireDepartmentViewModelService fireDepartmentViewModelService;

        public NotifyController(
            IPhoneViewModelService phoneViewModelService,
            IFireFighterViewModelService fireFighterViewModelService,
            IFireDepartmentViewModelService fireDepartmentViewModelService)
        {
            this.phoneViewModelService = phoneViewModelService;
            this.fireFighterViewModelService = fireFighterViewModelService;
            this.fireDepartmentViewModelService = fireDepartmentViewModelService;
        }

        [HttpGet]
        public async Task<IActionResult> ListFighters()
        {
            var fightersModel = await fireFighterViewModelService.GetFireFighters();

            return Ok(fightersModel);
        }
        [HttpGet]
        public async Task<IActionResult> ListAvailableFighters()
        {
            var model = await fireFighterViewModelService.GetAvailableFireFighters();
            if (model == null)
            {
                return BadRequest("There are no availbable firefighters");
            }
            return Ok(model);
        }

        [HttpGet]
        public async Task<IActionResult> DetailsFighter(int id)
        {
            var fightersModel = await fireFighterViewModelService.DetailsFireFighter(id);

            return Ok(fightersModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddFireFighter(FireFighterCreateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model not valid");
            }
            await fireFighterViewModelService.AddFireFighter(model);
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> EditFireFighter(FireFighterViewModel model)
        {
            if (ModelState.IsValid)
            {
                await fireFighterViewModelService.EditFireFighter(model);
                return Ok(model);
            }
            return BadRequest("Model not valid");
        }

        [HttpPost]
        public async Task<IActionResult> DeleteFireFighter(FireFighterViewModel model)
        {
            await fireFighterViewModelService.DeleteFireFighter(model);
            return Ok(model);
        }
        [HttpGet]
        public async Task<IActionResult> ListPhones()
        {
            var phonesModel = await phoneViewModelService.GetPhones();

            return Ok(phonesModel);
        }
        [HttpGet]
        public async Task<IActionResult> ListDepartments()
        {
            var departmentsModel = await fireDepartmentViewModelService.GetFireDepartments();

            return Ok(departmentsModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddFireDepartment(CreateFireDepartmentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model not valid");
            }
            await fireDepartmentViewModelService.AddFireDepartment(model);
            return Ok(model);

        }
        [HttpPost]
        public async Task<IActionResult> EditFireDepartment(EditFireDepartmentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model not valid");
            }
            await fireDepartmentViewModelService.EditFireDepartment(model);
            return Ok(model);

        }
        [HttpGet]
        public async Task<IActionResult> DetailsFireDepartments(int id)
        {
            var fireDepartmentModel = await fireDepartmentViewModelService.DetailsFireDepartment(id);

            return Ok(fireDepartmentModel);
        }


    }
}