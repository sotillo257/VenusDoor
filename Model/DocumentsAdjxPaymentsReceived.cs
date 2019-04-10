using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DocumentsAdjxPaymentsReceived
    {
        public int Id { get; set; }
        public DocumentsAdj DocumentsAdj { get; set; }
        public PaymentsReceived PaymentsReceived { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
    }
}
