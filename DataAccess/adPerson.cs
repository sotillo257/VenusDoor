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
    public class adPerson : Connection
    {
        public Person GetPersonById(int Id)
        {
            Person per = new Person();
            string sql = @"[spGetPerson] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Person", sql, _CN);
                if (ds.Tables["Person"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Person"].Rows)
                    {
                        per = new Person()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Lastname = item["Lastname"].ToString(),
                            Telephone = item["Telephone"].ToString(),
                            Direction = item["Direction"].ToString(),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return per;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Person> GetAllPerson()
        {
            List<Person> per = new List<Person>();
            string sql = @"[spGetAllPerson]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Person", sql, _CN);
                if (ds.Tables["Person"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Person"].Rows)
                    {
                        per.Add(new Person()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["IdUser"].ToString(),
                            Lastname = item["Lastname"].ToString(),
                            Telephone = item["Telephone"].ToString(),
                            Direction = item["Direction"].ToString(),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return per;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPerson(Person pPerson)
        {
            string sql = @"[spInsertPerson] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}'";
            sql = string.Format(sql, pPerson.Name, pPerson.Lastname, pPerson.Telephone, pPerson.Direction, pPerson.IdStatus, pPerson.CreationDate.ToString("yyyyMMdd"),
                pPerson.CreatorUser, pPerson.ModificationDate.ToString("yyyyMMdd"), pPerson.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePerson(Person pPerson)
        {
            string sql = @"[spUpdatePerson] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}, '{6}";
            sql = string.Format(sql, pPerson.Name, pPerson.Lastname, pPerson.Telephone, pPerson.Direction, pPerson.IdStatus, pPerson.ModificationDate.ToString("yyyyMMdd"),
                pPerson.ModificationUser);
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
