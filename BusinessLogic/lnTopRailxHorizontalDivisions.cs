using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnTopRailxHorizontalDivisions
    {
        DataAccess.adTopRailxHorizontalDivisions _AD = new DataAccess.adTopRailxHorizontalDivisions();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de TopRailxHorizontalDivisions.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<TopRailxHorizontalDivisions> GetAllTopRailxHorizontalDivisions()
        {
            try
            {
                return _AD.GetAllTopRailxHorizontalDivisions();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna TopRailxHorizontalDivisions por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public TopRailxHorizontalDivisions GetTopRailxHorizontalDivisionsById(int pId)
        {
            try
            {
                return _AD.GetTopRailxHorizontalDivisionsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailxHorizontalDivisions)
        {
            try
            {
                return _AD.InsertTopRailxHorizontalDivisions(pTopRailxHorizontalDivisions);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailxHorizontalDivisions)
        {
            try
            {
                _AD.UpdateTopRailxHorizontalDivisions(pTopRailxHorizontalDivisions);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteTopRailxHorizontalDivisions(int pId)
        {
            try
            {
                _AD.DeleteTopRailxHorizontalDivisions(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
