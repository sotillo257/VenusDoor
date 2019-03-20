using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnUser
    {
        DataAccess.adUser _AD = new DataAccess.adUser();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de User.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<User> GetAllUser()
        {
            try
            {
                return _AD.GetAllUser();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<User> GetAllUserByCompany(int pIdCompany, int pType)
        {
            try
            {
                if (pType == 1)
                {
                    return _AD.GetAllUser();
                }
                else
                {
                    return _AD.GetAllUserByCompany(pIdCompany);
                }

            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna User por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public User GetUserById(int pId)
        {
            try
            {
                return _AD.GetUserById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertUser(User pUser)
        {
            try
            {
                return _AD.InsertUser(pUser);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateUser(User pUser)
        {
            try
            {
                _AD.UpdateUser(pUser);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateUserStatus(User pUser)
        {
            try
            {
                _AD.UpdateUserStatus(pUser);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteUser(int pId)
        {
            try
            {
                _AD.DeleteUser(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public dynamic GetAllCompany()
        {
            throw new NotImplementedException();
        }

        public bool UpdateDescuentoUser(int IdUser,int IdDescuento, int IdUserAdmin) {
            try
            {
                User u = GetUserById(IdUser);
                u.Descuento = IdDescuento;
                u.ModificationDate = DateTime.Now;
                u.ModificationUser = IdUserAdmin;
                UpdateUser(u);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
