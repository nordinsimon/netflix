import { rest } from "msw";
import mockUsers from "./mockUsers.json";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const { username, password } = req.body;
    const user = mockUsers.users.find(
      (user) => user.name === username && user.password === password
    );
    if (user) {
      return res(
        ctx.status(200),
        ctx.json({
          token: user.token,
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
  }),

  rest.post("/auth", (req, res, ctx) => {
    const { token } = req.body;
    const user = mockUsers.users.find((user) => user.token.token === token);
    if (user) {
      return res(
        ctx.status(200),
        ctx.json({
          token: user.token,
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
  }),
];
