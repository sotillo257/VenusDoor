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
                            IdUser = int.Parse(item["IdUser"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            IdType = int.Parse(item["IdType"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
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
                            IdUser = int.Parse(item["IdUser"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            IdType = int.Parse(item["IdType"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
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
            sql = string.Format(sql, pOrder.IdUser, pOrder.Quantity, pOrder.Total, pOrder.IdType, pOrder.IdStatus, pOrder.CreationDate.ToString("yyyyMMdd"),
                pOrder.CreatorUser, pOrder.ModificationDate.ToString("yyyyMMdd"), pOrder.ModificationUser);
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
            string sql = @"[spUpdateOrder] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}, '{6}";
            sql = string.Format(sql, pOrder.IdUser, pOrder.Quantity, pOrder.Total, pOrder.IdType, pOrder.IdStatus, pOrder.ModificationDate.ToString("yyyyMMdd"),
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
    }
}
