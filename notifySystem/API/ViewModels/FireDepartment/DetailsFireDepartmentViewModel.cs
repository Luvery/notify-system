using API.ViewModels.FireFighter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels.FireDepartment
{
    public class DetailsFireDepartmentViewModel
    {
        public DetailsFireDepartmentViewModel()
        {
            FireFighters = new HashSet<FireFighterViewModel>();
        }
        public int Id { get; set; }
        public string FireDepartmentName { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string ZipCode { get; set; }

        public IEnumerable<FireFighterViewModel> FireFighters { get; set; }
    }
}
