const Data = {

    method: 'GET',
    headers: {
      // 'X-RapidAPI-Key': '702c17831cmsh1835fb10cb80434p120c21jsnd09cc1d4ef11',
      // 'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
    };
    const getWeather=(city)=>{
    
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=hours&key=RKEHGU25JG2UTJE8BYB5A3TFH&contentType=json`)
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      cityName.innerHTML=city
      time.innerHTML = response.days[0].datetime
      
      temp.innerHTML= response.days[0].temp
      pressure.innerHTML= response.days[0].pressure
      feels_like.innerHTML = response.days[0].feelslike
      humidity.innerHTML = response.days[0].humidity 
      sunrise.innerHTML = response.days[0].sunrise
      sunset.innerHTML = response.days[0].sunset
      wind_speed.innerHTML = response.days[0].windspeed
      
      
    })
    .catch(err => console.error(err));
    }
    submit.addEventListener("click",(e)=>{
      e.preventDefault()
    getWeather(city.value)
    })
    

console.log("Subham");










//     const subham ={
//      method:'GET',
//      headers:{
//         'X-RapidAPI-Key': '702c17831cmsh1835fb10cb80434p120c21jsnd09cc1d4ef11',
//         'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
//      }   
//     };

//         fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=angul',subham)
//         .then(response => response.json())
//         .then((response) =>{
//             console.log(response)
//         })
// .catch(err=>console.log(err))

