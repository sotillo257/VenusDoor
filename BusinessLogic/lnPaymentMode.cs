using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPaymentMode
    {
        DataAccess.adPaymentMode _AD = new DataAccess.adPaymentMode();

        public List<PaymentMode> GetAllPaymentMode()
        {
            try
            {
                return _AD.GetAllPaymentMode();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        
        public PaymentMode GetPaymentModeById(int pId)
        {
            try
            {
                return _AD.GetPaymentModeById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPaymentMode(PaymentMode pPaymentMode)
        {
            try
            {
                return _AD.InsertPaymentMode(pPaymentMode);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePaymentMode(PaymentMode pPaymentMode)
        {
            try
            {
                _AD.UpdatePaymentMode(pPaymentMode);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePaymentMode(int pId)
        {
            try
            {
                _AD.DeletePaymentMode(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public PaymentMode dPaymentMode(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeletePaymentMode(PaymentMode dPaymentMode)
        {
            throw new NotImplementedException();
        }
    }
}
