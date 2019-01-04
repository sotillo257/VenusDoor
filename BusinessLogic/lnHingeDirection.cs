using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHingeDirection
    {
        DataAccess.adHingeDirection _AD = new DataAccess.adHingeDirection();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de HingeDirection.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<HingeDirection> GetAllHingeDirection()
        {
            try
            {
                return _AD.GetAllHingeDirection();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna HingeDirection por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public HingeDirection GetHingeDirectionById(int pId)
        {
            try
            {
                return _AD.GetHingeDirectionById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHingeDirection(HingeDirection pHingeDirection)
        {
            try
            {
                return _AD.InsertHingeDirection(pHingeDirection);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateHingeDirection(HingeDirection pHingeDirection)
        {
            try
            {
                _AD.UpdateHingeDirection(pHingeDirection);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteHingeDirection(int pId)
        {
            try
            {
                _AD.DeleteHingeDirection(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
