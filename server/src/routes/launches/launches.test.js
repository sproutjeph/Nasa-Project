const request = require("supertest");
const app = require("../../app");
const { connectDb, closeDb } = require("../../DB/connectDB");
const { MONGODB_URI } = require("../../config/server.config");

describe("Launches API", () => {
  beforeAll(async () => {
    await connectDb(MONGODB_URI);
  });

  afterAll(async () => {
    await closeDb();
  });

  // describe("Testing GET /launches", () => {
  //   test("It should respond with 200 success", async () => {
  //     const response = await request(app)
  //       .get("/v1/launches")
  //       .expect("Content-Type", /json/)
  //       .expect(200);
  //   });
  // });

  describe("Testing POST launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };
    const launchDataWithoutData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };
    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };

    // test("It should respond with 201 created", async () => {
    //   const response = await request(app)
    //     .post("/v1/launches")
    //     .send(completeLaunchData)
    //     .expect("Content-Type", /json/)
    //     .expect(201);

    //   const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    //   const responseDate = new Date(response.body.launchDate).valueOf();

    //   expect(responseDate).toBe(requestDate);

    //   expect(response.body).toMatchObject(launchDataWithoutData);
    // });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutData)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          ...launchDataWithoutData,
          launchDate: "not a date",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
