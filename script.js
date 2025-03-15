const searchInput = document.querySelector('input');
const button = document.querySelector('button');

const city = document.getElementById('city');
const temp = document.getElementById('temp');
const feels = document.getElementById('feels');
const high = document.getElementById('high');
const low = document.getElementById('low');

async function getWeather() {
    try {
        const cityName = encodeURIComponent(searchInput.value.trim());
        if(!cityName){
            alert('Enter a valid city');
            return;
        }

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dallas?unitGroup=us&key=GAHNYCAZB93X4SBGAX38Q495V&contentType=json`;
        console.log('fetching url: ', url);

        const response = await fetch(url, {mode: 'cors'})
        if (!response.ok){
            throw new Error(`HTTP Error! Status: ${reponse.status}`)
        }
        const data = await response.json();
    
        city.innerText = `City: ${data.resolvedAddress}`; 
        temp.innerText = `Temperature: ${data.days[0].temp}`;
        feels.innerText = `Feels Like: ${data.days[0].feelslike}`; 
        high.innerText = `High: ${data.days[0].tempmax}`;
        low.innerText = `Low: ${data.days[0].tempmin}`;
        
    } catch (error) {
        alert("Error: " + error);
        
    }

}

button.addEventListener("click", getWeather);