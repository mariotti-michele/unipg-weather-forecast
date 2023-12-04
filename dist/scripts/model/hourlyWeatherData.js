import { hourlyWeatherDataInserter } from '../view/hourlyWeatherDataEntry.js';
import { cityLatitude, cityLongitude } from '../parametersVariablesHourlyWeather.js';

export let hourlyWeatherData = {
    data: null,
    fetchWeatherData: function(){
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" + cityLatitude + "&longitude=" + cityLongitude 
                + "&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,"
                    + "weathercode,pressure_msl,windspeed_10m,winddirection_10m,windgusts_10m"
                        + "&current_weather=true&timezone=auto&forecast_days=16" + "&temperature_unit=" 
                            + localStorage.getItem("temperature-unit") + "&windspeed_unit=" + localStorage.getItem("wind-speed-unit") 
                                + "&precipitation_unit=" + localStorage.getItem("precipitations-unit")
        )
            .then((response) => {
                if (!response.ok){
                    alert("weather fetching error");
                    throw new Error("weather fetching error");
                }
                return response.json();
            })
            .then((data) => {
                this.data = data;
                hourlyWeatherDataInserter.displayWeatherData(data);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to fetch weather data. Please check your connection and try again later.");
            });
    }
};