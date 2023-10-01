import Cookies from "js-cookie";

const logout = async () => {
  Cookies.remove("token");
  window.location.reload();
};
export default logout;
