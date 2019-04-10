using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDocumentsAdjxPaymentsReceived
    {
        DataAccess.adDocumentsAdjxPaymentsReceived _AD = new DataAccess.adDocumentsAdjxPaymentsReceived();

        public List<DocumentsAdjxPaymentsReceived> GetAllDocumentsAdjxPaymentsReceived()
        {
            try
            {
                return _AD.GetAllDocumentsAdjxPaymentsReceived();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<DocumentsAdjxPaymentsReceived> GetDocumentsAdjxPaymentsReceived(int Id, int IdDocumentAdj, int IdCreditNotes)
        {
            try
            {
                return _AD.GetDocumentsAdjxPaymentsReceived(Id, IdDocumentAdj, IdCreditNotes);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDocumentsAdjxPaymentsReceived(DocumentsAdjxPaymentsReceived pDocumentsAdjxPaymentsReceived)
        {
            try
            {
                return _AD.InsertDocumentsAdjxPaymentsReceived(pDocumentsAdjxPaymentsReceived);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDocumentsAdjxPaymentsReceived(DocumentsAdjxPaymentsReceived pDocumentsAdjxPaymentsReceived)
        {
            try
            {
                _AD.UpdateDocumentsAdjxPaymentsReceived(pDocumentsAdjxPaymentsReceived);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDocumentsAdjxPaymentsReceived(int pId)
        {
            try
            {
                _AD.DeleteDocumentsAdjxPaymentsReceived(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DocumentsAdjxPaymentsReceived dDocumentsAdjxPaymentsReceived(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDocumentsAdjxPaymentsReceived(DocumentsAdjxPaymentsReceived dDocumentsAdjxPaymentsReceived)
        {
            throw new NotImplementedException();
        }
    }
}
