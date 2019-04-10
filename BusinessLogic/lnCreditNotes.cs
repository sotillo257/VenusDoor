using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnCreditNotes
    {
        DataAccess.adCreditNotes _AD = new DataAccess.adCreditNotes();
      
        public List<CreditNotes> GetAllCreditNotes()
        {
            try
            {
                return _AD.GetAllCreditNotes();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
 
        public List<CreditNotes> GetCreditNotes(int Id, int IdCompany, int IdUserCliente, int IdUserVendedor, int CreatorUser, DateTime PaymentsDate)
        {
            try
            {
                return _AD.GetCreditNotes(Id, IdCompany, IdUserCliente, IdUserVendedor, CreatorUser, PaymentsDate);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<CreditNotes> GetCreditNotesByIdCompany(int pIdcompany)
        {
            try
            {
                return _AD.GetCreditNotesByIdCompany(pIdcompany);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertCreditNotes(CreditNotes pEst)
        {
            try
            {
                return _AD.InsertCreditNotes(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateCreditNotes(CreditNotes pEst)
        {
            try
            {
                _AD.UpdateCreditNotes(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateCreditNotesStatus(CreditNotes pEst)
        {
            try
            {
                _AD.UpdateCreditNotesStatus(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteCreditNotes(int pId)
        {
            try
            {
                _AD.DeleteCreditNotes(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public CreditNotes dCreditNotes(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteCreditNotes(CreditNotes dCreditNotes)
        {
            throw new NotImplementedException();
        }
    }
}
