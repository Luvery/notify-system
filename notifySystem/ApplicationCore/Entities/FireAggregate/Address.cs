namespace ApplicationCore.Entities.FireAggregate
{
    public class Address
    {
        public string City { get; private set; }
        public string Street { get; private set; }
        public string StreetNumber { get; private set; }
        public string ZipCode { get; private set; }

        private Address() { }

        public Address(string city, string street, string streetNumber, string zipcode)
        {
            City = city;
            Street = street;
            StreetNumber = streetNumber;
            ZipCode = zipcode;
        }

        public void Update(string city, string street, string streetNumber, string zipcode)
        {
            City = city;
            Street = street;
            StreetNumber = streetNumber;
            ZipCode = zipcode;
        }

    }
}
