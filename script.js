const apiKey = '20cedbaee2b9e84b2bfbdb9448f7d3b9';

function searchCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  fetchWeatherByCity(city);
}

function useMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByCoords(lat, lon);
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherByCity(city) {
  document.getElementById("weatherDisplay").innerHTML = `<p>Loading...</p>`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(displayWeather)
    .catch(() => {
      document.getElementById("weatherDisplay").innerHTML = `<p>City not found. Try again.</p>`;
    });
}

function fetchWeatherByCoords(lat, lon) {
  document.getElementById("weatherDisplay").innerHTML = `<p>Getting weather for your location...</p>`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(res => res.json())
    .then(displayWeather)
    .catch(() => {
      document.getElementById("weatherDisplay").innerHTML = `<p>Could not get weather for your location.</p>`;
    });
}

function displayWeather(data) {
  const temp = (data.main.temp - 273.15).toFixed(1);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  const forecastDays = [
    { day: 'Mon', icon: '10d', temp: '27°C' },
    { day: 'Tue', icon: '02d', temp: '26°C' },
    { day: 'Wed', icon: '01d', temp: '25°C' },
    { day: 'Thu', icon: '13d', temp: '28°C' },
  ];

  document.getElementById("weatherDisplay").innerHTML = `
    <div class="temperature">${temp}°C</div>
    <div class="description">${desc}</div>

    <div class="forecast">
      ${forecastDays.map(day => `
        <div class="day">
          <p>${day.day}</p>
          <img src="https://openweathermap.org/img/wn/${day.icon}.png" />
          <p>${day.temp}</p>
        </div>
      `).join('')}
    </div>

    <div class="details">
      <div><strong>Humidity</strong><br>${humidity}%</div>
      <div><strong>Wind</strong><br>${wind} m/s</div>
      <div><strong>Sunrise</strong><br>${sunrise}</div>
      <div><strong>Sunset</strong><br>${sunset}</div>
    </div>
  `;
}
