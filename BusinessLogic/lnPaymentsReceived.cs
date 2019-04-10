using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPaymentsReceived
    {
        DataAccess.adPaymentsReceived _AD = new DataAccess.adPaymentsReceived();

        public List<PaymentsReceived> GetAllPaymentsReceived()
        {
            try
            {
                return _AD.GetAllPaymentsReceived();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<PaymentsReceived> GetPaymentsReceived(int Id, int IdCompany, int IdUserCliente, int CreatorUser, DateTime PaymentDate)
        {
            try
            {
                return _AD.GetPaymentsReceived(Id, IdCompany, IdUserCliente, CreatorUser, PaymentDate);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<PaymentsReceived> GetPaymentsReceivedByIdCompany(int pIdcompany)
        {
            try
            {
                return _AD.GetPaymentsReceivedByIdCompany(pIdcompany);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPaymentsReceived(PaymentsReceived pEst)
        {
            try
            {
                return _AD.InsertPaymentsReceived(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePaymentsReceived(PaymentsReceived pEst)
        {
            try
            {
                _AD.UpdatePaymentsReceived(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePaymentsReceivedStatus(PaymentsReceived pEst)
        {
            try
            {
                _AD.UpdatePaymentsReceivedStatus(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePaymentsReceived(int pId)
        {
            try
            {
                _AD.DeletePaymentsReceived(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public PaymentsReceived dPaymentsReceived(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeletePaymentsReceived(PaymentsReceived dPaymentsReceived)
        {
            throw new NotImplementedException();
        }
    }
}
