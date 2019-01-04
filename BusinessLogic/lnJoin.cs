using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnJoin
    {
        DataAccess.adJoin _AD = new DataAccess.adJoin();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Join.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Join> GetAllJoin()
        {
            try
            {
                return _AD.GetAllJoin();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Join por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Join GetJoinById(int pId)
        {
            try
            {
                return _AD.GetJoinById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertJoin(Join pjoin)
        {
            try
            {
                return _AD.InsertJoin(pjoin);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateJoin(Join pjoin)
        {
            try
            {
                _AD.UpdateJoin(pjoin);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteJoin(int pId)
        {
            try
            {
                _AD.DeleteJoin(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
