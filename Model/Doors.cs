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
        public  DoorStyle DoorStyle { get; set; }
        public  Material Material { get; set; }
        public  TopRail TopRail { get; set; }
        public  BottomRail BottomRail { get; set; }
        public  Preparation Preparation { get; set; }
        public  Join Join { get; set; }
        public  Panel Panel { get; set; }
        public  PanelMaterial PanelMaterial { get; set; }
        public  OutsideEdgeProfile OutsideEdgeProfile { get; set; }
        public  InsideEdgeProfile InsideEdgeProfile { get; set; }
        public  VerticalDivisions VerticalDivisions { get; set; }
        public  HorizontalDivisions HorizontalDivisions { get; set; }
        public  HingeDirection HingeDirection { get; set; }
        public  HingePositions HingePositions { get; set; }
        public bool isDrill { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public bool IsOpeningMeasurement { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public string Picture { get; set; }
        public string ProfilePicture { get; set; }
        public DoorType DoorType { get; set; }
        public DoorOption DoorOption { get; set; }
        public bool isOverlay { get; set; }
        public bool isFingerPull { get; set; }
    }
}
