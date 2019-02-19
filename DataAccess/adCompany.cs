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
    public class adCompany: Connection
    {
        public Company GetCompanyById(int Id)
        {
            Company comp = new Company();
            string sql = @"[spGetCompany] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Company", sql, _CN);
                if (ds.Tables["Company"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Company"].Rows)
                    {
                        comp = new Company()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Email = item["Email"].ToString(),
                            Direction = item["Direction"].ToString(),
                            Telephone = item["Telephone"].ToString(),
                            Logo = item["Logo"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },                            
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },                            
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return comp;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Company> GetAllCompany()
        {
            List<Company> comp = new List<Company>();
            string sql = @"[spGetAllCompany]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Company", sql, _CN);
                if (ds.Tables["Company"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Company"].Rows)
                    {
                        comp.Add(new Company()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Email = item["Email"].ToString(),
                            Direction = item["Direction"].ToString(),
                            Telephone = item["Telephone"].ToString(),
                            Logo = item["Logo"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return comp;
            }
            catch (Exception err)
            {
                throw err;
            }

        }

        public int InsertCompany(Company pCompany)
        {
            string sql = @"[spInsertCompany] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}'";
            sql = string.Format(sql, pCompany.Name, pCompany.Email, pCompany.Direction, pCompany.Telephone, pCompany.Logo, pCompany.Type.Id, pCompany.Status.Id, pCompany.CreationDate.ToString("yyyyMMdd"),
                pCompany.CreatorUser, pCompany.ModificationDate.ToString("yyyyMMdd"), pCompany.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateCompany(Company pCompany)
        {
            string sql = @"[spUpdateCompany] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}'";
            sql = string.Format(sql, pCompany.Id, pCompany.Name, pCompany.Email, pCompany.Direction, pCompany.Telephone, pCompany.Logo, pCompany.Type.Id, pCompany.Status.Id, pCompany.ModificationDate.ToString("yyyyMMdd"),
                pCompany.ModificationUser);
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
        /// @Descripción: Elimina Company por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteCompany(int pId)
        {
            string sql = @"[spDeleteCompany] '{0}'";
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
