jest.mock("axios", () => ({ create: jest.fn(() => ({})) }));

const original = process.env.REACT_APP_API_URL;
afterEach(() => {
    if (original === undefined) delete process.env.REACT_APP_API_URL;
    else process.env.REACT_APP_API_URL = original;
    jest.resetModules();
});

test("requires an explicit API URL rather than contacting production by default", () => {
    delete process.env.REACT_APP_API_URL;
    expect(() => require("./client")).toThrow("REACT_APP_API_URL is required");
});

test("uses the configured API URL", () => {
    process.env.REACT_APP_API_URL = "http://127.0.0.1:3156/api";
    const { API_BASE_URL } = require("./client");
    const axios = require("axios");
    expect(API_BASE_URL).toBe(process.env.REACT_APP_API_URL);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: API_BASE_URL, timeout: 8000 });
});
