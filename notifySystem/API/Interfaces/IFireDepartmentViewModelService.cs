using API.ViewModels.FireDepartment;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IFireDepartmentViewModelService
    {
        Task<FireDepartmentsViewModel> GetFireDepartments();
        Task AddFireDepartment(CreateFireDepartmentViewModel createFireDepartmentViewModel);
        Task EditFireDepartment(EditFireDepartmentViewModel editFireDepartmentViewModel);
        Task<DetailsFireDepartmentViewModel> DetailsFireDepartment(int id);
    }
}
