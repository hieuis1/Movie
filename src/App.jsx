import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieLayout from "./layouts/movie/MovieLayout";
import Home from "./modules/home";
import NotFound from "./modules/NotFound";
import Login from "./modules/Login";
import SignUp from "./modules/SignUp";
import Detail from "./modules/detail";
import Ticket from "./modules/ticket";
import AdminLayout from "./layouts/admin/AdminLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import IsLogout from "./components/isLogin/isLogout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieManagement from "./modules/admin/MovieManagement";
import ShowManagement from "./modules/admin/ShowManagement";
import AccountManagement from "./modules/admin/AccountManagement";
import { UserProvider } from "./contexts/UserContext/UserContent";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MovieLayout />}>
            <Route index element={<Home></Home>}></Route>
            <Route
              path="/login"
              element={
                <IsLogout>
                  <Login></Login>
                </IsLogout>
              }
            ></Route>
            <Route
              path="/sign-up"
              element={
                <IsLogout>
                  <SignUp></SignUp>
                </IsLogout>
              }
            ></Route>
            <Route path="/movie/:id" element={<Detail></Detail>} />
            <Route path="/ticket/:id" element={<Ticket></Ticket>} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<MovieManagement></MovieManagement>}></Route>
            <Route
              path="/admin/show-management"
              element={<ShowManagement></ShowManagement>}
            ></Route>

            <Route
              path="/admin/account-management"
              element={<AccountManagement></AccountManagement>}
            ></Route>

          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound></NotFound>}></Route>

      </Routes>

      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
