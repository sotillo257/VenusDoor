using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHistoryPayments
    {
        DataAccess.adHistoryPayments _AD = new DataAccess.adHistoryPayments();

        public List<HistoryPayments> GetAllHistoryPayments()
        {
            try
            {
                return _AD.GetAllHistoryPayments();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<HistoryPayments> GetHistoryPaymentsByIdPayments(int pIdest)
        {
            try
            {
                return _AD.GetHistoryPaymentsByIdPayments(pIdest);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHistoryPayments(HistoryPayments pEst)
        {
            try
            {
                return _AD.InsertHistoryPayments(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public HistoryPayments dHistoryPayments(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteHistoryPayments(HistoryPayments dHistoryPayments)
        {
            throw new NotImplementedException();
        }
    }
}
