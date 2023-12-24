import { useQuery } from "@tanstack/react-query";
import { getListMovieApi } from "../../../api/MovieApi";
import "./showing.scss";
import Slider from "react-slick";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Showing = () => {
  const { data = [] } = useQuery({
    queryKey: ["listMovie"],
    queryFn: getListMovieApi,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 10,
        },
      },
      {
        breakpoint: 900,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const navigate = useNavigate();

  return (
    <div id="showing">
      <Container className="box-slide">
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <Card
                style={{ minWidth: "439px" }}
                className="card-item"
                key={item.maPhim}
              >
                <Card.Img variant="top" src={item.hinhAnh} />
                <Card.Body>
                  <Card.Title className="card-title-item">
                    <span className="jss201">C18</span>
                    {item.tenPhim.substring(0, 13) + "..."}
                  </Card.Title>
                  <Card.Text
                    style={{ color: "gray" }}
                    className="card-mota-item"
                  >
                    {item.moTa.substring(0, 50) + "..."}
                  </Card.Text>
                  <Button
                    onClick={() => navigate(`/movie/${item.maPhim}`)}
                    style={{ width: "100%" }}
                    variant="primary"
                  >
                    Đặt vé
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Slider>
      </Container>
    </div>
  );
};

export default Showing;
