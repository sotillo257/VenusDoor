using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace VenusDoors
{
    public class CustomRoleProvider : RoleProvider
    {
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            try
            {
                //BusinessLogic.lnType type = new BusinessLogic.lnType();
                List<string> Acciones = new List<string>();
                //var _Type = type.GetAllType().Where(x => x.Group.Id == 1).ToList();
                //foreach (var item in _Type)
                //{
                BusinessLogic.lnUser user = new BusinessLogic.lnUser();
                int number = 0;
                if (int.TryParse(username, out number))
                {
                   var y = user.GetUserById(int.Parse(username));
                    Acciones.Add(y.Type.Id.ToString());
                }
                else
                {
                    Acciones.Add("0");
                }
                //}

                return Acciones.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}