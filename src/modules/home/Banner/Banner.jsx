/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "./banner.scss";
// eslint-disable-next-line no-unused-vars
import { Container } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
const Banner = () => {
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="next-arrow">
        <ArrowForwardIosIcon sx={{ fontSize: 40 }}></ArrowForwardIosIcon>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="prev-arrow">
        <ArrowBackIosIcon sx={{ fontSize: 40 }}></ArrowBackIosIcon>
      </div>
    );
  }
  const data = [
    {
      id: 0,
      anh: "https://vnptmedia.vn/file/8a10a0d36ccebc89016cf4ff8bd72177/8a10a0d36e16e5b3016e3543dafd6aac/072022/image003_20220708164201.png",
      video: "https://www.youtube.com/embed/aWzlQ2N6qqg?si=UUF3ho-cPAgQzohc",
    },
    {
      id: 1,
      anh: "https://ecdn.game4v.com/g4v-content/uploads/2021/05/Spider-Man-No-Way-Home-1-game4v.jpg",
      video: "https://www.youtube.com/embed/JfVOs4VSpmA?si=odhaYfgBBuKjv-kf",
    },
    {
      id: 2,
      anh: "https://cdn.tuoitrethudo.com.vn/stores/news_dataimages/ngokhucquanganh/062021/14/08/2509_Poster_1.jpg?rt=20210614082516",
      video: "https://www.youtube.com/embed/jluSu8Rw6YE?si=rBpYj847oKJvay1y",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [trailer, setTrailer] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setTrailer(item.video);
    setShow(true);
  };
  const handleClose = () => {
    setTrailer(null);
    setShow(false);
  };

  return (
    <>
      <div id="banner">
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <div key={item.id} className="banner-img">
                <div className="banner-img-overlay"></div>
                <div className="icon-play" onClick={() => handleShow(item)}>
                  <PlayArrowIcon sx={{ fontSize: 75 }} />
                </div>
                <img src={item.anh} alt="" />
              </div>
            );
          })}
        </Slider>
      </div>
      <div
        id="overlay-banner"
        className={show ? "overlay-active" : ""}
        onClick={handleClose}
      ></div>
      {trailer ? (
        <div id="trailer-banner">
          <div className="icon-close" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 40 }}></CloseIcon>
          </div>
          <iframe
            width="800"
            height="500"
            src={trailer ? trailer : ""}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Banner;
