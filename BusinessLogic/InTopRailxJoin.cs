using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InTopRailxJoin
    {
        DataAccess.adTopRailxJoin _AD = new DataAccess.adTopRailxJoin();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de TopRailxJoin.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<TopRailxJoin> GetAllTopRailxJoin()
        {
            try
            {
                return _AD.GetAllTopRailxJoin();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna TopRailxJoin por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public TopRailxJoin GetTopRailxJoinById(int pId)
        {
            try
            {
                return _AD.GetTopRailxJoinById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertTopRailxJoin(TopRailxJoin pTopRailxJoin)
        {
            try
            {
                return _AD.InsertTopRailxJoin(pTopRailxJoin);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateTopRailxJoin(TopRailxJoin pTopRailxJoin)
        {
            try
            {
                _AD.UpdateTopRailxJoin(pTopRailxJoin);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteTopRailxJoin(int pId)
        {
            try
            {
                _AD.DeleteTopRailxJoin(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
