using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnHorizontalDivisions
    {
        DataAccess.adHorizontalDivisions _AD = new DataAccess.adHorizontalDivisions();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de HorizontalDivisions.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<HorizontalDivisions> GetAllHorizontalDivisions()
        {
            try
            {
                return _AD.GetAllHorizontalDivisions();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna HorizontalDivisions por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public HorizontalDivisions GetHorizontalDivisionsById(int pId)
        {
            try
            {
                return _AD.GetHorizontalDivisionsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            try
            {
                return _AD.InsertHorizontalDivisions(pHorizontalDivisions);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            try
            {
                _AD.UpdateHorizontalDivisions(pHorizontalDivisions);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteHorizontalDivisions(int pId)
        {
            try
            {
                _AD.DeleteHorizontalDivisions(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
