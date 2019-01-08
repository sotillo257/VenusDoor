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
    public class adPanelMaterial : Connection
    {
        public PanelMaterial GetPanelMaterialById(int Id)
        {
            PanelMaterial pan = new PanelMaterial();
            string sql = @"[spGetPanelMaterial] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PanelMaterial", sql, _CN);
                if (ds.Tables["PanelMaterial"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PanelMaterial"].Rows)
                    {
                        pan = new PanelMaterial()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["Description"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return pan;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<PanelMaterial> GetAllPanelMaterial()
        {
            List<PanelMaterial> pan = new List<PanelMaterial>();
            string sql = @"[spGetAllPanelMaterial]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PanelMaterial", sql, _CN);
                if (ds.Tables["PanelMaterial"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PanelMaterial"].Rows)
                    {
                        pan.Add(new PanelMaterial()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["Description"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return pan;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPanelMaterial(PanelMaterial pPanelMaterial)
        {
            string sql = @"[spInsertPanelMaterial] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pPanelMaterial.Description, pPanelMaterial.Status.Id, pPanelMaterial.CreationDate.ToString("yyyy-MM-dd"),
                pPanelMaterial.CreatorUser, pPanelMaterial.ModificationDate.ToString("yyyy-MM-dd"), pPanelMaterial.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePanelMaterial(PanelMaterial pPanelMaterial)
        {
            string sql = @"[spUpdatePanelMaterial] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pPanelMaterial.Description, pPanelMaterial.Status.Id, pPanelMaterial.ModificationDate.ToString("yyyy-MM-dd"),
                pPanelMaterial.ModificationUser);
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
        /// @Descripción: Elimina PanelMaterial por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeletePanelMaterial(int pId)
        {
            string sql = @"[spDeletePanelMaterial] '{0}'";
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
