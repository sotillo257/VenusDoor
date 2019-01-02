using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InDoorsxUser
    {
        DataAccess.adDoorsxUser _AD = new DataAccess.adDoorsxUser();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorsxUser.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorsxUser> GetAllDoorsxUser()
        {
            try
            {
                return _AD.GetAllDoorsxUser();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorsxUser por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorsxUser GetDoorsxUserById(int pId)
        {
            try
            {
                return _AD.GetDoorsxUserById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorsxUser(DoorsxUser pDoorsxUser)
        {
            try
            {
                return _AD.InsertDoorsxUser(pDoorsxUser);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorsxUser(DoorsxUser pDoorsxUser)
        {
            try
            {
                _AD.UpdateDoorsxUser(pDoorsxUser);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorsxUser(int pId)
        {
            try
            {
                _AD.DeleteDoorsxUser(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
