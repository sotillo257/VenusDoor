using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InTopRailxVerticalDivisions
    {
        DataAccess.adTopRailxVerticalDivisions _AD = new DataAccess.adTopRailxVerticalDivisions();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de TopRailxVerticalDivisions.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<TopRailxVerticalDivisions> GetAllTopRailxVerticalDivisions()
        {
            try
            {
                return _AD.GetAllTopRailxVerticalDivisions();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna TopRailxVerticalDivisions por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public TopRailxVerticalDivisions GetTopRailxVerticalDivisionsById(int pId)
        {
            try
            {
                return _AD.GetTopRailxVerticalDivisionsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertTopRailxVerticalDivisions(TopRailxVerticalDivisions pTopRailxVerticalDivisions)
        {
            try
            {
                return _AD.InsertTopRailxVerticalDivisions(pTopRailxVerticalDivisions);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateTopRailxVerticalDivisions(TopRailxVerticalDivisions pTopRailxVerticalDivisions)
        {
            try
            {
                _AD.UpdateTopRailxVerticalDivisions(pTopRailxVerticalDivisions);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteTopRailxVerticalDivisions(int pId)
        {
            try
            {
                _AD.DeleteTopRailxVerticalDivisions(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
