using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDocumentsAdj
    {
        DataAccess.adDocumentsAdj _AD = new DataAccess.adDocumentsAdj();
    
        public List<DocumentsAdj> GetAllDocumentsAdj()
        {
            try
            {
                return _AD.GetAllDocumentsAdj();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
   
        public DocumentsAdj GetDocumentsAdjById(int pId)
        {
            try
            {
                return _AD.GetDocumentsAdjById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDocumentsAdj(DocumentsAdj pDocumentsAdj)
        {
            try
            {
                return _AD.InsertDocumentsAdj(pDocumentsAdj);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDocumentsAdj(DocumentsAdj pDocumentsAdj)
        {
            try
            {
                _AD.UpdateDocumentsAdj(pDocumentsAdj);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDocumentsAdj(int pId)
        {
            try
            {
                _AD.DeleteDocumentsAdj(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DocumentsAdj dDocumentsAdj(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDocumentsAdj(DocumentsAdj dDocumentsAdj)
        {
            throw new NotImplementedException();
        }
    }
}
