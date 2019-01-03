using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;


namespace BusinessLogic
{
    public class lnInsideEdgeProfile
    {
        DataAccess.adInsideEdgeProfile _AD = new DataAccess.adInsideEdgeProfile();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de InsideEdgeProfile.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<InsideEdgeProfile> GetAllInsideEdgeProfile()
        {
            try
            {
                return _AD.GetAllInsideEdgeProfile();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna InsideEdgeProfile por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public InsideEdgeProfile GetInsideEdgeProfileById(int pId)
        {
            try
            {
                return _AD.GetInsideEdgeProfileById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            try
            {
                return _AD.InsertInsideEdgeProfile(pInsideEdgeProfile);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            try
            {
                _AD.UpdateInsideEdgeProfile(pInsideEdgeProfile);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteInsideEdgeProfile(int pId)
        {
            try
            {
                _AD.DeleteInsideEdgeProfile(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
