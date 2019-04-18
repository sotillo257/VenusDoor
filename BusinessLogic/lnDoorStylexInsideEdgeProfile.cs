using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorStylexInsideEdgeProfile
    {
        DataAccess.adDoorStylexInsideEdgeProfile _AD = new DataAccess.adDoorStylexInsideEdgeProfile();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorStylexInsideEdgeProfile.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorStylexInsideEdgeProfile> GetAllDoorStylexInsideEdgeProfile()
        {
            try
            {
                return _AD.GetAllDoorStylexInsideEdgeProfile();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorStylexInsideEdgeProfile por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorStylexInsideEdgeProfile GetDoorStylexInsideEdgeProfileById(int pId)
        {
            try
            {
                return _AD.GetDoorStylexInsideEdgeProfileById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorStylexInsideEdgeProfile(DoorStyle pDoorStyle)
        {
            try
            {
                DoorStylexInsideEdgeProfile doorStylexInside = new DoorStylexInsideEdgeProfile();
                foreach (var item in pDoorStyle.listInsideProfile)
                {
                    doorStylexInside.CreationDate = DateTime.Now;
                    doorStylexInside.ModificationDate = DateTime.Now;
                    doorStylexInside.InsideEdgeProfile = new InsideEdgeProfile() { Id = item.Id };
                    doorStylexInside.DoorStyle = new DoorStyle() { Id = pDoorStyle.Id };
                    doorStylexInside.Status = new Status() { Id = pDoorStyle.Status.Id };
                    _AD.InsertDoorStylexInsideEdgeProfile(doorStylexInside);
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorStylexInsideEdgeProfile(DoorStylexInsideEdgeProfile pDoorStylexInsideEdgeProfile)
        {
            try
            {
                _AD.UpdateDoorStylexInsideEdgeProfile(pDoorStylexInsideEdgeProfile);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorStylexInsideEdgeProfile(int pId)
        {
            try
            {
                _AD.DeleteDoorStylexInsideEdgeProfile(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
