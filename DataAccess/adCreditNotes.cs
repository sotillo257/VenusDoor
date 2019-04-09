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
    public class adCreditNotes : Connection
    {
        public List<CreditNotes> GetCreditNotes(int Id, int IdCompany, int IdUserCliente, int IdUserVendedor, int CreatorUser, DateTime PaymentsDate)
        {
            List<CreditNotes> cdn = new List<CreditNotes>();
            string sql = @"[spGetCreditNotes] '{0}','{1}','{2}','{3}','{4}','{5}'";
            sql = string.Format(sql, Id, IdCompany, IdUserCliente, IdUserVendedor, CreatorUser, PaymentsDate.ToString("yyyyMMdd"));

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "CreditNotes", sql, _CN);
                if (ds.Tables["CreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["CreditNotes"].Rows)
                    {
                        cdn.Add(new CreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            PaymentsDate = (item["PaymentsDate"].ToString() != "") ? DateTime.Parse(item["PaymentsDate"].ToString()) : DateTime.Parse("01/01/1900"),
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
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<CreditNotes> GetCreditNotesByIdCompany(int IdCompany)
        {
            List<CreditNotes> cdn = new List<CreditNotes>();
            string sql = @"[spGetCreditNotesByIdCompany] '{0}' ";
            sql = string.Format(sql, IdCompany);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "CreditNotes", sql, _CN);
                if (ds.Tables["CreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["CreditNotes"].Rows)
                    {
                        cdn.Add(new CreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            PaymentsDate = (item["PaymentsDate"].ToString() != "") ? DateTime.Parse(item["PaymentsDate"].ToString()) : DateTime.Parse("01/01/1900"),
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
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<CreditNotes> GetAllCreditNotes()
        {
            List<CreditNotes> cdn = new List<CreditNotes>();
            string sql = @"[spGetAllCreditNotes]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "CreditNotes", sql, _CN);
                if (ds.Tables["CreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["CreditNotes"].Rows)
                    {
                        cdn.Add(new CreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString()},
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString())},
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString())},
                            PaymentsDate = (item["PaymentsDate"].ToString() != "") ? DateTime.Parse(item["PaymentsDate"].ToString()) : DateTime.Parse("01/01/1900"),
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
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertCreditNotes(CreditNotes pCreditNotes)
        {
            string sql = @"[spInsertCreditNotes] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}'";
            sql = string.Format(sql, pCreditNotes.IdFolio, pCreditNotes.Company.Id, pCreditNotes.UserCliente.Id, pCreditNotes.UserVendedor.Id, pCreditNotes.Order.Id, 
            pCreditNotes.PaymentsDate.ToString("yyyyMMdd"), pCreditNotes.Total, pCreditNotes.TotalDue, pCreditNotes.TermsAndConditions, pCreditNotes.Status.Id, pCreditNotes.CreationDate.ToString("yyyyMMdd"),
            pCreditNotes.CreatorUser, pCreditNotes.ModificationDate.ToString("yyyyMMdd"), pCreditNotes.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateCreditNotes(CreditNotes pCreditNotes)
        {
            string sql = @"[spUpdateCreditNotes] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}'";
            sql = string.Format(sql, pCreditNotes.Id, pCreditNotes.IdFolio, pCreditNotes.Company.Id, pCreditNotes.UserCliente.Id, pCreditNotes.UserVendedor.Id, pCreditNotes.Order.Id,
            pCreditNotes.PaymentsDate.ToString("yyyyMMdd"), pCreditNotes.Total, pCreditNotes.TotalDue, pCreditNotes.TermsAndConditions, pCreditNotes.Status.Id,
            pCreditNotes.ModificationDate.ToString("yyyyMMdd"), pCreditNotes.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateCreditNotesStatus(CreditNotes pCreditNotes)
        {
            string sql = @"[spUpdateCreditNotesStatus] '{0}', '{1}', '{2}', '{3}'";

            sql = string.Format(sql, pCreditNotes.Id, pCreditNotes.Status.Id, pCreditNotes.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pCreditNotes.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteCreditNotes(int pId)
        {
            string sql = @"[spDeleteCreditNotes] '{0}'";
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