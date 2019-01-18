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
                            Total = int.Parse(item["Total"].ToString()),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

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

        public Order GetOrderByUser(int IdUser)
        {
            Order ord = new Order();
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
                        ord = new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Total = int.Parse(item["Total"].ToString()),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

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
                            Total = int.Parse(item["Total"].ToString()),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

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

        public int InsertOrder(Order pOrder)
        {
            string sql = @"[spInsertOrder] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}'";
            sql = string.Format(sql, pOrder.User.Id, pOrder.Quantity, pOrder.Total, pOrder.Type.Id, pOrder.Status.Id, pOrder.CreationDate.ToString("yyyy-MM-dd"),
                pOrder.CreatorUser, pOrder.ModificationDate.ToString("yyyy-MM-dd"), pOrder.ModificationUser);
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
            string sql = @"[spUpdateOrder] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}'";
            sql = string.Format(sql, pOrder.Id, pOrder.User.Id, pOrder.Quantity, pOrder.Total, pOrder.Type.Id, pOrder.Status.Id, pOrder.ModificationDate.ToString("yyyy-MM-dd"),
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
