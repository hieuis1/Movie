import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLEAR_BUY } from "../../../redux/slice/buySlice";
import { datVe } from "../../../api/rapApi";
import swal from "sweetalert";
import Swal from "sweetalert2";

const DetailTicket = ({ data }) => {
  const { id } = useParams();
  const buyArr = useSelector((state) => state.buy.buy);
  const dataArr = useSelector((state) => state.buy.newArr);
  const total = useSelector((state) => state.buy.total);
  const { mutate } = useMutation({
    // eslint-disable-next-line no-undef
    mutationFn: (values) => datVe(values),
    onSuccess: () => {
      disPatch(CLEAR_BUY);
      Swal.fire({
        title: "Đặt vé thành công",
        text: "Click ok để tiếp tục",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
  });

  const disPatch = useDispatch();
  const handleBuy = () => {
    let data = {
      maLichChieu: id,
      danhSachVe: dataArr,
    };
    mutate(data);
  };
  const handleClick = () => {
    if (buyArr.length > 0) {
      Swal.fire({
        title: `Bạn chắc chắn mua ${buyArr.length} không ?`,
        icon: "question",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleBuy();
        }
      });
    } else {
      alert("Vui lòng chọn ghế");
    }
  };
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
      <div className="detail-body1">
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
      <div className="detail-body2">
        <div className="thoiLuong">
          <div className="thoiLuong-left">
            <div className="thoiLuong-left-item">
              <i class="fa-solid fa-clock"></i> Thời lượng
            </div>
          </div>
          <div className="thoiLuong-right">
            <p>124 phút</p>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="detail-body3">
        <div className="rapChieu">
          <div className="rapChieu-left" style={{ width: "50%" }}>
            <div className="rapChieu-left-item">
              <i class="fa fa-institution"></i> Rạp chiếu
            </div>
          </div>
          <div className="rapChieu-right">
            <p>{data.thongTinPhim.tenCumRap}</p>
          </div>
        </div>
      </div>
      <div className="detail-body4">
        <div className="ngayChieu">
          <div className="ngayChieu-left">
            <div className="ngayChieu-left-item">
              <i style={{ marginRight: "3px" }} class="fa fa-calendar"></i>Ngày
              chiếu
            </div>
          </div>
          <div className="ngayChieu-right">
            <p>{data.thongTinPhim.ngayChieu}</p>
          </div>
        </div>
      </div>
      <div className="detail-body5">
        <div className="gioChieu">
          <div className="gioChieu-left">
            <div className="gioChieu-left-item">
              <i class="fa-solid fa-clock"></i> Giờ chiếu
            </div>
          </div>
          <div className="gioChieu-right">
            <p>{data.thongTinPhim.gioChieu}</p>
          </div>
        </div>
      </div>
      <div className="detail-body6">
        <div className="phongChieu">
          <div className="phongChieu-left">
            <div className="phongChieu-left-item">
              <i class="fa fa-desktop"></i> Phòng chiếu
            </div>
          </div>
          <div className="phongChieu-right">
            <p>{data.thongTinPhim.tenRap}</p>
          </div>
        </div>
      </div>
      <div className="detail-body7">
        <div className="diaChi">
          <div className="diaChi-left" style={{ width: "50%" }}>
            <div className="diaChi-left-item">
              <i class="fa-solid fa-location-dot"></i> Địa chỉ
            </div>
          </div>
          <div className="diaChi-right">
            <p>{data.thongTinPhim.diaChi}</p>
          </div>
        </div>
      </div>
      <div className="detail-body8">
        <div className="gheNgoi">
          <div className="gheNgoi-left" style={{ width: "50%" }}>
            <div className="gheNgoi-left-item">
              <i class="fa-solid fa-location-dot"></i> Ghế Ngồi
            </div>
          </div>
          <div className="gheNgoi-right" style={{ width: "50%" }}>
            <div className="gheNgoi-right-item">
              {buyArr.map((item, index) => {
                return (
                  <p style={{ marginBottom: "3px" }} key={item.maGhe}>
                    {item.tenGhe}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="total-ticket">
        <div className="total-text">Tổng tiền</div>
        <div className="total-price">{total} VND</div>
      </div>
      <div className="button-buy">
        <Button onClick={handleClick} variant="contained">
          Mua ({buyArr.length} vé)
        </Button>
      </div>
    </div>
  );
};

export default DetailTicket;
