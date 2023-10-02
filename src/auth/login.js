import Cookies from "js-cookie";

import { loginMock } from "../mocks/handlers";

const login = (name, password) => {
  const user = { username: name, password: password };
  const res = loginMock(user);

  if (res.status === 200) {
    const data = res;
    const token = data.token.token;
    const user = data.token.name;
    Cookies.set("token", token, { expires: 1 });
    return user;
  }
  return false;
};

export default login;
