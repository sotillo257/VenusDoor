using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnOutsideEdgeProfile
    {
        DataAccess.adOutsideEdgeProfile _AD = new DataAccess.adOutsideEdgeProfile();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de OutsideEdgeProfile.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<OutsideEdgeProfile> GetAllOutsideEdgeProfile()
        {
            try
            {
                return _AD.GetAllOutsideEdgeProfile();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<OutsideEdgeProfile> GetOutsideProfilexDoorStyle(int pDoorStyle)
        {
            try
            {
                return _AD.GetOutsideProfilexDoorStyle(pDoorStyle);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna OutsideEdgeProfile por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public OutsideEdgeProfile GetOutsideEdgeProfileById(int pId)
        {
            try
            {
                return _AD.GetOutsideEdgeProfileById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)
        {
            try
            {
                return _AD.InsertOutsideEdgeProfile(pOutsideEdgeProfile);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)
        {
            try
            {
                _AD.UpdateOutsideEdgeProfile(pOutsideEdgeProfile);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteOutsideEdgeProfile(int pId)
        {
            try
            {
                _AD.DeleteOutsideEdgeProfile(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
