import express from "express";
import dotenv from "dotenv";
import getWeather from "./weather.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("client"));

// app.get("/api/dream", (req, res) => {
//   res.json({
//     dream: "Silver forest",
//   });
// });

app.get("/api/weather", async (req, res) => {
  const weather = await getWeather();
  console.log("Got weather data:", weather);
  res.json(weather);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
