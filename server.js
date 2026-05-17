import express from "express";
import dotenv from "dotenv";
import getWeather from "./weather.js";
import generateDream from "./dreamGenerator.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("client"));

app.get("/api/dream", async (req, res) => {
  const { lat, long } = req.query;
  console.log("Received request for dream with lat:", lat, "and long:", long);
  const weather = await getWeather(lat, long);
  const dream = await generateDream(weather);
  res.json({ dream: dream });
});

app.get("/api/weather", async (req, res) => {
  const { lat, long } = req.query;
  console.log("Received request for dream with lat:", lat, "and long:", long);
  console.log("Received request for weather data");
  const weather = await getWeather(lat, long);
  console.log("Got weather data:", weather);
  res.json(weather);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
