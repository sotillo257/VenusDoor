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
    public class adPaymentsReceived : Connection
    {
        public List<PaymentsReceived> GetPaymentsReceived(int Id, int IdCompany, int IdUserCliente, int CreatorUser, DateTime PaymentDate)
        {
            List<PaymentsReceived> cdn = new List<PaymentsReceived>();
            string sql = @"[spGetPaymentsReceived] '{0}','{1}','{2}','{3}','{4}'";
            sql = string.Format(sql, Id, IdCompany, IdUserCliente, CreatorUser, PaymentDate.ToString("yyyyMMdd"));

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentsReceived", sql, _CN);
                if (ds.Tables["PaymentsReceived"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentsReceived"].Rows)
                    {
                        cdn.Add(new PaymentsReceived()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            Amount = decimal.Parse(item["Amount"].ToString()),
                            PaymentDate = (item["PaymentDate"].ToString() != "") ? DateTime.Parse(item["PaymentDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            PaymentMode = new PaymentMode() { Id = int.Parse(item["IdPaymentMode"].ToString())},
                            DepositTo = new DepositTo() { Id = int.Parse(item["IdDepositTo"].ToString())},
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentsReceived> GetPaymentsReceivedByIdCompany(int IdCompany)
        {
            List<PaymentsReceived> cdn = new List<PaymentsReceived>();
            string sql = @"[spGetPaymentsReceivedByIdCompany] '{0}' ";
            sql = string.Format(sql, IdCompany);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentsReceived", sql, _CN);
                if (ds.Tables["PaymentsReceived"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentsReceived"].Rows)
                    {
                        cdn.Add(new PaymentsReceived()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            Amount = decimal.Parse(item["Amount"].ToString()),
                            PaymentDate = (item["PaymentDate"].ToString() != "") ? DateTime.Parse(item["PaymentDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            PaymentMode = new PaymentMode() { Id = int.Parse(item["IdPaymentMode"].ToString()) },
                            DepositTo = new DepositTo() { Id = int.Parse(item["IdDepositTo"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentsReceived> GetAllPaymentsReceived()
        {
            List<PaymentsReceived> cdn = new List<PaymentsReceived>();
            string sql = @"[spGetAllPaymentsReceived]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentsReceived", sql, _CN);
                if (ds.Tables["PaymentsReceived"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentsReceived"].Rows)
                    {
                        cdn.Add(new PaymentsReceived()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            Amount = decimal.Parse(item["Amount"].ToString()),
                            PaymentDate = (item["PaymentDate"].ToString() != "") ? DateTime.Parse(item["PaymentDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            PaymentMode = new PaymentMode() { Id = int.Parse(item["IdPaymentMode"].ToString()) },
                            DepositTo = new DepositTo() { Id = int.Parse(item["IdDepositTo"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPaymentsReceived(PaymentsReceived pPaymentsReceived)
        {
            string sql = @"[spInsertPaymentsReceived] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}'";
            sql = string.Format(sql, pPaymentsReceived.IdFolio, pPaymentsReceived.Company.Id, pPaymentsReceived.UserCliente.Id, pPaymentsReceived.Amount,
            pPaymentsReceived.PaymentDate.ToString("yyyyMMdd"), pPaymentsReceived.PaymentMode.Id, pPaymentsReceived.DepositTo.Id, pPaymentsReceived.Status.Id, 
            pPaymentsReceived.CreatorUser, pPaymentsReceived.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePaymentsReceived(PaymentsReceived pPaymentsReceived)
        {
            string sql = @"[spUpdatePaymentsReceived] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}'";
            sql = string.Format(sql, pPaymentsReceived.Id, pPaymentsReceived.IdFolio, pPaymentsReceived.Company.Id, pPaymentsReceived.UserCliente.Id, pPaymentsReceived.Amount,
            pPaymentsReceived.PaymentDate.ToString("yyyyMMdd"), pPaymentsReceived.PaymentMode.Id, pPaymentsReceived.DepositTo.Id, pPaymentsReceived.Status.Id,
            pPaymentsReceived.CreationDate.ToString("yyyyMMdd"), pPaymentsReceived.CreatorUser, pPaymentsReceived.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePaymentsReceivedStatus(PaymentsReceived pPaymentsReceived)
        {
            string sql = @"[spUpdatePaymentsReceivedStatus] '{0}', '{1}', '{2}'";

            sql = string.Format(sql, pPaymentsReceived.Id, pPaymentsReceived.Status.Id,
                pPaymentsReceived.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeletePaymentsReceived(int pId)
        {
            string sql = @"[spDeletePaymentsReceived] '{0}'";
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