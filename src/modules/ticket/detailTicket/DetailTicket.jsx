import React from "react";

const DetailTicket = ({ data }) => {
  return (
    <div id="detail-ticket">
      <div className="detail-header">
        <img
          style={{ width: "200px", height: "300px" }}
          src={data.thongTinPhim.hinhAnh}
          alt=""
        />
        <div className="detail-header-title">
          <h3>{data.thongTinPhim.tenPhim}</h3>
          <p>2D Phụ đề</p>
        </div>
      </div>
      <div className="detail-body1 container">
        <div className="theloai">
          <div className="theloai-left">
            <div className="theloai-left-item">
              <i className="fa fa-tags"></i> Thể loại
            </div>
          </div>
          <div className="theloai-right">
            <p>Hành động</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTicket;
