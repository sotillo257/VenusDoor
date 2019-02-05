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
    public class adUser : Connection
    {
        public User GetUserById(int Id)
        {
            User usr = new User();
            string sql = @"[spGetUser] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "User", sql, _CN);
                if (ds.Tables["User"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["User"].Rows)
                    {
                        usr = new User()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Email = item["Email"].ToString(),
                            Password = item["Password"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Person = new Model.Person() { Id = int.Parse(item["IdPerson"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            VerificationCode = item["VerificationCode"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return usr;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<User> GetAllUser()
        {
            List<User> usr = new List<User>();
            string sql = @"[spGetAllUser]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "User", sql, _CN);
                if (ds.Tables["User"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["User"].Rows)
                    {
                        usr.Add(new User()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Email = item["Email"].ToString(),
                            Password = item["Password"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Person = new Model.Person() { Id = int.Parse(item["IdPerson"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            VerificationCode = item["VerificationCode"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return usr;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertUser(User pUser)
        {
            string sql = @"[spInsertUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}'";
            sql = string.Format(sql, pUser.Email, pUser.Password, pUser.Type.Id, pUser.Person.Id, pUser.Status.Id, pUser.VerificationCode, pUser.CreationDate.ToString("yyyy-MM-dd"),
                pUser.CreatorUser, pUser.ModificationDate.ToString("yyyy-MM-dd"), pUser.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateUser(User pUser)
        {
            string sql = @"[spUpdateUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}, '{6}', '{7}', '{8}'";
            sql = string.Format(sql,pUser.Id, pUser.Email, pUser.Password, pUser.Type.Id, pUser.Person.Id, pUser.Status.Id, pUser.VerificationCode, pUser.ModificationDate.ToString("yyyy-MM-dd"),
                pUser.ModificationUser);
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
        /// @Descripción: Elimina User por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteUser(int pId)
        {
            string sql = @"[spDeleteUser] '{0}'";
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
