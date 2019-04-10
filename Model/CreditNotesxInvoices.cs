using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class CreditNotesxInvoices
    {
        public CreditNotes CreditNotes { get; set; }
        public Invoice Invoice { get; set; }
        public decimal Amount { get; set; }
    }
}
