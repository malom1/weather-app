const searchInput = document.querySelector('input');
const button = document.querySelector('button');
const city = document.getElementsByClassName('city');
const temp = document.getElementsByClassName('temp');
const feels = document.getElementsByClassName('feels');
const high = document.getElementsByClassName('high');
const low = document.getElementsByClassName('low');

async function getWeather() {

    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/new%20york?unitGroup=us&include=current&key=YV83AC4SHTANGT5Q398R6SBTM&contentType=json', {mode: 'cors'})
    const data = await response.json();

    city.innerText = data.resolvedAddress;
    temp.innerText = data.days[0].temp;
    feels.innerText = data.days[0].feelslike; 
    high.innerText = data.days[0].tempmax;
    low.innerText = data.days[0].tempmin;

    console.log(city.innerText)
    console.log(temp.innerText)
    console.log(feels.innerText)
    console.log(high.innerText)
    console.log(low.innerText)

}

getWeather();

// button.addEventListener("click", getWeather);