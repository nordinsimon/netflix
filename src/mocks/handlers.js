import mockUsers from "./mockUsers.json";

export const loginMock = ({ username, password }) => {
  console.log("username", username);
  console.log("password", password);
  const user = mockUsers.users.find(
    (user) => user.name === username && user.password === password
  );
  if (user) {
    return {
      status: 200,
      token: user.token,
      name: user.name,
    };
  } else {
    return {
      status: 401,
      errorMessage: "Not authorized",
    };
  }
};

export const authTokenMock = (token) => {
  const user = mockUsers.users.find((user) => user.token.token === token);
  if (user) {
    return {
      status: 200,
      token: user.token,
      name: user.name,
    };
  } else {
    return {
      status: 401,
      errorMessage: "Not authorized",
    };
  }
};
