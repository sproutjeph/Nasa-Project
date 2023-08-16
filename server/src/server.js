const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const { connectDb } = require("./DB/connectDB");
const { MONGODB_URI, PORT } = require("./config/server.config");

const server = http.createServer(app);

async function startServer() {
  await connectDb(MONGODB_URI);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
