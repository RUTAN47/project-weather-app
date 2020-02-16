

const box1 = document.getElementById('1')
const box2 = document.getElementById('2')
const box3 = document.getElementById('3')
const box4 = document.getElementById('4')
const box5 = document.getElementById('5')
const box6 = document.getElementById('6')
const box7 = document.getElementById('7')
const box8 = document.getElementById('8')
const box9 = document.getElementById('9')


// API Current Weather
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=780130d874dec9595919c2211128e132`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    // main temperature
    box1.innerHTML = myJson.main.temp;
    //weather
    box2.innerHTML = myJson.weather[0].main;

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


    const filteredForecast = myJson.list.filter(item => item.dt_txt.includes('12:00'))

    console.log(filteredForecast[0].dt_txt)

    let todayWF = new Date(filteredForecast[0].dt_txt)
    let dateWF = todayWF.getUTCDate()
    console.log(dateWF)

    //// Checks if forecast date is same as todays date.  
    //// Sets the arraystart date to tommorow if  
    let today = new Date();
    let date = today.getUTCDate()
    console.log(date)
    

    let arrayDate = 0
    if (date === dateWF) {
      arrayDate = 1
    } else {
      arrayDate = 0
    }

    console.log(arrayDate)

    box5.innerHTML=filteredForecast[arrayDate].main.temp;
    box6.innerHTML=filteredForecast[arrayDate+1].main.temp;
    box7.innerHTML=filteredForecast[arrayDate+2].main.temp;
    box8.innerHTML=filteredForecast[arrayDate+3].main.temp;


    const day = (time) => {
      const unix_timestamp = myJson.list[time].dt
      const date = new Date(unix_timestamp * 1000)
      let formattedTime = date.getUTCDate()
      console.log(day)
    }






  });


