using ApplicationCore.Interfaces;
using System.Collections.Generic;

namespace ApplicationCore.Entities.FireAggregate
{
    public class FireDepartment : BaseEntity, IAggregateRoot
    {
        private FireDepartment()
        {
            FireFighters = new HashSet<FireFighter>();
        }
        public FireDepartment(string name, Address address)
        {
            FireDepartmentName = name;
            FireDepartmentAddress = address;
        }

        public string FireDepartmentName { get; private set; }
        public Address FireDepartmentAddress { get; private set; }
        public ICollection<FireFighter> FireFighters { get; set; }

        public void Update(string name, Address address)
        {
            FireDepartmentName = name;
            FireDepartmentAddress = address;
        }
    }
}
