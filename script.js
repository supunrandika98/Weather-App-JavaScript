 const iconElement = document.querySelector(".weather-icon");
 const tempElement = document.querySelector(".temperature-value p");
 const descElement = document.querySelector(".temperature-description p");
 const locationElement = document.querySelector(".loaction p");
 const notifyElement = document.querySelector(".notifiaction");


 //App Data
 const weather={};

 weather.temperature = {
     unit : "celsius"
 }

 const KELVIN = 273;

 const key = "Enter Your OpenWeather API Key !!!";

 //check if browser support Geolocation
 if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
 }
 else{
    notifyElement.style.display = "block";
    notifyElement.innerHTML = " <p> Browser dose not support GeoLocation !!!</p>"
 }

 //Set user position
 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;
   
     getWeather(latitude, longitude);
 }

 function showError(error){
    notifyElement.style.display = "block";
    notifyElement.innerHTML = `<p> ${error.message}</p>`;
 }

 //Get weather from API provider
 function  getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);

    fetch(api).then(function(response){
       let data = response.json();
       return data;
    })
    .then(function(data){
       weather.temperature.value = Math.floor(data.main.temp - KELVIN);
       weather.description = data.weather[0].description;
       weather.iconId = data.weather[0].icon;
       weather.city = data.name;
       weather.country = data.sys.country;
    })
    .then(function(){
       displayWeather();
    })
 }

 //Display weather to UI
 function displayWeather(){
   iconElement.innerHTML = ` <img src="icons/${weather.iconId}.png"> `;
   tempElement.innerHTML = `${weather.temperature.value} &#8451; `;
   descElement.innerHTML = weather.description;
   locationElement.innerHTML = `${weather.city} , ${weather.country}`;

 }