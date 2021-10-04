process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let cucumber = { name: "cucumber", price: 2.90 };

beforeEach( () => {
  items.push(cucumber);
});

afterEach( () => {
    items.length = 0;
})

describe ("get /items", () => {
    test ("Get all items", async()=> {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([cucumber]);
    });
    test ("Get item by name", async()=> {
        const res = await request(app).get(`/items/${cucumber.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(cucumber);
    });
    test ("Get invalid item", async () =>{
        const res = await request(app).get(`/items/tomato`);
        expect(res.statusCode).toBe(404);
    });
});

describe ("patch /items", () =>{
    test("patch item by name", async () => {
        const res = await request(app).patch(`/items/${cucumber.name}`).send({ name : "tomato"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "tomato"} });
    });
    test("patch item by invalid name", async () => {
        const res = await request(app).patch(`/items/carotte`).send({ name : "tomato"});
        expect(res.statusCode).toBe(404);
    });
})

describe ("delete /items", () =>{
    test("delete item by name", async () => {
        const res = await request(app).delete(`/items/${cucumber.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
    test("delete item by invalid name", async () => {
        const res = await request(app).delete(`/items/carotte`);
        expect(res.statusCode).toBe(404);
    });
})

