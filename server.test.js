const app = require("./server");
const request = require("supertest"); 

describe("POST /root", () => {
    const body = {
        username: "username",
        password: "password"
    };
        test("should response with 200 status code", async () => {
            const res = await request(app).post("/root").send(body);
            expect(res.statusCode).toBe(200);
            expect(res.body.username).toBeDefined();
            expect(res.body.password).toBeDefined();
            expect(res.body.username).toBe(body.username);
            expect(res.body.password).toBe("password");
        })
  });