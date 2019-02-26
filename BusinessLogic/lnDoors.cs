using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoors
    {
        DataAccess.adDoors _AD = new DataAccess.adDoors();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Doors.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Doors> GetAllDoors()
        {
            try
            {
                return _AD.GetAllDoors();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Doors por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Doors GetDoorsById(int pId)
        {
            try
            {
                return _AD.GetDoorsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public TotalesDoors GetTotalesDoors(int Company, int IdType)
        {
            try
            {
                if (IdType == 1)
                {
                    return _AD.GetTotalDoors();
                }
                else
                {
                    return _AD.GetTotalDoorsxCompany(Company);
                }
               
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoors(Doors pDoors)
        {
            try
            {
                return _AD.InsertDoors(pDoors);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoors(Doors pDoors)
        {
            try
            {
                _AD.UpdateDoors(pDoors);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoors(int pId)
        {
            try
            {
                _AD.DeleteDoors(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
