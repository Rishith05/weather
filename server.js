const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const apiKey = "b1406cad7796cc2449bfde0b49e6c1fc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            return res.status(404).json({ error: "City not found" });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
