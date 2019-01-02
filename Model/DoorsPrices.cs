using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DoorsPrices
    {
        public int Id { get; set; }
        public int IdDoorStyle { get; set; }
        public int IdMaterial { get; set; }
        public int IdStileWidth { get; set; }
        public int IdRailWidth { get; set; }
        public decimal BasePrice { get; set; }
        public decimal AdditionalSFPrice { get; set; }
        public decimal VerticalBase1FLPrice { get; set; }
        public decimal VerticalAdditionalInchPrice { get; set; }
        public decimal HorizontalBase1FLPrice { get; set; }
        public decimal HorizontalAdditionalInchPrice { get; set; }
        public int IdStatus { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public string Picture { get; set; }
        public string ProfilePicture { get; set; }
    }
}
