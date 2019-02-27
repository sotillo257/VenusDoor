using System.Security.Principal;
using System.Web.Security;

namespace VenusDoors
{
    public class UserIdentity : IIdentity, IPrincipal
    {
        private FormsAuthenticationTicket ticket;

        public UserIdentity(FormsAuthenticationTicket _ticket)
        {
            ticket = _ticket;
        }

        public string AuthenticationType
        {
            get { return ticket.UserData; }
        }

        public bool IsAuthenticated
        {
            get { return true; }
        }

        public string Name
        {
            get { return ticket.Name; }
        }

        public IIdentity Identity
        {
            get { return this; }
        }

        public bool IsInRole(string role)
        {
            return Roles.IsUserInRole(role);
        }
    }
}