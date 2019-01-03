using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnVerticalDivisions
    {
        DataAccess.adVerticalDivisions _AD = new DataAccess.adVerticalDivisions();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de VerticalDivisions.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<VerticalDivisions> GetAllVerticalDivisions()
        {
            try
            {
                return _AD.GetAllVerticalDivisions();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna VerticalDivisions por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public VerticalDivisions GetVerticalDivisionsById(int pId)
        {
            try
            {
                return _AD.GetVerticalDivisionsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            try
            {
                return _AD.InsertVerticalDivisions(pVerticalDivisions);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            try
            {
                _AD.UpdateVerticalDivisions(pVerticalDivisions);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteVerticalDivisions(int pId)
        {
            try
            {
                _AD.DeleteVerticalDivisions(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
