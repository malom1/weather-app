const searchInput = document.querySelector('input');
const button = document.querySelector('button');

const city = document.getElementById('city');
const temp = document.getElementById('temp');
const feels = document.getElementById('feels');
const high = document.getElementById('high');
const low = document.getElementById('low');
const icons = document.getElementById('icons');

async function getWeather(event) {
    
    //Prevents automatic refresh
    event.preventDefault();

    const cityName = encodeURIComponent(searchInput.value.trim());
    if(!cityName){
        alert('Enter a city');
        return;
    }

    try{
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=GAHNYCAZB93X4SBGAX38Q495V&contentType=json`;

        const response = await fetch(url, {mode: 'cors'});
        
        if (!response.ok){
            
            throw new Error('Enter a valid city, zip, or address!')
        }
        const data = await response.json();

        //Gather API data and round out the temperatures
        const roundedTemp = Math.round(data.days[0].temp);
        const roundedFeels = Math.round(data.days[0].feelslike);
        const roundedHigh = Math.round(data.days[0].tempmax);
        const roundedLow = Math.round(data.days[0].tempmin);
        const weatherIcon = data.days[0].icon;
    
        //Changes to the DOM based on API data
        city.innerText = `${data.resolvedAddress}`; 
        temp.innerText = `${roundedTemp} °F`;
        feels.innerText = `Feels Like: ${roundedFeels} °F`; 
        high.innerText = `High: ${roundedHigh} °F`;
        low.innerText = `Low: ${roundedLow} °F`;  

        //Change icon based on weather conditions
        let iconName = getIcon(weatherIcon);
        icons.textContent = iconName;

    } catch (error) {
        alert(error);
        
    }

}

function getIcon(weatherIcon) {
    const iconMap = {
        "clear-day": "wb_sunny",
        "clear-night": "nights_stay",
        "cloudy": "cloud",
        "fog": "foggy",
        "partly-cloudy-day": "partly_cloudy_day",
        "partly-cloudy-night": "partly_cloudy_night",
        "rain": "umbrella",
        "snow": "ac_unit",
        "wind": "air"
    }
    return iconMap[weatherIcon];
}

button.addEventListener("click", getWeather);