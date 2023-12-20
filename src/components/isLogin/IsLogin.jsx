import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const IsLogin = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  if (isLogin) {
    return children;
  }
};

export default IsLogin;
