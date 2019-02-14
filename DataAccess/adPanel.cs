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
    public class adPanel : Connection
    {
        public Panel GetPanelById(int Id)
        {
            Panel pan = new Panel();
            string sql = @"[spGetPanel] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Panel", sql, _CN);
                if (ds.Tables["Panel"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Panel"].Rows)
                    {
                        pan = new Panel()
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
                return pan;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Panel> GetAllPanel()
        {
            List<Panel> pan = new List<Panel>();
            string sql = @"[spGetAllPanel]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Panel", sql, _CN);
                if (ds.Tables["Panel"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Panel"].Rows)
                    {
                        pan.Add(new Panel()
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
                return pan;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPanel(Panel pPanel)
        {
            string sql = @"[spInsertPanel] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pPanel.Description, pPanel.Status.Id, pPanel.CreationDate.ToString("yyyyMMdd"),
                pPanel.CreatorUser, pPanel.ModificationDate.ToString("yyyyMMdd"), pPanel.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePanel(Panel pPanel)
        {
            string sql = @"[spUpdatePanel] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pPanel.Id, pPanel.Description, pPanel.Status.Id, pPanel.ModificationDate.ToString("yyyyMMdd"),
                pPanel.ModificationUser);
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
        /// @Descripción: Elimina Panel por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeletePanel(int pId)
        {
            string sql = @"[spDeletePanel] '{0}'";
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
