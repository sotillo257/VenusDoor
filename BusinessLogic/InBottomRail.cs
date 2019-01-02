using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InBottomRail
    {
        DataAccess.adBottomRail _AD = new DataAccess.adBottomRail();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de BottomRail.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<BottomRail> GetAllBottomRail()
        {
            try
            {
                return _AD.GetAllBottomRail();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna BottomRail por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public BottomRail GetBottomRailById(int pId)
        {
            try
            {
                return _AD.GetBottomRailById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertBottomRail(BottomRail pBottomRail)
        {
            try
            {
                return _AD.InsertBottomRail(pBottomRail);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateBottomRail(BottomRail pBottomRail)
        {
            try
            {
                _AD.UpdateBottomRail(pBottomRail);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteBottomRail(int pId)
        {
            try
            {
                _AD.DeleteBottomRail(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
