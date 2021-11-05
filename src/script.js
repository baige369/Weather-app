let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
console.log(now);

let day = days[now.getDay()];
console.log(day);

let date = twoDigits(now.getDate());
console.log(date);

function twoDigits(n) {
  if (n < 10) return "0" + n;
  return n;
}
let month = twoDigits(now.getMonth() + 1);
console.log(now.getMonth());
console.log(month);

let year = now.getFullYear();
console.log(year);

let fullDate = date + "/" + month + "/" + year;
console.log(fullDate);

let hour = twoDigits(now.getHours());
console.log(hour);

let minutes = twoDigits(now.getMinutes());
console.log(minutes);

let time = hour + ":" + minutes;
console.log(time);

let dayButton = document.querySelector("#day-button");
dayButton.innerHTML = day;

let dateButton = document.querySelector("#date-button");
dateButton.innerHTML = fullDate;

let hourButton = document.querySelector("#hour-button");
hourButton.innerHTML = time;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function dateOrdinal(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayofMonth = date.getDate();
  if (dayofMonth == 31 || dayofMonth == 21 || dayofMonth == 1)
    return dayofMonth + "st";
  else if (dayofMonth == 22 || dayofMonth == 2) return dayofMonth + "nd";
  else if (dayofMonth == 23 || dayofMonth == 3) return dayofMonth + "rd";
  else return dayofMonth + "th";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index != 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col next-days">
      <div class="date">${
        formatDay(forecastDay.dt) + " " + dateOrdinal(forecastDay.dt)
      }</div>
      <img class="secondary-image" src=images/${
        forecastDay.weather[0].icon
      }.jpg width=50%/>
      <div class="temperature" id="temp-1day">${Math.round(
        forecastDay.temp.max
      )}°C|${Math.round(forecastDay.temp.min)}°C</div>
      <div class="description">${capitalizeFirstLetter(
        forecastDay.weather[0].description
      )}</div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let heading = document.querySelector("h1");
  let message = `Weather forecast for ${response.data.name}`;
  heading.innerHTML = message;

  let primaryImage = document.querySelector("#primary-image");
  primaryImage.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.jpg`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = `${temperature}°C`;
  let descriptionToday = document.querySelector("#description-today");
  descriptionToday.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 2.237);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let units = "metric";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function changeTempToFahrenheit() {
  let temperatureToday = document.querySelector("#temperature-today");
  let fahrenheitCalculation = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureToday.innerHTML = fahrenheitCalculation + "°F";

  let temperature1day = document.querySelector("#temp-1day");
  temperature1day.innerHTML = "68°F|55°F";

  let temperature2day = document.querySelector("#temp-2day");
  temperature2day.innerHTML = "68°F|55°F";

  let temperature3day = document.querySelector("#temp-3day");
  temperature3day.innerHTML = "68°F|55°F";

  let temperature4day = document.querySelector("#temp-4day");
  temperature4day.innerHTML = "68°F|55°F";

  let temperature5day = document.querySelector("#temp-5day");
  temperature5day.innerHTML = "68°F|55°F";
}

let fahrenheitButton = document.querySelector("#Fahrenheit-button");
fahrenheitButton.addEventListener("click", changeTempToFahrenheit);

function changeTemptoCelsius() {
  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = celsiusTemperature + "°C";

  let temperature1day = document.querySelector("#temp-1day");
  temperature1day.innerHTML = "20°C|13°C";

  let temperature2day = document.querySelector("#temp-2day");
  temperature2day.innerHTML = "20°C|13°C";

  let temperature3day = document.querySelector("#temp-3day");
  temperature3day.innerHTML = "20°C|13°C";

  let temperature4day = document.querySelector("#temp-4day");
  temperature4day.innerHTML = "20°C|13°C";

  let temperature5day = document.querySelector("#temp-5day");
  temperature5day.innerHTML = "20°C|13°C";
}
let celsiusButton = document.querySelector("#Celsius-button");
celsiusButton.addEventListener("click", changeTemptoCelsius);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function findMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let findButton = document.querySelector("#find-me");
findButton.addEventListener("click", findMe);

let celsiusTemperature = null;
searchCity("London");

//weather forecast
//unit conversion
