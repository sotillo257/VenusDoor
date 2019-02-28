using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDecimals
    {
        DataAccess.adDecimals _AD = new DataAccess.adDecimals();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Decimals.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Decimals> GetAllDecimals()
        {
            try
            {
                return _AD.GetAllDecimals();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Decimals por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Decimals GetDecimalsById(int pId)
        {
            try
            {
                return _AD.GetDecimalsById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDecimals(Decimals pDecimals)
        {
            try
            {
                return _AD.InsertDecimals(pDecimals);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDecimals(Decimals pDecimals)
        {
            try
            {
                _AD.UpdateDecimals(pDecimals);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDecimals(int pId)
        {
            try
            {
                _AD.DeleteDecimals(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Decimals dDecimals(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteDecimals(Decimals dDecimals)
        {
            throw new NotImplementedException();
        }
    }
}
