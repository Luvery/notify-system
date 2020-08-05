using ApplicationCore.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities.FireAggregate
{
    public class Phone : BaseEntity, IAggregateRoot
    {
        public Phone()
        {

        }
        public string PhoneNumber { get; set; }
        public Phone(string phoneNumber)
        {
            PhoneNumber = phoneNumber;
        }
      
        public FireFighter FireFighter { get; set; }
        public int? FireFighterId { get; set; }

        public void SetNumber (string number)
        {
            PhoneNumber = number;
        }
    }
}
