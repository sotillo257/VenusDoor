using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnStatus
    {
        DataAccess.adStatus _AD = new DataAccess.adStatus();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Status.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Status> GetAllStatus()
        {
            try
            {
                return _AD.GetAllStatus();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Status por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Status GetStatusById(int pId)
        {
            try
            {
                return _AD.GetStatusById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertStatus(Status pStatus)
        {
            try
            {
                return _AD.InsertStatus(pStatus);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateStatus(Status pStatus)
        {
            try
            {
                _AD.UpdateStatus(pStatus);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteStatus(int pId)
        {
            try
            {
                _AD.DeleteStatus(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
