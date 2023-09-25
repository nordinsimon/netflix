import { server } from "./mocks/server.js";

// eslint-disable-next-line no-undef
beforeAll(() => server.listen());

// eslint-disable-next-line no-undef
afterEach(() => server.resetHandlers());

// eslint-disable-next-line no-undef
afterAll(() => server.close());