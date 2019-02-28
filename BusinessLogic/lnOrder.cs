﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnOrder
    {
        DataAccess.adOrder _AD = new DataAccess.adOrder();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Order.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Order> GetAllOrder()
        {
            try
            {
                return _AD.GetAllOrder();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public Totales GetAllTotales(int IdCompany, int IdTypeCompany)
        {
            try
            {
                if (IdTypeCompany == 1)
                {
                    return _AD.GetAllTotales();
                }
                else
                {
                    return _AD.GetAllTotalesxCompany(IdCompany);
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
        /// @Descripción: Retorna Order por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Order GetOrderById(int pId)
        {
            try
            {
                return _AD.GetOrderById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<Order> GetOrderByUser(int pId)
        {
            try
            {
                return _AD.GetOrderByUser(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        
        public int InsertOrder(Order pOrder)
        {
            try
            {
                return _AD.InsertOrder(pOrder);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateOrder(Order pOrder)
        {
            try
            {
                _AD.UpdateOrder(pOrder);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateOrderStatus(Order pOrder)
        {
            try
            {
                _AD.UpdateOrderStatus(pOrder);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteOrder(int pId)
        {
            try
            {
                _AD.DeleteOrder(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
