const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Weather Dashboard Backend is working");
});

app.get("/api/weather", async (req, res) => {
    const { city, country } = req.query;

    if (!city && !country) {
        return res.status(400).json({
            error: "Please enter a city or country"
        });
    }

    const location = city && country
        ? `${city}, ${country}`
        : city || country;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=7`
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "Weather API request failed"
            });
        }

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to fetch weather data"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});