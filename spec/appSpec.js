let app = require("../app");
let request = require("supertest");

describe("Grocers Server ", () => {
  it("should get list of items from database", (finish) => {
    request(app)
      .get("/api/items/getItems")
      .expect((data) => {
        let items = data.body;
        expect(typeof items).toBe("object");
      })
      .end((e) => (e ? finish.fail(e) : finish()));
  });

  it("should get list of users from database", (finish) => {
    request(app)
      .get("/api/items/getUsers")
      .expect((data) => {
        let items = data.body;
        expect(typeof items).toBe("object");
      })
      .end((e) => (e ? finish.fail(e) : finish()));
  });
});
