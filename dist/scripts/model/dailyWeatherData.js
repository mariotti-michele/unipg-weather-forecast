import { dailyWeatherDataInserter } from '../view/dailyWeatherDataEntry.js';

export let dailyWeatherData = {
    data: null,
    fetchWeatherData: function(){
        let cityLatitude = localStorage.getItem("city-latitude");
        let cityLongitude = localStorage.getItem("city-longitude");
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" + cityLatitude + "&longitude=" + cityLongitude + 
                "&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,"
                    + "sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,"
                        + "winddirection_10m_dominant&current_weather=true&timezone=auto&forecast_days=16&temperature_unit=" 
                            + localStorage.getItem("temperature-unit") + "&windspeed_unit=" + localStorage.getItem("wind-speed-unit") 
                                + "&precipitation_unit=" + localStorage.getItem("precipitations-unit")
        )
            .then((response) => {
                if (!response.ok){
                    if(cityLatitude == "null" && cityLongitude == "null"){
                        alert("geographic coordinates not found, make sure to enter an existing city");
                        throw new Error("geographic coordinates are null error");
                    }
                    else{
                        alert("weather fetching error");
                        throw new Error("weather fetching error");
                    }
                }
                return response.json();
            })
            .then((data) => {
                this.data = data;
                dailyWeatherDataInserter.displayWeatherData(data);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to fetch weather data. Please check your connection and try again later.");
            });
    }
}