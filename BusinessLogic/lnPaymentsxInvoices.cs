using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPaymentsxInvoices
    {
        DataAccess.adPaymentsxInvoices _AD = new DataAccess.adPaymentsxInvoices();

        public List<PaymentsxInvoices> GetPaymentsxInvoices(int IdCreditNotes, int IdInvoice)
        {
            try
            {
                return _AD.GetPaymentsxInvoices(IdCreditNotes, IdInvoice);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int InsertPaymentsxInvoicess(PaymentsxInvoices pEst)
        {
            try
            {
                return _AD.InsertPaymentsxInvoices(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
