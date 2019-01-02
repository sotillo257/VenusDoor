using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorStyle
    {
        DataAccess.adDoorStyle _AD = new DataAccess.adDoorStyle();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Door Style.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorStyle> GetAllDoorStyle()
        {
            try
            {
                return _AD.GetAllDoorStyle();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Door Style por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorStyle GetDoorStyleById(int pId)
        {
            try
            {
                return _AD.GetDoorStyleById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorStyle(DoorStyle pDoorStyle) {
            try
            {
               return _AD.InsertDoorStyle(pDoorStyle);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorStyle(DoorStyle pDoorStyle)
        {
            try
            {
                _AD.UpdateDoorStyle(pDoorStyle);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorStyle(int pId)
        {
            try
            {
                _AD.DeleteDoorStyle(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

    }
}
