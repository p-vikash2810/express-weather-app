const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const Today_date = document.getElementById("Today_date");



const getCurrentDay = () => {
  let weekDay = new Array(7);
  weekDay[0] = "Sunday";
  weekDay[1] = "Monday";
  weekDay[2] = "Tuesday";
  weekDay[3] = "Wednesday";
  weekDay[4] = "Thursday";
  weekDay[5] = "Friday";
  weekDay[6] = "Saturday";

  let month = new Array(12);
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  let currentTime = new Date();

  days = weekDay[currentTime.getDay()];
  Today_date.innerText = `${currentTime.getDate()} ${
    month[currentTime.getMonth()]
  }`;
  day.innerText = days;
};

getCurrentDay();

// const apiId = process.env.API_ID;
// console.log(apiId);
const getInfo = async (e) => {
  e.preventDefault();

  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Please enter city name";
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=bc90c129ba610abfc35903575d04dea3`;
      let response = await fetch(url);
      response = await response.json();
      const arrData = [response];
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

      const tempLive = arrData[0].main.temp - 273.15;
      temp.innerText = tempLive.toFixed(2);
      const tempMood = arrData[0].weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style = 'color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style = 'color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-rain' style = 'color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style = 'color: #eccc68;'></i>";
      }
      dataHide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Please enter correct city name";
      dataHide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);
