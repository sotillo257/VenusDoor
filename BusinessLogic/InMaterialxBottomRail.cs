using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InMaterialxBottomRail
    {
        DataAccess.adMaterialxBottomRail _AD = new DataAccess.adMaterialxBottomRail();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de MaterialxBottomRail.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<MaterialxBottomRail> GetAllMaterialxBottomRail()
        {
            try
            {
                return _AD.GetAllMaterialxBottomRail();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna MaterialxBottomRail por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public MaterialxBottomRail GetMaterialxBottomRailById(int pId)
        {
            try
            {
                return _AD.GetMaterialxBottomRailById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            try
            {
                return _AD.InsertMaterialxBottomRail(pMaterialxBottomRail);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            try
            {
                _AD.UpdateMaterialxBottomRail(pMaterialxBottomRail);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteMaterialxBottomRail(int pId)
        {
            try
            {
                _AD.DeleteMaterialxBottomRail(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
