using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnTopRail
    {
        DataAccess.adTopRail _AD = new DataAccess.adTopRail();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de TopRail.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<TopRail> GetAllTopRail()
        {
            try
            {
                return _AD.GetAllTopRail();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna TopRail por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public TopRail GetTopRailById(int pId)
        {
            try
            {
                return _AD.GetTopRailById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertTopRail(TopRail pTopRail)
        {
            try
            {
                return _AD.InsertTopRail(pTopRail);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateTopRail(TopRail pTopRail)
        {
            try
            {
                _AD.UpdateTopRail(pTopRail);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteTopRail(int pId)
        {
            try
            {
                _AD.DeleteTopRail(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
