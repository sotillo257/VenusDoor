using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDocumentsAdjxEstimate
    {
        DataAccess.adDocumentsAdjxEstimate _AD = new DataAccess.adDocumentsAdjxEstimate();

        public List<DocumentsAdjxEstimate> GetAllDocumentsAdjxEstimate()
        {
            try
            {
                return _AD.GetAllDocumentsAdjxEstimate();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<DocumentsAdjxEstimate> GetDocumentsAdjxEstimate(int Id, int IdDocumentAdj, int IdCreditNotes)
        {
            try
            {
                return _AD.GetDocumentsAdjxEstimate(Id, IdDocumentAdj, IdCreditNotes);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDocumentsAdjxEstimate(DocumentsAdjxEstimate pDocumentsAdjxEstimate)
        {
            try
            {
                return _AD.InsertDocumentsAdjxEstimate(pDocumentsAdjxEstimate);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDocumentsAdjxEstimate(DocumentsAdjxEstimate pDocumentsAdjxEstimate)
        {
            try
            {
                _AD.UpdateDocumentsAdjxEstimate(pDocumentsAdjxEstimate);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDocumentsAdjxEstimate(int pId)
        {
            try
            {
                _AD.DeleteDocumentsAdjxEstimate(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DocumentsAdjxEstimate dDocumentsAdjxEstimate(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDocumentsAdjxEstimate(DocumentsAdjxEstimate dDocumentsAdjxEstimate)
        {
            throw new NotImplementedException();
        }
    }
}
