using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class PaymentsxInvoices
    {
        public PaymentsReceived PaymentsReceived { get; set; }
        public Invoice Invoice { get; set; }
        public decimal Amount { get; set; }
    }
}
