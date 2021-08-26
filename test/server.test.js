const request = require("supertest");
const app = require("../dist/server");

let token;
let _id;

let data = {
  email: "phun@gmail.com",
  username: "phun",
  password: "phun",
  name: "phun baba",
};

describe("Signup and login", () => {
  it("It should register a new user", async () => {
    const response = await request(app).post("/auth/signup").send(data);
    expect(response.statusCode).toBe(200);
  });

  it("It should throw error for incomplete credentials", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ email: "fake@gmail.com", username: "fake" });
    expect(response.statusCode).toBe(400);
    expect(response.clientError).toBe(true);
  });

  it("It should login a user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: data.username, password: data.password });
      _id = response.body._id;
      token = response.headers["set-cookie"][0].split(";")[0].split("=")[1];

    expect(response.statusCode).toBe(200);
  });

    it("It responds with JSON", async () => {
    const response = await request(app)
      .get(`/contact/all/${_id}`)
      .set("Cookie", `access-token=${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});
