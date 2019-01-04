using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnStileWidth
    {
        DataAccess.adStileWidth _AD = new DataAccess.adStileWidth();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de StileWidth.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<StileWidth> GetAllStileWidth()
        {
            try
            {
                return _AD.GetAllStileWidth();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna StileWidth por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public StileWidth GetStileWidthById(int pId)
        {
            try
            {
                return _AD.GetStileWidthById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertStileWidth(StileWidth pStileWidth)
        {
            try
            {
                return _AD.InsertStileWidth(pStileWidth);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateStileWidth(StileWidth pStileWidth)
        {
            try
            {
                _AD.UpdateStileWidth(pStileWidth);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteStileWidth(int pId)
        {
            try
            {
                _AD.DeleteStileWidth(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
