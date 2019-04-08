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
    public class adEstimate : Connection
    {
        public List<Estimate> GetEstimateById(int Id, int IdCompany, int IdUserCliente, int IdUserVendedor, int CreatorUser, DateTime EstimateDate, DateTime Expirydate)
        {
            List<Estimate> est = new List<Estimate>();
            string sql = @"[spGetEstimate] '{0}','{1}','{2}','{3}','{4}','{5}','{6}' ";
            sql = string.Format(sql, Id, IdCompany, IdUserCliente, IdUserVendedor, CreatorUser, EstimateDate.ToString("yyyyMMdd"), Expirydate.ToString("yyyyMMdd"));

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Estimates", sql, _CN);
                if (ds.Tables["Estimates"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Estimates"].Rows)
                    {
                        est.Add(new Estimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()), Person = new Person() { Name = item["NameCliente"].ToString() } },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            EstimateDate = (item["EstimateDate"].ToString() != "") ? DateTime.Parse(item["EstimateDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return est;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Estimate> GetEstimateByIdCompany(int IdCompania)
        {
            List<Estimate> est = new List<Estimate>();
            string sql = @"[spGetEstimateByIdCompany] '{0}' ";
            sql = string.Format(sql, IdCompania);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Estimates", sql, _CN);
                if (ds.Tables["Estimates"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Estimates"].Rows)
                    {
                        est.Add(new Estimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            EstimateDate = (item["EstimateDate"].ToString() != "") ? DateTime.Parse(item["EstimateDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return est;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Estimate> GetAllEstimate()
        {
            List<Estimate> est = new List<Estimate>();
            string sql = @"[spGetAllEstimate]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Estimates", sql, _CN);
                if (ds.Tables["Estimates"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Estimates"].Rows)
                    {
                        est.Add(new Estimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdFolio = item["IdFolio"].ToString(),
                            Company = new Company() { Id = int.Parse(item["IdCompany"].ToString()), Name = item["NameCompany"].ToString() },
                            UserCliente = new User() { Id = int.Parse(item["IdUserCliente"].ToString()) },
                            UserVendedor = new User() { Id = int.Parse(item["IdUserVendedor"].ToString()) },
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            EstimateDate = (item["EstimateDate"].ToString() != "") ? DateTime.Parse(item["EstimateDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ExpiryDate = (item["ExpiryDate"].ToString() != "") ? DateTime.Parse(item["ExpiryDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            Total = decimal.Parse(item["Total"].ToString()),
                            TermsAndConditions = item["TermsAndConditions"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return est;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertEstimate(Estimate pEst)
        {
            string sql = @"[spInsertEstimate] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}'";
            sql = string.Format(sql, pEst.IdFolio, pEst.Company.Id, pEst.UserCliente.Id, pEst.UserVendedor.Id, pEst.Order.Id, pEst.EstimateDate.ToString("yyyyMMdd HH:mm:ss"), pEst.ExpiryDate.ToString("yyyyMMdd HH:mm:ss"),
                pEst.Total.ToString().Replace(',', '.'), pEst.TermsAndConditions, pEst.Status.Id, pEst.CreationDate.ToString("yyyyMMdd HH:mm:ss"), pEst.CreatorUser, pEst.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pEst.ModificationUser, 7);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateEstimate(Estimate pEst)
        {
            string sql = @"[spUpdateEstimate] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}'";
            sql = string.Format(sql, pEst.Id, pEst.IdFolio, pEst.Company.Id, pEst.UserCliente.Id, pEst.UserVendedor.Id, pEst.Order.Id, pEst.EstimateDate.ToString("yyyyMMdd HH:mm:ss"), pEst.ExpiryDate.ToString("yyyyMMdd HH:mm:ss"),
                pEst.Total.ToString().Replace(',', '.'), pEst.TermsAndConditions, pEst.Status.Id, pEst.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pEst.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateEstimateStatus(Estimate pEst)
        {
            string sql = @"[spUpdateEstimateStatus] '{0}', '{1}', '{2}', '{3}'";

            sql = string.Format(sql, pEst.Id, pEst.Status.Id, pEst.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pEst.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteEstimate(int pId)
        {
            string sql = @"[spDeleteEstimate] '{0}'";
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
