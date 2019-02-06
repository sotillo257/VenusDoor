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
    public class adOrder : Connection
    {
        public Order GetOrderById(int Id)
        {
            Order ord = new Order();
            string sql = @"[spGetOrder] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord = new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public Order GetOrderByUser(int IdUser)
        {
            Order ord = new Order();
            string sql = @"[spGetOrderByUser] '{0}' ";
            sql = string.Format(sql, IdUser);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Order", sql, _CN);
                if (ds.Tables["Order"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Order"].Rows)
                    {
                        ord = new Order()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            Tax = decimal.Parse(item["Tax"].ToString()),
                            Total = decimal.Parse(item["Total"].ToString()),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return ord;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Order> GetAllOrder()
        {
    
                            <p class="mg-b-0 tx-12 op-5">JPG Image</p>
                            <p class="mg-b-0 tx-12 op-5">1.2mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-purple wd-50 ht-60 tx-center d-flex align-items-center justify-content-center">
                            <i class="fa fa-file-video-o tx-28 tx-white"></i>
                        </div>
                        <div class="media-body">
                            <p class="mg-b-0 tx-13">VID_6543</p>
                            <p class="mg-b-0 tx-12 op-5">MP4 Video</p>
                            <p class="mg-b-0 tx-12 op-5">24.8mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-success wd-50 ht-60 tx-center d-flex align-items-center justify-content-center">
                            <i class="fa fa-file-word-o tx-28 tx-white"></i>
                        </div>
                        <div class="media-body">
                            <p class="mg-b-0 tx-13">Tax_Form</p>
                            <p class="mg-b-0 tx-12 op-5">Word Document</p>
                            <p class="mg-b-0 tx-12 op-5">5.5mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-warning wd-50 ht-60 tx-center d-flex align-items-center justify-content-center">
                            <i class="fa fa-file-pdf-o tx-28 tx-white"></i>
                        </div>
                        <div class="media-body">
                            <p class="mg-b-0 tx-13">Getting_Started</p>
                            <p class="mg-b-0 tx-12 op-5">PDF Document</p>
                            <p class="mg-b-0 tx-12 op-5">12.7mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-warning wd-50 ht-60 tx-center d-flex align-items-center justify-content-center">
                            <i class="fa fa-file-pdf-o tx-28 tx-white"></i>
                        </div>
                        <div class="media-body">
                            <p class="mg-b-0 tx-13">Introduction</p>
                            <p class="mg-b-0 tx-12 op-5">PDF Document</p>
                            <p class="mg-b-0 tx-12 op-5">7.7mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-primary wd-50 ht-60 tx-center d-flex align-items-center justify-content-center">
                            <i class="fa fa-file-image-o tx-28 tx-white"></i>
                        </div>
                        <div class="media-body">
                            <p class="mg-b-0 tx-13">IMG_43420</p>
                            <p class="mg-b-0 tx-12 op-5">JPG Image</p>
                            <p class="mg-b-0 tx-12 op-5">2.2mb</p>
                        </div><!-- media-body -->
                        <a href="" class="more"><i class="icon ion-android-more-vertical tx-18"></i></a>
                    </div><!-- media -->
                    <div class="media mg-t-20">
                        <div class="pd-10 bg-primary wd-50 ht-60 tx-center d-flex align-items-center justify-content-cen