import request from "supertest";
import app from "./index";

describe('GET /', () => {
  it('should do Hello, World!', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({message: 'Hello, World!'})
  });
});