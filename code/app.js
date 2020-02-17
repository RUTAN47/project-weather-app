

const box1 = document.getElementById('1')
const box2 = document.getElementById('2')
const box3 = document.getElementById('3')
const box4 = document.getElementById('4')
const box5 = document.getElementById('5')
const box6 = document.getElementById('6')
const box7 = document.getElementById('7')
const box8 = document.getElementById('8')
const box9 = document.getElementById('9')
const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const img4 = document.getElementById('img4')
const img5 = document.getElementById('img5')
const img6 = document.getElementById('img6')
const day1 = document.getElementById('day1')
const day2 = document.getElementById('day2')
const day3 = document.getElementById('day3')
const day4 = document.getElementById('day4')
const day5 = document.getElementById('day5')
const day6 = document.getElementById('day6')




// API Current Weather
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=780130d874dec9595919c2211128e132`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    // main temperature
    box1.innerHTML = myJson.main.temp;
    //
    //weather
    box2.innerHTML = myJson.weather[0].main;
    // Picture weather
    box9.innerHTML = myJson.weather[0].icon;

    img1.src = `/assets/${myJson.weather[0].icon}.png`






    // Funtion to convert UNIXtimeStamp to Hours and Minutes
    const time = (unix_timestamp) => {
      const date = new Date(unix_timestamp * 1000)
      let hours = date.getHours();
      let minutes = date.getMinutes()
      let formattedTime = hours + ":" + minutes
      return formattedTime
    }
    // Sunrise
    box3.innerHTML = time(myJson.sys.sunrise);
    // Sunset
    box4.innerHTML = time(myJson.sys.sunset);
  });


/// API Forecasted weather
fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=780130d874dec9595919c2211128e132`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {

    // New fliterd array with values that inclueds midday
    const filteredForecast = myJson.list.filter(item => item.dt_txt.includes('12:00'))

    // Gets the day of month of 0 postion in the new array
    let todayWF = new Date(filteredForecast[0].dt_txt)
    let dateWF = todayWF.getUTCDate()

    // Gets the day of month for today
    let today = new Date();
    let date = today.getUTCDate()
    let day = today.getUTCDay()

    //// Checks if forecast date is same as todays date.  
    //// Sets the arraystart date to tommorow if date is same 
    let arrayDate = 0
    if (date === dateWF) {
      arrayDate = 1
    } else {
      arrayDate = 0
    }

    console.log(arrayDate)
    // Sets the main temperature of upcoming days.
    box5.innerHTML = filteredForecast[arrayDate].main.temp;
    box6.innerHTML = filteredForecast[arrayDate + 1].main.temp;
    box7.innerHTML = filteredForecast[arrayDate + 2].main.temp;
    box8.innerHTML = filteredForecast[arrayDate + 3].main.temp;

    // Sets the pictures for the upcoming days
    img2.src = `/assets/${filteredForecast[arrayDate].weather[0].icon}.png`;
    img3.src = `/assets/${filteredForecast[arrayDate + 1].weather[0].icon}.png`;
    img4.src = `/assets/${filteredForecast[arrayDate + 2].weather[0].icon}.png`;
    img5.src = `/assets/${filteredForecast[arrayDate + 3].weather[0].icon}.png`;



    ///
    console.log(day)
    const weekday = (day) => {
      switch (day) {
        case 0:
          return 'Sunday'
          break;
        case 1:
          return 'Monday'
          break;
        case 2:
          return 'Tuesday'
          break;
        case 3:
          return 'Wednesday'
          break;
        case 4:
          return 'Thursday'
          break;
        case 5:
          return 'Friday'
          break;
        case 6:
          return 'Saturday'
          break;
        default:
      }
    }
    day1.innerHTML=(weekday(day));
    day2.innerHTML=(weekday(day+1));
    day3.innerHTML=(weekday(day+2));
    day4.innerHTML=(weekday(day+3));
    day5.innerHTML=(weekday(day+4));


  });


