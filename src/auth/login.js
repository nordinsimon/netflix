import Cookies from "js-cookie";

const login = async (name, password) => {
  const user = { username: name, password: password };
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.ok) {
    const data = await res.json();
    const token = data.token.token;
    const user = data.token.name;
    Cookies.set("token", token, { expires: 1 });
    return user;
  }
  return false;
};

export default login;
