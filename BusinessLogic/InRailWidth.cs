using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InRailWidth
    {
        DataAccess.adRailWidth _AD = new DataAccess.adRailWidth();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de RailWidth.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<RailWidth> GetAllRailWidth()
        {
            try
            {
                return _AD.GetAllRailWidth();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna RailWidth por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public RailWidth GetRailWidthById(int pId)
        {
            try
            {
                return _AD.GetRailWidthById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertRailWidth(RailWidth pRailWidth)
        {
            try
            {
                return _AD.InsertRailWidth(pRailWidth);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateRailWidth(RailWidth pRailWidth)
        {
            try
            {
                _AD.UpdateRailWidth(pRailWidth);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteRailWidth(int pId)
        {
            try
            {
                _AD.DeleteRailWidth(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
