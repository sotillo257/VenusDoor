using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHingePositions
    {
        DataAccess.adHingePositions _AD = new DataAccess.adHingePositions();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de HingePositions.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<HingePositions> GetAllHingePositions()
        {
            try
            {
                return _AD.GetAllHingePositions();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna HingePositions por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public HingePositions GetHingePositionsById(int pId)
        {
            try
            {
                return _AD.GetHingePositionsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHingePositions(HingePositions pHingePositions)
        {
            try
            {
                return _AD.InsertHingePositions(pHingePositions);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateHingePositions(HingePositions pHingePositions)
        {
            try
            {
                _AD.UpdateHingePositions(pHingePositions);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteHingePositions(int pId)
        {
            try
            {
                _AD.DeleteHingePositions(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
