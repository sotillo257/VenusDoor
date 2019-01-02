using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DoorStylexInsideEdgeProfile
    {
        public int Id { get; set; }
        public int IdDoorStyle { get; set; }
        public int IdInsideEdgeProfile { get; set; }
        public int IdStatus { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
    }
}
