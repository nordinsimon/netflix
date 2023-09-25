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
          username: user.username,
        })
      );
    } else {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
  }),
];
