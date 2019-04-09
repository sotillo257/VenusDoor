using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnCreditNotesxInvoicesxInvoices
    {
        DataAccess.adCreditNotesxInvoices _AD = new DataAccess.adCreditNotesxInvoices();

        public List<CreditNotesxInvoices> GetCreditNotesxInvoices(int IdCreditNotes, int IdInvoice)
        {
            try
            {
                return _AD.GetCreditNotesxInvoices(IdCreditNotes, IdInvoice);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int InsertCreditNotesxInvoicess(CreditNotesxInvoices pEst)
        {
            try
            {
                return _AD.InsertCreditNotesxInvoices(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }  
}
