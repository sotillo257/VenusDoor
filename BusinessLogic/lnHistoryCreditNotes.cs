using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHistoryCreditNotes
    {
        DataAccess.adHistoryCreditNotes _AD = new DataAccess.adHistoryCreditNotes();
        
        public List<HistoryCreditNotes> GetAllHistoryCreditNotes()
        {
            try
            {
                return _AD.GetAllHistoryCreditNotes();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        
        public List<HistoryCreditNotes> GetHistoryCreditNotesByIdCreditNotes(int pIdest)
        {
            try
            {
                return _AD.GetHistoryCreditNotesByIdCreditNotes(pIdest);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHistoryCreditNotes(HistoryCreditNotes pEst)
        {
            try
            {
                return _AD.InsertHistoryCreditNotes(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public HistoryCreditNotes dHistoryCreditNotes(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteHistoryCreditNotes(HistoryCreditNotes dHistoryCreditNotes)
        {
            throw new NotImplementedException();
        }
    }
}
