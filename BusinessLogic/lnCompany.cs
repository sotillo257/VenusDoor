using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnCompany
    {
        DataAccess.adCompany _AD = new DataAccess.adCompany();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Company.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Company> GetAllCompany()
        {
            try
            {
                return _AD.GetAllCompany();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Company por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Company GetCompanyById(int pId)
        {
            try
            {
                return _AD.GetCompanyById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertCompany(Company pCompany)
        {
            try
            {
                return _AD.InsertCompany(pCompany);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateCompany(Company pCompany)
        {
            try
            {
                _AD.UpdateCompany(pCompany);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteCompany(int pId)
        {
            try
            {
                _AD.DeleteCompany(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
