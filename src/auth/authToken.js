import Cookies from "js-cookie";

const authToken = async () => {
  const token = Cookies.get("token");
  const res = await fetch("/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
  if (res.ok) {
    const data = await res.json();
    const token = data.token.token;
    Cookies.set("token", token, { expires: 1 });
    return true;
  }
  return false;
};

export default authToken;
