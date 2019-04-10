using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class CreditNotes
    {
        public int Id { get; set; }
        public string IdFolio { get; set; }    
        public Company Company { get; set; }
        public User UserCliente { get; set; }
        public User UserVendedor { get; set; }
        public Order Order { get; set; }
        public DateTime PaymentsDate { get; set; }
        public decimal Total { get; set; }
        public decimal TotalDue { get; set; }
        public string TermsAndConditions { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }

    }
}
