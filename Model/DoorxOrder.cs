using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DoorxOrder
    {
        public int Id { get; set; }
        public DoorsxUser DoorxUser { get; set; }
        public decimal Width { get; set; }
        public Decimals DecimalsWidth { get; set; }
        public decimal Height { get; set; }
        public Decimals DecimalsHeight { get; set; }
        public int Quantity { get; set; }
        public decimal ItemCost { get; set; }
        public decimal SubTotal { get; set; }
        public User User { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public string Picture { get; set; }
        public string ProfilePicture { get; set; }
        public Panel Panel { get; set; }
        public DoorType DoorType { get; set; }
        public DoorOption DoorOption { get; set; }
        public int Descuento { get; set; }
    }
}
