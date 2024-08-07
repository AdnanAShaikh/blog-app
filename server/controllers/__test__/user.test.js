const app = require("../../server");
const request = require("supertest");

describe("register", () => {
  it("returns status code 201 if all right", async () => {
    const res = await request(app).post("api/v1/user/register").send({
      username: "adnan1",
      email: "shaikhadnan8632@gmail.com",
      password: "12421233",
    });
    expect(res.statusCode).toEqual(201);
  });
});
