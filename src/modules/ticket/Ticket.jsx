import "./ticket.scss";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../../api/MovieApi";
import { useParams } from "react-router-dom";
import Loading from "../loading";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUY } from "../../redux/slice/buySlice";
const Ticket = () => {
  const { id } = useParams();
  const { data = {}, isPending } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getSchedule(id),
  });
  const buyArr = useSelector((state) => state.buy.buy);
  const disPatch = useDispatch();

  console.log(buyArr);
  if (isPending) {
    return <Loading></Loading>;
  } else {
    return (
      <div id="ticket">
        <Container>
          <div className="ticket-order">
            <div className="order-left">
              <div className="screen">
                <div className="movie-screen"></div>
                <div className="movie-bg"></div>
                <p className="movie-title">Screen</p>
              </div>
              <div className="all-chair">
                {data.danhSachGhe
                  ? data.danhSachGhe.map((item, index) => {
                      return (
                        <button
                          className={buyArr.indexOf(item) < 0 ? "" : "buy"}
                          key={index}
                          id="chair"
                          onClick={() => disPatch(ADD_BUY(item))}
                        >
                          {item.tenGhe}
                        </button>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="order-right"></div>
          </div>
        </Container>
      </div>
    );
  }
};

export default Ticket;
