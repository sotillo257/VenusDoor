using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDocumentsAdjxInvoice
    {
        DataAccess.adDocumentsAdjxInvoice _AD = new DataAccess.adDocumentsAdjxInvoice();

        public List<DocumentsAdjxInvoice> GetAllDocumentsAdjxInvoice()
        {
            try
            {
                return _AD.GetAllDocumentsAdjxInvoice();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<DocumentsAdjxInvoice> GetDocumentsAdjxInvoice(int Id, int IdDocumentAdj, int IdCreditNotes)
        {
            try
            {
                return _AD.GetDocumentsAdjxInvoice(Id, IdDocumentAdj, IdCreditNotes);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDocumentsAdjxInvoice(DocumentsAdjxInvoice pDocumentsAdjxInvoice)
        {
            try
            {
                return _AD.InsertDocumentsAdjxInvoice(pDocumentsAdjxInvoice);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDocumentsAdjxInvoice(DocumentsAdjxInvoice pDocumentsAdjxInvoice)
        {
            try
            {
                _AD.UpdateDocumentsAdjxInvoice(pDocumentsAdjxInvoice);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDocumentsAdjxInvoice(int pId)
        {
            try
            {
                _AD.DeleteDocumentsAdjxInvoice(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DocumentsAdjxInvoice dDocumentsAdjxInvoice(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDocumentsAdjxInvoice(DocumentsAdjxInvoice dDocumentsAdjxInvoice)
        {
            throw new NotImplementedException();
        }
    }
}
