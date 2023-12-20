import { Button } from "@mui/material";
import "./cinema.scss";
const Cinema = () => {
  // const { data } = useQuery({
  //   queryKey: ["listMovie"],
  //   queryFn: getListMovieApi,
  // });

  return (
    <div id="select-fast">
      <div className="select-body">
        <select name="" id="">
          <option value="1">Phim</option>
          <option value="1">3</option>
          <option value="1">4</option>
        </select>
        <select name="" id="">
          <option value="1">Rạp</option>
          <option value="1">3</option>
          <option value="1">4</option>
        </select>
        <select name="" id="">
          <option value="1">Thời gian</option>
          <option value="1">3</option>
          <option value="1">4</option>
        </select>
        <Button variant="contained">MUA VÉ NGAY</Button>
      </div>
    </div>
  );
};

export default Cinema;
