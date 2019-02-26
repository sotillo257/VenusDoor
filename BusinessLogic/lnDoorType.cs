using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorType
    {
        DataAccess.adDoorType _AD = new DataAccess.adDoorType();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorType.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorType> GetAllDoorType()
        {
            try
            {
                return _AD.GetAllDoorType();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorType por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorType GetDoorTypeById(int pId)
        {
            try
            {
                return _AD.GetDoorTypeById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorType(DoorType pDoorType)
        {
            try
            {
                return _AD.InsertDoorType(pDoorType);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorType(DoorType pDoorType)
        {
            try
            {
                _AD.UpdateDoorType(pDoorType);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorType(int pId)
        {
            try
            {
                _AD.DeleteDoorType(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DoorType dDoorType(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDoorType(DoorType dDoorType)
        {
            throw new NotImplementedException();
        }
    }
}
