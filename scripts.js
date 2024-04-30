const api = 'ef3d41bb4e6969378203c1f8087d1d83';

const windSpeed = document.querySelector('.wind_speed');
const iconImg = document.getElementById('weather-icon');
const feelsLikeTemp = document.querySelector('.feelsLike');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const sunriseDOM = document.querySelector('.sunrise');
const forecastContainer = document.querySelector('.weather-cards');

window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            const forecastBase = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

            fetch(base)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const { temp, feels_like } = data.main;
                    const { icon } = data.weather[0];
                    const { sunrise } = data.sys;
                    const { speed } = data.wind;

                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    const sunriseGMT = new Date(sunrise * 1000);
                    windSpeed.textContent = `${speed}`;
                    iconImg.src = iconUrl;

                    feelsLikeTemp.textContent = `${feels_like}`;

                    sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
                });

            fetch(forecastBase)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const forecasts = data.list.slice(5,35);
                    const uniqueDates = new Set(); 
                    forecasts.forEach((forecast) => {
                        const { dt_txt, main, weather } = forecast;
                        const { temp } = main;
                        const { description, icon } = weather[0];
                        const forecastDate = new Date(dt_txt.replace(/-/g, '/')); 

                        if (!uniqueDates.has(forecastDate.toDateString())) {
                            uniqueDates.add(forecastDate.toDateString()); 

                            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

                            const formattedDate = formatDate(forecastDate);

                            const forecastCard = document.createElement('div');
                            forecastCard.classList.add('forecast-card');

                            const dateDiv = document.createElement('div');
                            dateDiv.classList.add('date');
                            dateDiv.textContent = formattedDate;

                            const iconDiv = document.createElement('div');
                            iconDiv.classList.add('icon');
                            const iconImg = document.createElement('img');
                            iconImg.src = iconUrl;
                            iconImg.alt = description;
                            iconDiv.appendChild(iconImg);

                            const tempCDiv = document.createElement('div');
                            tempCDiv.classList.add('celsius');
                            tempCDiv.textContent = `${temp.toFixed(2)} °C`;

                            const tempFDiv = document.createElement('div');
                            tempFDiv.classList.add('fahrenheit');
                            tempFDiv.textContent = `${((temp * 9) / 5 + 32).toFixed(2)} °F`;

                            const descDiv = document.createElement('div');
                            descDiv.classList.add('description');
                            descDiv.textContent = description;

                            forecastCard.appendChild(dateDiv);
                            forecastCard.appendChild(iconDiv);
                            forecastCard.appendChild(tempCDiv);
                            forecastCard.appendChild(tempFDiv);
                            forecastCard.appendChild(descDiv);

                            forecastContainer.appendChild(forecastCard);
                        }
                    });
                });
        });
    }
});

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
const headlineElement = document.getElementById('headline');
let headlines = [];
let currentHeadlineIndex = 0;
let intervalId; // Variable to hold the interval ID

// Function to fetch RSS headlines
async function fetchHeadlines() {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
    const data = await response.json();
    headlines = data.items.map(item => item.title);
  } catch (error) {
    console.error('Error fetching headlines:', error);
  }
}

// Function to display headlines
function displayHeadline() {
  headlineElement.textContent = headlines[currentHeadlineIndex];
  currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
}

// Function to schedule headlines change
function scheduleHeadlines() {
  // Display the first headline immediately
  displayHeadline();
  
  // Clear previous interval to ensure consistency
  clearInterval(intervalId);
  
  // Set a new interval to change headlines every 5 seconds
  intervalId = setInterval(displayHeadline, 6800);
}

// Initiate fetching headlines and scheduling display
fetchHeadlines().then(scheduleHeadlines);

let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let seconds = document.getElementById("seconds");

let set_clock = setInterval(() => {
    let date_now = new Date();

    let hr = date_now.getHours();
    let min = date_now.getMinutes();
    let sec = date_now.getSeconds();

    let calc_hr = (hr * 30) + (min / 2);
    let calc_min = (min * 6) + (sec / 10);
    let calc_sec = sec * 6;

    hour.style.transform = `rotate(${calc_hr}deg)`;
    minute.style.transform = `rotate(${calc_min}deg)`;
    seconds.style.transform = `rotate(${calc_sec}deg)`;
}, 1000);

function updateClock() {
  var now = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var dayOfWeek = days[now.getDay()];
  var month = months[now.getMonth()];
  var date = now.getDate();
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var timeString = dayOfWeek + ', ' + month + ' ' + date + ', ' + year + '<br>' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;

  document.getElementById('clock').innerHTML = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();

//holiday///////////////////////////////////////////
const holidaySection = document.getElementById('holidays');
const loadingText = document.getElementById('loading');

const apiKey = 'haloUsmdolcVybC21PN9ebZmNtkMcDqW';
const countryCode = 'IN';

const holidayUrl = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=2024`;

function createHeader() {
  const header = document.createElement('h2');
  header.textContent = 'Holidays in India';
  header.style.textTransform = 'uppercase';
  header.style.display = "flex";
  header.style.justifyContent ="center";
  header.style.paddingBottom = "10px";
  return header;
}

fetch(holidayUrl)
  .then(response => response.json())
  .then(data => {
    loadingText.textContent = '';

    const currentDate = new Date();
    const upcomingHolidays = data.response.holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date.datetime.year, holiday.date.datetime.month - 1, holiday.date.datetime.day);
      return holidayDate >= currentDate;
    }).slice(0, 10);

    holidaySection.insertBefore(createHeader(), holidaySection.firstChild);

    const holidayElements = upcomingHolidays.map(({ name, date: { datetime: { day, month, year } }, type }, index) => {
      const holidayDiv = document.createElement('div');
      holidayDiv.classList.add('holiday-item');
      holidayDiv.innerHTML = `
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-minus-fill" viewBox="0 0 16 16">
          <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1"/>
        </svg>
          <div class="holiday-name">${name}</div>
          <div class="holiday-type">(${type})</div>
        </span>
        <div class="holiday-date">${getFormattedDate(month, day)}</div>
      `;
      if (index >= 4) {
        holidayDiv.style.opacity = `${1 - (index - 5) * 0.2}`;
      }
      return holidayDiv;
    });

    holidaySection.append(...holidayElements);
  })
  .catch(error => {
    console.error('Error fetching holidays:', error);
    loadingText.textContent = 'Error loading holidays';
  });

function getFormattedDate(month, day) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[month - 1]}, ${day}<sup>th</sup>`;
}
