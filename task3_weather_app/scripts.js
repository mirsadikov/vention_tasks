const API_KEY = '6ed9f2de91bed9da054a21e630c5effa';

let boxEl = document.querySelector('.location');
let detailsEl = document.querySelector('.details');
let city = boxEl.querySelector('.location__name');
let sub = boxEl.querySelector('.location__sub');
let temp = boxEl.querySelector('.location__temp');
let img = boxEl.querySelector('.location__img');
let humidity = detailsEl.querySelector('.details__value--humidity');
let wind = detailsEl.querySelector('.details__value--wind');
let realFeel = detailsEl.querySelector('.details__value--real');
let pressure = detailsEl.querySelector('.details__value--pressure');
let todaysEl = document.querySelector('.todays__row');
let daysEl = document.querySelector('.days');

// on load
window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            fetchWeatherData(lat, long, data[0].name);
          });
      },
      () => {
        getResults('Tashkent');
        alert('Location permission denied. Default location is Tashkent');
      }
    );
  }
});

// search event
const search = (event) => {
  if (event.keyCode == 13) {
    event.target.blur();
    getResults(event.target.value);
  }
};

// data fetch
function getResults(cityName) {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        alert('City not found');
        return;
      }
      let lat = data[0].lat;
      let long = data[0].lon;
      fetchWeatherData(lat, long, data[0].name);
    });
}

function fetchWeatherData(lat, long, cityName) {
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      document.title = `${cityName} | Weather App`;
      displayResults(data.current, cityName);
      displayForecast(data.hourly);
      display7DaysForecast(data.daily);
    });
}

// render
function displayResults(weather, cityName) {
  // img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  img.src = getWeaterIcon(weather.weather[0].main);

  let subText = weather.weather[0].description;
  subText = subText.charAt(0).toUpperCase() + subText.slice(1);

  city.innerText = cityName;
  sub.innerHTML = `<span>${formatDate(new Date())}</span> - <span>${subText}</span>`;
  temp.innerHTML = `${Math.round(weather.temp)}<span>&deg;</span>`;
  realFeel.innerHTML = `${Math.round(weather.feels_like)}<span>&deg;</span>`;
  humidity.innerHTML = `${weather.humidity}%`;
  wind.innerHTML = `${weather.wind_speed} m/s`;
  pressure.innerHTML = `${weather.pressure} hPa`;
}

function displayForecast(forecast) {
  const firstIndex = forecast.findIndex((item) => {
    return item.dt * 1000 > Date.now();
  });

  todaysEl.innerHTML = '';

  let list = forecast.slice(firstIndex, firstIndex + 18);

  list.forEach((item, i) => {
    if (i % 3 !== 0) return;

    // <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon" />
    let html = `
    <div class="todays__item">
    <div class="todays__time">${formatTimeToAMPM(new Date(item.dt * 1000))}</div>
    <div class="todays__img">
        <img src="${getWeaterIcon(item.weather[0].main)}" alt="" />
      </div>
      <div class="todays__temp">${Math.round(item.temp)}<span>&deg;</span></div>
    </div>
    `;
    todaysEl.insertAdjacentHTML('beforeend', html);
  });
}

function display7DaysForecast(forecast) {
  daysEl.innerHTML = '';

  forecast = forecast.slice(0, 7);
  forecast.forEach((item) => {
    // <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"} alt="icon" />
    let html = `
    <div class="days__item">
    <div class="days__day">${formatDay(new Date(item.dt * 1000))}</div>
    <div class="days__weather">
    <div class="days__img">
          <img src="${getWeaterIcon(item.weather[0].main)}" alt="" />
        </div>
        <h3 class="days__desc">${item.weather[0].main}</h3>
      </div>
      <div class="days__temp"><span>${Math.round(item.temp.max)}&deg;</span>/${Math.round(
      item.temp.min
    )}&deg;</div>
    </div>`;
    daysEl.insertAdjacentHTML('beforeend', html);
  });
}

// helpers
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatTimeToAMPM(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  return formattedTime;
}

function formatDay(date) {
  const day = date.toLocaleString('default', { weekday: 'short' });
  if (date.toDateString() === new Date().toDateString()) {
    return 'Today';
  }
  return day;
}

function getWeaterIcon(status) {
  switch (status) {
    case 'Clouds':
      return `./images/clouds.png`;

    case 'Clear':
      return `./images/clear.png`;

    case 'Rain':
      return `./images/rain.png`;

    case 'Snow':
      return `./images/snow.png`;

    case 'Drizzle':
      return `./images/drizzle.png`;

    case 'Mist':
      return `./images/mist.png`;

    default:
      return `./images/clear.png`;
  }
}
