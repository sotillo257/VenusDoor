using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorsPrices
    {
        DataAccess.adDoorsPrices _AD = new DataAccess.adDoorsPrices();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorsPrices.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorsPrices> GetAllDoorsPrices()
        {
            try
            {
                return _AD.GetAllDoorsPrices();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorsPrices por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorsPrices GetDoorsPricesById(int pId)
        {
            try
            {
                return _AD.GetDoorsPricesById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorsPrices(DoorsPrices pDoorsPrices)
        {
            try
            {
                return _AD.InsertDoorsPrices(pDoorsPrices);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorsPrices(DoorsPrices pDoorsPrices)
        {
            try
            {
                _AD.UpdateDoorsPrices(pDoorsPrices);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorsPrices(int pId)
        {
            try
            {
                _AD.DeleteDoorPrices(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
