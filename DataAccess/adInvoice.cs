
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Model;

namespace DataAccess
{
    public class adInvoice : Connection
    {
        public Invoice GetInvoice(int IdEstimate, int IdCompany, int IdUserCliente, int IdUserVendedor, DateTime Invoicedate, DateTime Expirydate)
        {
            Invoice inv = new Invoice();
            string sql = @"[spGetInvoice] '{0}', '{1}','{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, IdEstimate, IdCompany, IdUserCliente, IdUserVendedor, Invoicedate, Expirydate);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Invoice", sql, _CN);
                if (ds.Tables["Invoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Invoice"].Rows)
                    {
                        inv = new Invoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Estimate = new Estimate() { Id = int.Parse(item["IdEstimate"].ToString()) },
                            InvoiceDate = (item["InvoiceDate"].ToString() != "") ? DateTime.Parse(item["InvoiceDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TotalDue = decimal.Parse(item["TotalDue"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return inv;
            }

            catch (Exception)
            {
                throw;
            }

        }

        public Invoice GetInvoiceByIdCompany(int IdCompany)
        {
            Invoice inv = new Invoice();
            string sql = @"[spGetInvoiceByIdCompany] '{0}' ";
            sql = string.Format(sql, IdCompany);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Invoice", sql, _CN);
                if (ds.Tables["Invoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Invoice"].Rows)
                    {
                        inv = new Invoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Estimate = new Estimate() { Id = int.Parse(item["IdEstimate"].ToString()) },
                            InvoiceDate = (item["InvoiceDate"].ToString() != "") ? DateTime.Parse(item["InvoiceDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TotalDue = decimal.Parse(item["TotalDue"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                        };
                    }
                }
                return inv;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Invoice> GetAllInvoice()
        {
            List<Invoice> inv = new List<Invoice>();
            string sql = @"[spGetAllInvoice]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Invoice", sql, _CN);
                if (ds.Tables["Invoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Invoice"].Rows)
                    {
                        inv.Add(new Invoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Estimate = new Estimate() { Id = int.Parse(item["IdEstimate"].ToString()) },
                            InvoiceDate = (item["InvoiceDate"].ToString() != "") ? DateTime.Parse(item["InvoiceDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TotalDue = decimal.Parse(item["TotalDue"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return inv;
            }
            catch (Exception erro)
            {
                throw;
            }

        }

        public int InsertInvoice(Invoice pInv)
        {
            string sql = @"[spInsertInvoice] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}'";
            sql = string.Format(sql, pInv.IdFolio, pInv.Company.Id, pInv.UserCliente.Id, pInv.UserVendedor.Id, pInv.Estimate.Id, pInv.InvoiceDate.ToString("yyyyMMdd HH:mm:ss"), pInv.ExpiryDate.ToString("yyyyMMdd HH:mm:ss"),
                pInv.Total.ToString().Replace(',', '.'), pInv.TotalDue.ToString().Replace(',', '.'), pInv.TermsAndConditions, pInv.Status.Id, pInv.CreationDate.ToString("yyyyMMdd HH:mm:ss"), pInv.CreatorUser, pInv.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pInv.ModificationUser, 7);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateInvoice(Invoice pInv)
        {
            string sql = @"[spUpdateInvoice] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}'";
            sql = string.Format(sql, pInv.Id, pInv.IdFolio, pInv.Company.Id, pInv.UserCliente.Id, pInv.UserVendedor.Id, pInv.Estimate.Id, pInv.InvoiceDate.ToString("yyyyMMdd HH:mm:ss"), pInv.ExpiryDate.ToString("yyyyMMdd HH:mm:ss"),
                pInv.Total.ToString().Replace(',', '.'), pInv.TotalDue.ToString().Replace(',', '.'), pInv.TermsAndConditions, pInv.Status.Id, pInv.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pInv.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateInvoiceStatus(Invoice pInv)
        {
            string sql = @"[spUpdateInvoiceStatus] '{0}', '{1}', '{2}', '{3}'";

            sql = string.Format(sql, pInv.Id, pInv.Status.Id, pInv.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pInv.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteInvoice(int pId)
        {
            string sql = @"[spDeleteInvoice] '{0}'";
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
