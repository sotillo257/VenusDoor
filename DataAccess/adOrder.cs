using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Data.SqlClient;
using System.Data;

namespace DataAccess
{
    public class adOrder : Connection
    {
        public Order GetOrderById(int Id)
        {
            Order ord = new Order();
            string sql = @"[spGetOrder] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord = new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            ShippingAddress = new ShippingAddress() { Id = int.Parse(item["IdShip"].ToString()), Name = item["ShippingName"].ToString() },
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Observations = item["Observations"].ToString(),

                        };
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Order> GetOrderByUser(int IdUser)
        {
           List<Order> ord = new List<Order>();
            string sql = @"[spGetOrderByUser] '{0}' ";
            sql = string.Format(sql, IdUser);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord.Add( new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            ShippingAddress = new ShippingAddress() { Id = int.Parse(item["IdShip"].ToString()), Name = item["ShippingName"].ToString() },
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Observations = item["Observations"].ToString(),

                        });
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Order> GetAllOrder()
        {
            List<Order> ord = new List<Order>();
            string sql = @"[spGetAllOrder]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord.Add(new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            ShippingAddress = new ShippingAddress() { Id = int.Parse(item["IdShip"].ToString()), Name = item["ShippingName"].ToString() },
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Observations = item["Observations"].ToString(),

                        });
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }
        

        public List<Order> GetAllOrderByCompany(int IdCompany)
        {
            List<Order> ord = new List<Order>();
            string sql = @"[spGetAllOrderByCompany] '{0}' ";
            sql = string.Format(sql, IdCompany);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord.Add(new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            ShippingAddress = new ShippingAddress() { Id = int.Parse(item["IdShip"].ToString()), Name = item["ShippingName"].ToString() },
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Observations = item["Observations"].ToString(),

                        });
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public Totales GetAllTotales()
        {
            Totales ord = new Totales();
            string sql = @"[spGetTotalesDashboard]  '{0}', '{1}'";
            sql = string.Format(sql, DateTime.Now.Month, DateTime.Today.AddMonths(-1).Month);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Totales", sql, _CN);
                if (ds.Tables["Totales"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Totales"].Rows)
                    {
                        ord = new Totales()
                        {
                            TotalHistorico = decimal.Parse((item["TotalHistorico"].ToString() == "")?"0": item["TotalHistorico"].ToString()),
                            TotalMes = decimal.Parse((item["Total"].ToString() == "") ? "0" : item["Total"].ToString()),
                            TotalMesAnterior = decimal.Parse((item["TotalMesAnterior"].ToString() == "") ? "0" : item["TotalMesAnterior"].ToString()),
                            Enero = decimal.Parse((item["TotalEnero"].ToString() == "")?"0": item["TotalEnero"].ToString()),
                            Febrero = decimal.Parse((item["TotalFebrero"].ToString() == "")?"0":item["TotalFebrero"].ToString()),
                            Marzo = decimal.Parse((item["TotalMarzo"].ToString() == "")?"0":item["TotalMarzo"].ToString()),
                            Abril = decimal.Parse((item["TotalAbril"].ToString() == "")?"0":item["TotalAbril"].ToString()),
                            Mayo = decimal.Parse((item["TotalMayo"].ToString() == "")?"0":item["TotalMayo"].ToString()),
                            Junio = decimal.Parse((item["TotalJunio"].ToString() == "")?"0":item["TotalJunio"].ToString()),
                            Julio = decimal.Parse((item["TotalJulio"].ToString() == "")?"0":item["TotalJulio"].ToString()),
                            Agosto = decimal.Parse((item["TotalAgosto"].ToString() == "")?"0":item["TotalAgosto"].ToString()),
                            Septiembre = decimal.Parse((item["TotalSeptiembre"].ToString() == "")?"0":item["TotalSeptiembre"].ToString()),
                            Octubre = decimal.Parse((item["TotalOctubre"].ToString() == "")?"0":item["TotalOctubre"].ToString()),
                            Noviembre = decimal.Parse((item["TotalNoviembre"].ToString() == "")?"0":item["TotalNoviembre"].ToString()),
                            Diciembre = decimal.Parse((item["TotalDiciembre"].ToString() == "")?"0":item["TotalDiciembre"].ToString())
                        };
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public Totales GetAllTotalesxCompany(int IdCompany)
        {
            Totales ord = new Totales();
            string sql = @"[spGetTotalesDashboardxComany] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, DateTime.Now.Month, DateTime.Today.AddMonths(-1).Month, IdCompany);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Totales", sql, _CN);
                if (ds.Tables["Totales"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Totales"].Rows)
                    {
                        ord = new Totales()
                        {
                            TotalHistorico = decimal.Parse((item["TotalHistorico"].ToString() == "") ? "0" : item["TotalHistorico"].ToString()),
                            TotalMes = decimal.Parse((item["Total"].ToString() == "") ? "0" : item["Total"].ToString()),
                            TotalMesAnterior = decimal.Parse((item["TotalMesAnterior"].ToString() == "") ? "0" : item["TotalMesAnterior"].ToString()),
                            Enero = decimal.Parse((item["TotalEnero"].ToString() == "") ? "0" : item["TotalEnero"].ToString()),
                            Febrero = decimal.Parse((item["TotalFebrero"].ToString() == "") ? "0" : item["TotalFebrero"].ToString()),
                            Marzo = decimal.Parse((item["TotalMarzo"].ToString() == "") ? "0" : item["TotalMarzo"].ToString()),
                            Abril = decimal.Parse((item["TotalAbril"].ToString() == "") ? "0" : item["TotalAbril"].ToString()),
                            Mayo = decimal.Parse((item["TotalMayo"].ToString() == "") ? "0" : item["TotalMayo"].ToString()),
                            Junio = decimal.Parse((item["TotalJunio"].ToString() == "") ? "0" : item["TotalJunio"].ToString()),
                            Julio = decimal.Parse((item["TotalJulio"].ToString() == "") ? "0" : item["TotalJulio"].ToString()),
                            Agosto = decimal.Parse((item["TotalAgosto"].ToString() == "") ? "0" : item["TotalAgosto"].ToString()),
                            Septiembre = decimal.Parse((item["TotalSeptiembre"].ToString() == "") ? "0" : item["TotalSeptiembre"].ToString()),
                            Octubre = decimal.Parse((item["TotalOctubre"].ToString() == "") ? "0" : item["TotalOctubre"].ToString()),
                            Noviembre = decimal.Parse((item["TotalNoviembre"].ToString() == "") ? "0" : item["TotalNoviembre"].ToString()),
                            Diciembre = decimal.Parse((item["TotalDiciembre"].ToString() == "") ? "0" : item["TotalDiciembre"].ToString())
                        };
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertOrder(Order pOrder)
        {
            decimal subtotal = Convert.ToDecimal(pOrder.SubTotal);
            decimal tax = Convert.ToDecimal(pOrder.Tax);
            decimal total = Convert.ToDecimal(pOrder.Total);
            string sql = @"[spInsertOrder] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}'";
            sql = string.Format(sql, pOrder.User.Id, pOrder.Quantity, subtotal.ToString().Replace(',', '.'), tax.ToString().Replace(',', '.'), total.ToString().Replace(',', '.'),pOrder.ShippingAddress.Id, pOrder.Type.Id, pOrder.Status.Id, pOrder.CreationDate.ToString("yyyyMMdd HH:mm:ss"),
                pOrder.CreatorUser, pOrder.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pOrder.ModificationUser, pOrder.Observations);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateOrder(Order pOrder)
        {
            decimal subtotal = Convert.ToDecimal(pOrder.SubTotal);
            decimal tax = Convert.ToDecimal(pOrder.Tax);
            decimal total = Convert.ToDecimal(pOrder.Total);
            string sql = @"[spUpdateOrder] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}'";

            sql = string.Format(sql, pOrder.Id, pOrder.User.Id, pOrder.Quantity, subtotal.ToString().Replace(',', '.'), tax.ToString().Replace(',', '.'), total.ToString().Replace(',', '.'), pOrder.ShippingAddress.Id, pOrder.Type.Id, pOrder.Status.Id, pOrder.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pOrder.ModificationUser, pOrder.Observations);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateOrderStatus(Order pOrder)
        {
            string sql = @"[spUpdateOrderStatus] '{0}', '{1}', '{2}', '{3}'";

            sql = string.Format(sql, pOrder.Id, pOrder.Status.Id, pOrder.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pOrder.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Elimina Order por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteOrder(int pId)
        {
            string sql = @"[spDeleteOrder] '{0}'";
            sql = string.Format(sql, pId);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }
    }
}
