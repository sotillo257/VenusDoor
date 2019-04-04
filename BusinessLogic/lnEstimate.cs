using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    class lnEstimate
    {
        DataAccess.adEstimate _AD = new DataAccess.adEstimate();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Estimate.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Estimate> GetAllEstimate()
        {
            try
            {
                return _AD.GetAllEstimate();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Estimate por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Estimate GetEstimateById(int pId)
        {
            try
            {
                return _AD.GetEstimateById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Estimate GetEstimateByIdCompany(int pIdcompany)
        {
            try
            {
                return _AD.GetEstimateByIdCompany(pIdcompany);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertEstimate(Estimate pEst)
        {
            try
            {
                return _AD.InsertEstimate(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateEstimate(Estimate pEst)
        {
            try
            {
                _AD.UpdateEstimate(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateEstimateStatus(Estimate pEst)
        {
            try
            {
                _AD.UpdateEstimateStatus(pEst);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteEstimate(int pId)
        {
            try
            {
                _AD.DeleteEstimate(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Estimate dEstimate(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteEstimate(Estimate dEstimate)
        {
            throw new NotImplementedException();
        }
    }
}
