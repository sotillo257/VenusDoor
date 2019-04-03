using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHistoryEstimate
    {
        DataAccess.adHistoryEstimate _AD = new DataAccess.adHistoryEstimate();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de HistoryEstimate.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<HistoryEstimate> GetAllHistoryEstimate()
        {
            try
            {
                return _AD.GetAllHistoryEstimate();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna HistoryEstimate por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public HistoryEstimate GetHistoryEstimateByIdEstimation(int pIdest)
        {
            try
            {
                return _AD.GetHistoryEstimateByIdEstimation(pIdest);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHistoryEstimate(HistoryEstimate pEst)
        {
            try
            {
                return _AD.InsertHistoryEstimate(pEst);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public HistoryEstimate dHistoryEstimate(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteHistoryEstimate(HistoryEstimate dHistoryEstimate)
        {
            throw new NotImplementedException();
        }
    }
}
