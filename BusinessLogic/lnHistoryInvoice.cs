using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHistoryInvoice
    {
        DataAccess.adHistoryInvoice _AD = new DataAccess.adHistoryInvoice();

        public List<HistoryInvoice> GetAllHistoryInvoice()
        {
            try
            {
                return _AD.GetAllHistoryInvoice();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<HistoryInvoice> GetHistoryInvoiceByIdInvoice(int pIdest)
        {
            try
            {
                return _AD.GetHistoryInvoiceByIdInvoice(pIdest);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHistoryInvoice(HistoryInvoice pEst)
        {
            try
            {
                return _AD.InsertHistoryInvoice(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public HistoryInvoice dHistoryInvoice(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteHistoryInvoice(HistoryInvoice dHistoryInvoice)
        {
            throw new NotImplementedException();
        }
    }
}
