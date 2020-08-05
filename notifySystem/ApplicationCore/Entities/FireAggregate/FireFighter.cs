using ApplicationCore.Interfaces;

namespace ApplicationCore.Entities.FireAggregate
{
    public class FireFighter : BaseEntity, IAggregateRoot
    {
        public FireFighter()
        {

        }
        public FireFighter(string firstName, string lastName, string email, int fireDepartmentId, Phone phone)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            FireDepartmentId = fireDepartmentId;
            Phone = phone;
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }

        public Phone Phone { get; private set; }

        public virtual FireDepartment FireDepartment { get; private set; }
        public int? FireDepartmentId { get; private set; }

        public void Update(string firstName, string lastName, string email, Phone phone, int? fireDepartmentId)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
            FireDepartmentId = fireDepartmentId;
        }

    }
}
