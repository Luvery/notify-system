using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.FireDepartment
{
    public class CreateFireDepartmentViewModel
    {
        public CreateFireDepartmentViewModel() { }
        public string FireDepartmentName { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        [RegularExpression(@"^[0-9]*$",ErrorMessage ="StreetNumber has to be a number") ]
        public string StreetNumber { get; set; }
        public string ZipCode { get; set; }

    }
}
