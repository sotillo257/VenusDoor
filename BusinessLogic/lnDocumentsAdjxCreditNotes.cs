using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDocumentsAdjxCreditNotes
    {
        DataAccess.adDocumentsAdjxCreditNotes _AD = new DataAccess.adDocumentsAdjxCreditNotes();

        public List<DocumentsAdjxCreditNotes> GetAllDocumentsAdjxCreditNotes()
        {
            try
            {
                return _AD.GetAllDocumentsAdjxCreditNotes();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<DocumentsAdjxCreditNotes> GetDocumentsAdjxCreditNotes(int Id, int IdDocumentAdj, int IdCreditNotes)
        {
            try
            {
                return _AD.GetDocumentsAdjxCreditNotes(Id, IdDocumentAdj, IdCreditNotes);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDocumentsAdjxCreditNotes(DocumentsAdjxCreditNotes pDocumentsAdjxCreditNotes)
        {
            try
            {
                return _AD.InsertDocumentsAdjxCreditNotes(pDocumentsAdjxCreditNotes);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDocumentsAdjxCreditNotes(DocumentsAdjxCreditNotes pDocumentsAdjxCreditNotes)
        {
            try
            {
                _AD.UpdateDocumentsAdjxCreditNotes(pDocumentsAdjxCreditNotes);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDocumentsAdjxCreditNotes(int pId)
        {
            try
            {
                _AD.DeleteDocumentsAdjxCreditNotes(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DocumentsAdjxCreditNotes dDocumentsAdjxCreditNotes(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDocumentsAdjxCreditNotes(DocumentsAdjxCreditNotes dDocumentsAdjxCreditNotes)
        {
            throw new NotImplementedException();
        }
    }
}
