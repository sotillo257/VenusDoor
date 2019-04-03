using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnInvoice
    {
        DataAccess.adInvoice _AD = new DataAccess.adInvoice();
       
        public List<Invoice> GetAllInvoice()
        {
            try
            {
                return _AD.GetAllInvoice();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
      
        public Invoice GetInvoiceByIdCompany(int pIdcompany)
        {
            try
            {
                return _AD.GetInvoiceByIdCompany(pIdcompany);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Invoice GetInvoice(int IdEstimate, int IdCompany, int IdUserCliente, int IdUserVendedor, DateTime Invoicedate, DateTime Expirydate)
        {
            try
            {
                return _AD.GetInvoice(IdEstimate, IdCompany, IdUserCliente, IdUserVendedor, Invoicedate, Expirydate);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertInvoice(Invoice pEst)
        {
            try
            {
                return _AD.InsertInvoice(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateInvoice(Invoice pEst)
        {
            try
            {
                _AD.UpdateInvoice(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateInvoiceStatus(Invoice pEst)
        {
            try
            {
                _AD.UpdateInvoiceStatus(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteInvoice(int pId)
        {
            try
            {
                _AD.DeleteInvoice(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Invoice dInvoice(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteInvoice(Invoice dInvoice)
        {
            throw new NotImplementedException();
        }
    }
}
