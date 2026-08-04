import express from "express";
import dotenv from "dotenv";
import getWeather from "./weather.js";
import generateDream from "./dreamGenerator.js";
import interpretWeather from "./weatherInterpreter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/api/dream", async (req, res) => {
  const { lat, long } = req.query;
  console.log("Received request for dream with lat:", lat, "and long:", long);
  const weather = await getWeather(lat, long);
  const interpretedWeather = interpretWeather(weather);
  console.log("Interpreted weather:", interpretedWeather);
  const dream = await generateDream(weather, interpretedWeather);
  res.json(dream);
});

app.get("/api/weather", async (req, res) => {
  const { lat, long } = req.query;
  console.log("Received request for dream with lat:", lat, "and long:", long);
  console.log("Received request for weather data");
  const weather = await getWeather(lat, long);
  console.log("Got weather data:", weather);
  res.json(weather);
});

export default app;
