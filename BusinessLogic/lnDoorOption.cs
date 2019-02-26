using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorOption
    {
        DataAccess.adDoorOption _AD = new DataAccess.adDoorOption();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorOption.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorOption> GetAllDoorOption()
        {
            try
            {
                return _AD.GetAllDoorOption();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorOption por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorOption GetDoorOptionById(int pId)
        {
            try
            {
                return _AD.GetDoorOptionById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorOption(DoorOption pDoorOption)
        {
            try
            {
                return _AD.InsertDoorOption(pDoorOption);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorOption(DoorOption pDoorOption)
        {
            try
            {
                _AD.UpdateDoorOption(pDoorOption);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorOption(int pId)
        {
            try
            {
                _AD.DeleteDoorOption(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DoorOption dDoorOption(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDoorOption(DoorOption dDoorOption)
        {
            throw new NotImplementedException();
        }
    }
}
