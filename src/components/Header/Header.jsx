import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import "./header.scss";
import IsLogout from "../isLogin/isLogout";
import IsLogin from "../isLogin/IsLogin";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../redux/slice/loginSlice";
``;
import Swal from "sweetalert2";
const Header = () => {
  const auth = useSelector((state) => state.auth.auth);
  console.log("authtest", auth);
  const dispatch = useDispatch();
  const title = auth ? `Hi, ${auth.hoTen}` : "";
  const logout = () => {
    Swal.fire({
      title: "Đăng xuất thành cônng",
      text: "Click ok để tiếp tục",
      icon: "success",
    });
    dispatch(LOGOUT());
  };
  return (
    <div id="headere-navbar">
      {["xl"].map((expand) => (
        <Navbar
          id="navbar-brand"
          key={expand}
          expand={expand}
          className="bg-body-tertiary"
        >
          <Container>
            <Navbar.Brand href="/">
              <img
                className="img-brand"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////7QibkNivkNCn/+/v9q577Si/+8/L/7uz62tj8jHvvh4D8g3HqX1bMzc37SC3Rvrv+9/bwkozsbVn/8/HMzc7kOS7mOyW/LSP+8O/5y8joUkj8QibvgXr8/f35+frQ0ND5SS/iNSrYMyj9ppnQMSb39vbg39/W1tbfNCnHLyT//fz9+fjv7+/8qZzwPSbz8/Pr6+vn5+fj4+Pb29v6xsLyopr5opTnnJHhlIj7Ryz+6ef9rqP0qaH5UzrlOjD7RSnqOyW6KyL/4t3kz8zgzcrQtrP9tar9sqfte3TCd3L6emftbVrsbFnpUj3mQjgGeX2GAAAAF3RSTlMA+9EF9vDruKakj2lPSS8sGQ3i4b69OIta07gAAAM+SURBVGje1drpUhNBFIbhnuwrYe9JIIoLERQJqAkkJmELsqNsIu77/V+CJrH8JsxUf52R6SrfG3iqq7t/nSOchXPpZChmyX/KioWS6VxYeDeSSYwSQBsaTWRGPIhwNh6RN1gknnWdZjgVlTdcNDXcbwyNywAaH3IakyEZSKFJGEPM8K/8PcvwhAysiT/3Ek7JAEv13lg2KgMsmu3+wbgMtHjnV2YiMtAiGSHCCRlwibDIjcmAG8uJtCUDzkqLpAy8pAjJwAuJmAy8mLBk4FlCGuh/QZrtilTEkJnzOW7srK20qqfTt30iM/cfz1OluTY7u/D+q31PoQiVUShQpXrw23jw3bZVilAZ+TxTqq2O8dC2lYpQGkyp7MNQKEJlUGVvBYZCEQqDKrswlIpQGExpw1ArghpQ3I8XBhSOwKBK9QAGUYTKgJI/cj9eGEwRKgPIk2XX44VBFaFtzG05jb0FGFQRusbSs+694PHCoIrQNpy334ZBFSDccL6xnTUYXAHCDShNGHqK0DWgVA9w51wBwg0olRYMTUVoGlBaKzA0FaE0fh72DFRrfPnwTcuAAuSo4HWQ056BGlflH09tVycXl7ar4uF15NbdvFt5PX/4Oe+sflVetD2M7XevVl3G9BQQLwVMoc8olxdxDnTxtrIPBQaQPkXZOoz+Lo+nKntQYAAhCowNGNcqPZ+Suy+hwACipdRgeCttKDCA6Ci1RtdQKTtdBQYQXaVnqJXm0SoMF0KVWp0YHWVLVs+LMFwIU+obHYMox1ty81OxBAMIUWDQTjrKxzMYQBQKHi/+ObuXzU3JESgwGjCIMi2RA+FKDQZFzrQQKHhY3MAf9EaoUn/j1wDClHX/BhCi1F74N4AQxafBESh+DY5A8W1wBMod7f8BQxNBj6BQgyH8LNxgCFe4QRGucIMjXOEGR+jt87fLEa5wgyNc4QZHuMINjnCFGxzhCjc4whVucIQr3OAIV7jBEa5wgyNcgaEfRhuDKKWBDAtDmgGU0jYMjWIYN+kqMHQLYXCmrRRh6JUcfAS4tDygYaWNDDONjGVNDJiNjMpNDP2NrC+YWMQwsVJiYjnGxJqPiYUlE6tXRpfIjKzD/QKIj6Xp8VGBdwAAAABJRU5ErkJggg=="
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-between flex-grow-1 pe-3">
                  <div className="item">
                    <Nav.Link>
                      <NavLink to={"/"}>Home</NavLink>
                    </Nav.Link>
                  </div>

                  {/* dropdown account 2 */}
                  <IsLogout>
                    <NavDropdown
                      title="Account"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item className="drop-item" href="/sign-up">
                        Sign up
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item className="drop-item" href="/login">
                        Login
                      </NavDropdown.Item>
                    </NavDropdown>
                  </IsLogout>

                  {/* dropdown account 2 */}
                  <IsLogin>
                    <NavDropdown
                      title={title}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item>
                        <NavLink to={"/user-detail"}>Tùy chỉnh</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logout}>
                        Đăng xuất
                      </NavDropdown.Item>
                    </NavDropdown>
                  </IsLogin>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default Header;
