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
    public class adMaterialxBottomRail : Connection
    {
        public MaterialxBottomRail GetMaterialxBottomRailById(int Id)
        {
            MaterialxBottomRail matrail = new MaterialxBottomRail();
            string sql = @"[spGetMaterialxBottomRail] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "MaterialxBottomRail", sql, _CN);
                if (ds.Tables["MaterialxBottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["MaterialxBottomRail"].Rows)
                    {
                        matrail = new MaterialxBottomRail()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdBottomRail = int.Parse(item["IdBottomRail"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return matrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<MaterialxBottomRail> GetAllMaterialxBottomRail()
        {
            List<MaterialxBottomRail> matrail = new List<MaterialxBottomRail>();
            string sql = @"[spGetAllMaterialxBottomRail]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "MaterialxBottomRail", sql, _CN);
                if (ds.Tables["MaterialxBottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["MaterialxBottomRail"].Rows)
                    {
                        matrail.Add(new MaterialxBottomRail()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdBottomRail = int.Parse(item["IdBottomRail"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return matrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            string sql = @"[spInsertMaterialxBottomRail] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}'";
            sql = string.Format(sql, pMaterialxBottomRail.IdMaterial, pMaterialxBottomRail.IdBottomRail, pMaterialxBottomRail.IdStatus, pMaterialxBottomRail.CreationDate.ToString("yyyyMMdd"),
                pMaterialxBottomRail.CreatorUser, pMaterialxBottomRail.ModificationDate.ToString("yyyyMMdd"), pMaterialxBottomRail.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            string sql = @"[spUpdateMaterialxBottomRail] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pMaterialxBottomRail.IdMaterial, pMaterialxBottomRail.IdBottomRail, pMaterialxBottomRail.IdStatus, pMaterialxBottomRail.ModificationDate.ToString("yyyyMMdd"),
                pMaterialxBottomRail.ModificationUser);
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
