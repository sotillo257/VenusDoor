using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnGroup
    {
        DataAccess.adGroup _AD = new DataAccess.adGroup();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Group.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Group> GetAllGroup()
        {
            try
            {
                return _AD.GetAllGroup();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Group por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Group GetGroupById(int pId)
        {
            try
            {
                return _AD.GetGroupById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertGroup(Group pGroup)
        {
            try
            {
                return _AD.InsertGroup(pGroup);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateGroup(Group pGroup)
        {
            try
            {
                _AD.UpdateGroup(pGroup);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteGroup(int pId)
        {
            try
            {
                _AD.DeleteGroup(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
