using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InType
    {
        DataAccess.adType _AD = new DataAccess.adType();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Type.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Model.Type> GetAllType()
        {
            try
            {
                return _AD.GetAllType();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Type por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Model.Type GetTypeById(int pId)
        {
            try
            {
                return _AD.GetTypeById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertType(Model.Type pType)
        {
            try
            {
                return _AD.InsertType(pType);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateType(Model.Type pType)
        {
            try
            {
                _AD.UpdateType(pType);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteType(int pId)
        {
            try
            {
                _AD.DeleteType(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
