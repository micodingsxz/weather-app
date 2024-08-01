document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value.trim();
    if (!city) return; // Exit if no city is entered

    const url = `/weather?city=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(() => {
            document.getElementById('weather-result').innerHTML = `<p>There was an error fetching the weather data.</p>`;
        });
});
