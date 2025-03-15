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

        const response = await fetch(url, {mode: 'cors'});
        
        if (!response.ok){
            
            throw new Error('Enter a valid city, zip, or address!')
        }
        const data = await response.json();

        const roundedTemp = Math.round(data.days[0].temp);
        const roundedFeels = Math.round(data.days[0].feelslike);
        const roundedHigh = Math.round(data.days[0].tempmax);
        const roundedLow = Math.round(data.days[0].tempmin);
    
        city.innerText = `${data.resolvedAddress}`; 
        temp.innerText = `${roundedTemp} °F`;
        feels.innerText = `Feels Like: ${roundedFeels} °F`; 
        high.innerText = `High: ${roundedHigh} °F`;
        low.innerText = `Low: ${roundedLow} °F`;  

        const weatherIcon = data.days[0].icon;
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

        let icons = document.createElement("i");
        icons.className = "material-icons";
        let iconName = iconMap[weatherIcon];
        icons.textContent = iconName;
        temp.appendChild(icons);
        

    } catch (error) {
        alert(error);
        
    }

}

button.addEventListener("click", getWeather);