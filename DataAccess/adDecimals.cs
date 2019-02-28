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
    public class adDecimals : Connection
    {
        public Decimals GetDecimalsById(int Id)
        {
            Decimals Decimals = new Decimals();
            string sql = @"[spGetDecimals] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Decimals", sql, _CN);
                if (ds.Tables["Decimals"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Decimals"].Rows)
                    {
                        Decimals = new Decimals()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Value = decimal.Parse(item["Value"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },                            
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return Decimals;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Decimals> GetAllDecimals()
        {
            List<Decimals> Decimals = new List<Decimals>();
            string sql = @"[spGetAllDecimals]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Decimals", sql, _CN);
                if (ds.Tables["Decimals"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Decimals"].Rows)
                    {
                        Decimals.Add(new Decimals()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Value = decimal.Parse(item["Value"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return Decimals;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDecimals(Decimals pDecimals)
        {
            string sql = @"[spInsertDecimals] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}'";
            sql = string.Format(sql, pDecimals.Description, pDecimals.Value.ToString().Replace(',', '.'), pDecimals.Status.Id, pDecimals.CreationDate.ToString("yyyyMMdd"),
                pDecimals.CreatorUser, pDecimals.ModificationDate.ToString("yyyyMMdd"), pDecimals.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDecimals(Decimals pDecimals)
        {
            string sql = @"[spUpdateDecimals] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDecimals.Id, pDecimals.Description, pDecimals.Value.ToString().Replace(',', '.'), pDecimals.Status.Id, pDecimals.ModificationDate.ToString("yyyyMMdd"),
                pDecimals.ModificationUser);
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
        /// @Descripción: Elimina Decimals por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDecimals(int pId)
        {
            string sql = @"[spDeleteDecimals] '{0}'";
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
