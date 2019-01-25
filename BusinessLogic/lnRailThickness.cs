using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnRailThickness
    {
        DataAccess.adRailThickness _AD = new DataAccess.adRailThickness();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de RailThickness.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<RailThickness> GetAllRailThickness()
        {
            try
            {
                return _AD.GetAllRailThickness();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna RailThickness por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public RailThickness GetRailThicknessById(int pId)
        {
            try
            {
                return _AD.GetRailThicknessById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertRailThickness(RailThickness pRailThickness)
        {
            try
            {
                return _AD.InsertRailThickness(pRailThickness);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateRailThickness(RailThickness pRailThickness)
        {
            try
            {
                _AD.UpdateRailThickness(pRailThickness);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteRailThickness(int pId)
        {
            try
            {
                _AD.DeleteRailThickness(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public RailThickness dRailThickness(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public object DeleteRailThickness(RailThickness dRailThickness)
        {
            throw new NotImplementedException();
        }
    }
}
