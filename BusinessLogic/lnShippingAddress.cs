using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnShippingAddress
    {
        DataAccess.adShippingAddress _AD = new DataAccess.adShippingAddress();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de ShippingAddress.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<ShippingAddress> GetAllShippingAddress()
        {
            try
            {
                return _AD.GetAllShippingAddress();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna ShippingAddress por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public ShippingAddress GetShippingAddressById(int pId)
        {
            try
            {
                return _AD.GetShippingAddressById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<ShippingAddress> GetShippingAddressByIdUser(int pIdUser)
        {
            try
            {
                return _AD.GetShippingAddressByIdUser(pIdUser);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertShippingAddress(ShippingAddress pShippingAddress)
        {
            try
            {
                return _AD.InsertShippingAddress(pShippingAddress);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateShippingAddress(ShippingAddress pShippingAddress)
        {
            try
            {
                _AD.UpdateShippingAddress(pShippingAddress);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteShippingAddress(int pId)
        {
            try
            {
                _AD.DeleteShippingAddress(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public ShippingAddress dShippingAddress(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteShippingAddress(ShippingAddress dShippingAddress)
        {
            throw new NotImplementedException();
        }
    }
}
