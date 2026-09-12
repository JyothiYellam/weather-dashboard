const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const searchButton = document.getElementById("searchButton");

const errorDiv = document.getElementById("error");
const weatherDiv = document.getElementById("weather");

searchButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    const country = countryInput.value.trim();

    errorDiv.textContent = "";
    weatherDiv.innerHTML = "";

    if (!city && !country) {
        errorDiv.textContent = "Please enter a city or country";
        return;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:3000/api/weather?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
        );
        const data = await response.json();

        if (!response.ok) {
            errorDiv.textContent = data.error;
            return;
        }

        weatherDiv.innerHTML = `
            <h2>Location</h2>
            <p>City: ${data.city || "Not provided"}</p>
            <p>Country: ${data.country || "Not provided"}</p>
        `;
    } catch (error) {
        errorDiv.textContent = "Unable to connect to backend";
        console.error(error);
    }
});