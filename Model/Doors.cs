using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Doors
    {
        public int Id { get; set; }
        public int IdOrder { get; set; }
        public int IdDoorStyle { get; set; }
        public int IdMaterial { get; set; }
        public int IdTopRail { get; set; }
        public int IdBottomRail { get; set; }
        public int IdPreparation { get; set; }
        public int IdJoin { get; set; }
        public int IdStileWidth { get; set; }
        public int IdRailWidth { get; set; }
        public int IdOutsideEdgeProfile { get; set; }
        public int IdInsideEdgeProfile { get; set; }
        public int IdVerticalDivisions { get; set; }
        public int IdHorizontalDivisions { get; set; }
        public int IdHingeDirection { get; set; }
        public int IdHingePositions { get; set; }
        public bool isDrill { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public bool IsOpeningMeasurement { get; set; }
        public int Quantity { get; set; }
        public int IdStatus { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public string Picture { get; set; }
        public string ProfilePicture { get; set; }
    }
}
