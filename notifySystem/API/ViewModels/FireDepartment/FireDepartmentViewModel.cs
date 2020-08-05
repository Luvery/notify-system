namespace API.ViewModels.FireDepartment
{
    public class FireDepartmentViewModel
    {
        public FireDepartmentViewModel() { }
        public int Id { get; set; }
        public string FireDepartmentName { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string ZipCode { get; set; }
    }
}
