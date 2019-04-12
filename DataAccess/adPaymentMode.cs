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
    public class adPaymentMode : Connection
    {
        public PaymentMode GetPaymentModeById(int Id)
        {
            PaymentMode PaymentMode = new PaymentMode();
            string sql = @"[spGetPaymentMode] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentMode", sql, _CN);
                if (ds.Tables["PaymentMode"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentMode"].Rows)
                    {
                        PaymentMode = new PaymentMode()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return PaymentMode;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<PaymentMode> GetAllPaymentMode()
        {
            List<PaymentMode> PaymentMode = new List<PaymentMode>();
            string sql = @"[spGetAllPaymentMode]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentMode", sql, _CN);
                if (ds.Tables["PaymentMode"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentMode"].Rows)
                    {
                        PaymentMode.Add(new PaymentMode()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return PaymentMode;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPaymentMode(PaymentMode pPaymentMode)
        {
            string sql = @"[spInsertPaymentMode] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pPaymentMode.Description, pPaymentMode.Status.Id,
                pPaymentMode.CreatorUser, pPaymentMode.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePaymentMode(PaymentMode pPaymentMode)
        {
            string sql = @"[spUpdatePaymentMode] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pPaymentMode.Id, pPaymentMode.Description, pPaymentMode.Status.Id,
                pPaymentMode.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeletePaymentMode(int pId)
        {
            string sql = @"[spDeletePaymentMode] '{0}'";
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