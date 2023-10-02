import Cookies from "js-cookie";

import { authTokenMock } from "../mocks/handlers";

const authToken = () => {
  const token = Cookies.get("token");
  //checks if token exist already
  if (token) {
    const res = authTokenMock(token);
    if (res.status === 200) {
      const data = res;
      const token = data.token.token;
      Cookies.set("token", token, { expires: 1 });
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export default authToken;
