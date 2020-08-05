using System.Collections.Generic;
using API.ViewModels.FireFighter;
using ApplicationCore.Entities.FireAggregate;

namespace API.ViewModels.FireDepartment

{
    public class EditFireDepartmentViewModel
    {
        public EditFireDepartmentViewModel() { }
        public int Id { get; set; }
        public string FireDepartmentName { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string ZipCode { get; set; }
    }
}