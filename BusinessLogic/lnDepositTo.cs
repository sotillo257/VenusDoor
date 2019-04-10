using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDepositTo
    {
        DataAccess.adDepositTo _AD = new DataAccess.adDepositTo();
    
        public List<DepositTo> GetAllDepositTo()
        {
            try
            {
                return _AD.GetAllDepositTo();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DepositTo GetDepositToById(int pId)
        {
            try
            {
                return _AD.GetDepositToById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDepositTo(DepositTo pDepositTo)
        {
            try
            {
                return _AD.InsertDepositTo(pDepositTo);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDepositTo(DepositTo pDepositTo)
        {
            try
            {
                _AD.UpdateDepositTo(pDepositTo);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDepositTo(int pId)
        {
            try
            {
                _AD.DeleteDepositTo(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DepositTo dDepositTo(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDepositTo(DepositTo dDepositTo)
        {
            throw new NotImplementedException();
        }
    }
}
