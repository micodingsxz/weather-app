const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = '91e6d72047d64f36cae82d122938e724'; // Replace with your actual API key
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric' // or 'imperial' for Fahrenheit
            }
        });

        res.json(response.data);
    } catch (error) {
        res.json({
            cod: error.response ? error.response.status : 500,
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
