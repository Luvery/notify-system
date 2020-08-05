using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities.FireAggregate
{
    public class Event
    {
        public int EventId { get; set; }
        [Required]
        public Address Address { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
