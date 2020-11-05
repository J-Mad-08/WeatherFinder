//display the current date and time using JavaScript
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(date) {
  let dayOfWeek = daysOfWeek[date.getDay()];
  let hour = date.getHours();
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${dayOfWeek} ${hour}:${min}`;
}
// formatDate(new Date());

let properDate = document.querySelector("#date");
properDate.innerHTML = formatDate(new Date());

// Make a Default city
const apiKey = "5d58512296f20bed286330764deb9e8d";
let units = "metric";

function defaultCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&apiKey=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

// Weather info grabbed from API call
function showTemp(response) {
  // icon
  // console.log(response.data.weather[0].icon);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //City
  document.querySelector("#city").innerHTML = response.data.name;
  //   Temp
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = temp;

  // Celsius Temp
  celsiusTemp = response.data.main.temp;

  //   Slogan
  let humanFeel = Math.round(response.data.main["feels_like"]);
  let sloganChanged = document.querySelector(".slogan");
  sloganChanged.innerHTML = `It feels like ${humanFeel} º outside`;
  //   Description
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  //   Max temp
  let maxTemp = Math.round(response.data.main["temp_max"]);
  let highTemp = document.querySelector("#temp-max");
  highTemp.innerHTML = `${maxTemp} ºC/`;
  //   Min Temp
  let minTemp = Math.round(response.data.main["temp_min"]);
  let lowTemp = document.querySelector("#temp-min");
  lowTemp.innerHTML = `${minTemp} ºC`;
  //   Wind
  let windSpeed = Math.round(response.data.wind.speed);
  let windNum = document.querySelector("#wind");
  windNum.innerHTML = `${windSpeed} km/hr`;
  //   Humidity
  let humidity = Math.round(response.data.main.humidity);
  let humidPercent = document.querySelector("#humidity");
  humidPercent.innerHTML = `${humidity} %`;
}

// Grab the city
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#Searching").value;
  if (city == 0) {
    alert("Did you forget to enter a city?");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&apiKey=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

// Event Listener
let form = document.querySelector("#form-inline");
form.addEventListener("submit", search);

let buttonClick = document.querySelector("#dark-button");
buttonClick.addEventListener("click", search);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showTempCurLocation);

// Get current Location
function showPosition(position) {
  let lat = position.coords.latitude;

  let lon = position.coords.longitude;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&apiKey=${apiKey}`).then(showTemp);
}

function showTempCurLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemp = null;

//   Conversion: Fahrenheit
function convertToF(event) {
  event.preventDefault();
  console.log(event);
  document.querySelector("#current-temp").innerHTML = Math.round(
    celsiusTemp * (9 / 5) + 32
  );
}
let conversionToF = document.querySelector("#fahrenheit");
conversionToF.addEventListener("click", convertToF);

let convertToC = (event) => {
  event.preventDefault();
  console.log(event);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(celsiusTemp);
};

// Celsius conversion
let conversionToC = document.querySelector("#celsius");
conversionToC.addEventListener("click", convertToC);

// Invocation
defaultCity("Brooklyn");
