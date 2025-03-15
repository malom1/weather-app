const searchInput = document.querySelector('input');
const button = document.querySelector('button');

const city = document.getElementById('city');
const temp = document.getElementById('temp');
const feels = document.getElementById('feels');
const high = document.getElementById('high');
const low = document.getElementById('low');

async function getWeather(event) {
    event.preventDefault();

    const cityName = encodeURIComponent(searchInput.value.trim());
    if(!cityName){
        alert('Enter a city');
        return;
    }

    try{
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=GAHNYCAZB93X4SBGAX38Q495V&contentType=json`;
        console.log('fetching url: ', url);

        const response = await fetch(url, {mode: 'cors'});
        
        if (!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }
        const data = await response.json();
    
        city.innerText = `${data.resolvedAddress}`; 
        temp.innerText = `${data.days[0].temp}°F`;
        feels.innerText = `Feels Like: ${data.days[0].feelslike}°F`; 
        high.innerText = `High: ${data.days[0].tempmax}°F`;
        low.innerText = `Low: ${data.days[0].tempmin}°F`;   

        console.log(temp.innerText);

    } catch (error) {
        alert("Error: " + error);
        
    }

}

button.addEventListener("click", getWeather);