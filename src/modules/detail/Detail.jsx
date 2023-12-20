import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api/MovieApi";
import { useParams } from "react-router-dom";
import "./detail.scss";
import { Container } from "react-bootstrap";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import Loading from "../loading";
import Time from "./Time";
const Detail = () => {
  const { id } = useParams();

  const { data = {}, isPending } = useQuery({
    queryKey: ["detailMovie", id],
    queryFn: () => getDetail(id),
  });
  if (isPending) {
    return <Loading></Loading>;
  } else {
    return (
      <div id="detail">
        <Container>
          <div className="detail-title">
            <h1 style={{ color: "white" }}>Nội dung phim</h1>
          </div>
          <div className="detail-head">
            <div className="detail-img">
              <img src={data.hinhAnh} alt="" />

              <div className="mota">
                <div className="mota-name">
                  <h3> {data.tenPhim}</h3>
                </div>
                <div className="mota-day">
                  <p>
                    Khởi chiếu từ:{" "}
                    {dayjs(data.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="mota-time">
                  <p>Thời lượng: 109 phút</p>
                </div>
                <div className="mota-age">
                  <p>Độ tuổi: T18 - KHÔNG DÀNH CHO NGƯỜI DƯỚI 18 TUỔI</p>
                </div>
                <div className="mota-mota">
                  <p>{data.moTa}</p>
                </div>
                <div className="btn">
                  <Button variant="contained">Đặt vé</Button>
                  <Button variant="contained">Trailer</Button>
                </div>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="detail-body">
            <Time></Time>
          </div>
        </Container>
      </div>
    );
  }
};

export default Detail;
