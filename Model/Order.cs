using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public Type Type { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public string Observations { get; set; }
        public DoorsxUser DoorxUser { get; set; }
        public int Descuento { get; set; }
        public decimal TotalDescuento { get; set; }
        public bool TEMP { get; set; }
    }
}
