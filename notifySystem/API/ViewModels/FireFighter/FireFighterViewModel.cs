namespace API.ViewModels.FireFighter
{
    public class FireFighterViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? FireDepartmentId { get; set; }
    }
}
