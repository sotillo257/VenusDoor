using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPerson
    {
        DataAccess.adPerson _AD = new DataAccess.adPerson();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Person.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Person> GetAllPerson()
        {
            try
            {
                return _AD.GetAllPerson();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Person por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Person GetPersonById(int pId)
        {
            try
            {
                return _AD.GetPersonById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPerson(Person pPerson)
        {
            try
            {
                return _AD.InsertPerson(pPerson);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePerson(Person pPerson)
        {
            try
            {
                _AD.UpdatePerson(pPerson);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePerson(int pId)
        {
            try
            {
                _AD.DeletePerson(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
