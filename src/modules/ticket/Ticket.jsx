import "./ticket.scss";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../../api/MovieApi";
import { useParams } from "react-router-dom";
import Loading from "../loading";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUY } from "../../redux/slice/buySlice";
import DetaileTicket from "./detailTicket/DetailTicket";
import DetailTicket from "./detailTicket/DetailTicket";
const Ticket = () => {
  const { id } = useParams();
  const { data = {}, isPending } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getSchedule(id),
  });
  const buyArr = useSelector((state) => state.buy.buy);
  const disPatch = useDispatch();

  console.log(data);
  if (isPending) {
    return <Loading></Loading>;
  } else {
    return (
      <div id="ticket">
        <div className="ticket-order">
          <div className="order-left">
            <div className="screen">
              <div className="loaiGhe">
                <div className="loaiGhe-container">
                  <div className="thuong">
                    <img
                      src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png"
                      alt=""
                    />
                    <p>Ghế thường</p>
                  </div>
                  <div className="vip">
                    <img
                      src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png"
                      alt=""
                    />
                    <p>Ghế vip</p>
                  </div>
                </div>
                <div className="canBuy-container">
                  <div className="canBuy">
                    <img
                      src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png"
                      alt=""
                    />
                    <p>Ghế trống</p>
                  </div>

                  <div className="isSelect">
                    <img
                      src="https://www.betacinemas.vn/Assets/global/img/booking/seat-select-normal.png"
                      alt=""
                    />
                    <p>Ghế đang chọn</p>
                  </div>

                  <div className="isSold">
                    <img
                      src="https://www.betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png"
                      alt=""
                    />
                    <p>Ghế đã bán</p>
                  </div>
                </div>
              </div>
              <div className="movie-screen">
                <img
                  src="https://www.betacinemas.vn/Assets/global/img/booking/ic-screen.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="all-chair">
              {data.danhSachGhe
                ? data.danhSachGhe.map((item, index) => {
                    let a = "";
                    let b = "chair";
                    let c = buyArr.findIndex((ghe) => ghe.maGhe == item.maGhe);
                    if (c != -1 && item.loaiGhe == "Vip") {
                      a = "buy-vip";
                    }
                    if (c != -1 && item.loaiGhe != "Vip") {
                      a = "buy";
                    }
                    if (
                      item.taiKhoanNguoiDat != null &&
                      item.loaiGhe != "Vip"
                    ) {
                      a = "sold-out";
                    }
                    if (
                      item.taiKhoanNguoiDat != null &&
                      item.loaiGhe == "Vip"
                    ) {
                      a = "sold-out-vip";
                    }
                    if (item.loaiGhe == "Vip") {
                      b = "chair-vip";
                    }
                    return (
                      <button
                        className={a}
                        key={index}
                        id={b}
                        onClick={
                          item.taiKhoanNguoiDat == null
                            ? () => disPatch(ADD_BUY(item))
                            : ""
                        }
                      >
                        {item.tenGhe}
                      </button>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="order-right">
            <DetailTicket data={data}></DetailTicket>
          </div>
        </div>
      </div>
    );
  }
};

export default Ticket;
