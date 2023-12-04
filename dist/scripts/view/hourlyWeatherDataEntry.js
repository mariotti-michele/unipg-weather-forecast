import { getCurrentHourByTimezone, getCardinalPoint } from "./viewTools.js";
import { LARGE_SCREEN_BREAKPOINT, WEATHER_ICONS_WITH_SUN_AND_MOON, WEATHER_DESCRIPTIONS, isWidthLowerThanMobileBreakpoint } 
    from "../constantsAndMultipurposeVariables.js";
import { cityName, dayIndex, dayOfWeek, dayOfMonth, month, sunrise, sunset } from "../parametersVariablesHourlyWeather.js";
import { setMainContainerHeight } from "./viewTools.js";

export let hourlyWeatherDataInserter = {
    hourlyWeatherData: null,

    fillHourCells: function(){
        let hourCells = document.getElementsByClassName("hour-cell-hw");
        for(let i = 0; i < hourCells.length; i++){
            let paragraphs = hourCells[i].getElementsByTagName("p");
            let hour = this.hourlyWeatherData.hourly.time[i + 24*dayIndex].split("T")[1];
            paragraphs[0].textContent = hour;
        }
    },

    fillWeatherConditionsCells: function(){
        let weatherConditionCells = document.getElementsByClassName("weather-condition-cell-hw");
        for(let i = 0; i < weatherConditionCells.length; i++){
            let paragraphs = weatherConditionCells[i].getElementsByTagName("p");
            let images = weatherConditionCells[i].getElementsByTagName("img");
            paragraphs[0].textContent = WEATHER_DESCRIPTIONS[this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex]][localStorage.getItem("language")];
            if(WEATHER_ICONS_WITH_SUN_AND_MOON.includes(this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex])){
                if(i >= sunrise && i <= sunset){
                    images[0].src = "../images/weather-conditions/w_" + this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex] + "d.svg";
                }
                else{
                    images[0].src = "../images/weather-conditions/w_" + this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex] + "n.svg";
                }
            }
            else if(this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex] == 45 || this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex] == 48){
                images[0].src = "../images/weather-conditions/w_4.svg";
            }
            else{
                images[0].src = "../images/weather-conditions/w_" + this.hourlyWeatherData.hourly.weathercode[i + 24*dayIndex] + ".svg";
            }
        }
    },

    fillTempCells: function(){
        let tempCells = document.getElementsByClassName("temp-cell-hw");
        for(let i = 0; i < tempCells.length; i++){
            let paragraphs = tempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.temperature_2m[i + 24*dayIndex]) + "°";
        }
    },

    fillAppTempCells: function(){
        let tempCells = document.getElementsByClassName("app-temp-cell-hw");
        for(let i = 0; i < tempCells.length; i++){
            let paragraphs = tempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = "p." + Math.round(this.hourlyWeatherData.hourly.apparent_temperature[i + 24*dayIndex]) + "°";
        }
    },

    fillPrecipitationsCells: function(){
        let precipitationsCells = document.getElementsByClassName("precipitations-cell-hw");
        for(let i = 0; i < precipitationsCells.length; i++){
            let paragraphs = precipitationsCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = this.hourlyWeatherData.hourly.precipitation[i + 24*dayIndex]
                + " " + this.hourlyWeatherData.hourly_units.precipitation;
            if(this.hourlyWeatherData.hourly.precipitation[i + 24*dayIndex] > 0 
                && this.hourlyWeatherData.hourly.precipitation_probability[i + 24*dayIndex] != null){
                    let prob = " (" + this.hourlyWeatherData.hourly.precipitation_probability[i + 24*dayIndex] + "%)";
                    paragraphs[0].textContent += prob;
            }
        }
    },
    
    fillWindCells: function(){
        let windCells = document.getElementsByClassName("wind-cell-hw");
        for(let i = 0; i < windCells.length; i++){
            let paragraphs = windCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.windspeed_10m[i + 24*dayIndex]) 
                + " " + this.hourlyWeatherData.hourly_units.windspeed_10m + " ";
            paragraphs[0].textContent += getCardinalPoint(this.hourlyWeatherData.hourly.winddirection_10m[i + 24*dayIndex]);
        }
    },

    fillHumidityCellsMainTable: function(){
        let humidityCells = document.getElementsByClassName("humidity-cell-main-table-hw");
        for(let i = 0; i < humidityCells.length; i++){
            let paragraphs = humidityCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = this.hourlyWeatherData.hourly.relativehumidity_2m[i + 24*dayIndex] + "%";
        }
    },

    fillPressureCellsMainTable: function(){
        let pressureCells = document.getElementsByClassName("pressure-cell-main-table-hw");
        for(let i = 0; i < pressureCells.length; i++){
            let paragraphs = pressureCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.pressure_msl[i + 24*dayIndex]) + " hPa";
        }
    },

    fillWindGustsCellsMainTable: function(){
        let windGustsCells = document.getElementsByClassName("wind-gusts-cell-main-table-hw");
        for(let i = 0; i < windGustsCells.length; i++){
            let paragraphs = windGustsCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.windgusts_10m[i + 24*dayIndex]) 
                + " " + this.hourlyWeatherData.hourly_units.windgusts_10m;
        }
    },

    fillAsideTable: function(hourIndex){
        let extraInfoHour = document.getElementById("extra-info-hour-hw");
        let hour = this.hourlyWeatherData.hourly.time[hourIndex + 24*dayIndex].split("T")[1];
        if(localStorage.getItem("language") == "en"){
            extraInfoHour.textContent = "Time: " + hour;
            let extraInfoNameAndImageCells = document.getElementsByClassName("extra-info-name-and-image-aside-table-hw");
            extraInfoNameAndImageCells[0].querySelector("p").textContent = "Relative Humidity";
            extraInfoNameAndImageCells[1].querySelector("p").textContent = "Pressure";
            extraInfoNameAndImageCells[2].querySelector("p").textContent = "Maximum Wind Gusts";
        }
        else{
            extraInfoHour.textContent = "Ora: " + hour;
        }

        let extraInfoCells = document.getElementsByClassName("extra-info-data-aside-table-hw");
        for(let i = 0; i < extraInfoCells.length; i++){
            var paragraphs = extraInfoCells[i].getElementsByTagName("p");
            if(i == 0){
                paragraphs[0].textContent = this.hourlyWeatherData.hourly.relativehumidity_2m[hourIndex + 24*dayIndex] + "%";
            }
            else if(i == 1){
                paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.pressure_msl[hourIndex + 24*dayIndex]) + " hPa";
            }
            else if(i == 2){
                paragraphs[0].textContent = Math.round(this.hourlyWeatherData.hourly.windgusts_10m[hourIndex + 24*dayIndex]) 
                    + " " + this.hourlyWeatherData.hourly_units.windgusts_10m;
            }
        }
    },

    fillMainInfoRows: function(){
        this.fillHourCells();
        this.fillWeatherConditionsCells();
        this.fillTempCells();
        this.fillAppTempCells();
        this.fillPrecipitationsCells();
        this.fillWindCells();
    },

    fillExtraInfoRows: function(){
        this.fillHumidityCellsMainTable();
        this.fillPressureCellsMainTable();
        this.fillWindGustsCellsMainTable();
    },

    fillTextCurrentWeather: function(){
        document.getElementById("current-weather-text").innerHTML = "<strong><span>" 
                + cityName.charAt(0).toUpperCase() + cityName.slice(1) + "</span></strong>" + ", " 
                    + Math.round(this.hourlyWeatherData.current_weather.temperature) + "°";
        
        let textParagraph = document.getElementById("current-weather-text");
        let cityText = textParagraph.querySelector("span");

        if(window.innerWidth >= LARGE_SCREEN_BREAKPOINT){
            if(cityName.length > 20){
                textParagraph.style.fontSize = "12px";
                cityText.style.fontSize = "20px";
            }
            else if(cityName.length > 10){
                textParagraph.style.fontSize = "18px";
                cityText.style.fontSize = "30px";
            }
            else{
                textParagraph.style.fontSize = "21px";
                cityText.style.fontSize = "35px";
            }
        }
        else{
            if(cityName.length > 18){
                textParagraph.style.fontSize = "10px";
                cityText.style.fontSize = "12px";
            }
            else if(cityName.length > 9){
                textParagraph.style.fontSize = "10px";
                cityText.style.fontSize = "16px";
            }
            else{
                textParagraph.style.fontSize = "12px";
                cityText.style.fontSize = "20px";
            }
        }
    },

    fillImgCurrentWeather(){
        if(WEATHER_ICONS_WITH_SUN_AND_MOON.includes(this.hourlyWeatherData.current_weather.weathercode)){
            if(this.hourlyWeatherData.current_weather.is_day){
                document.getElementById("current-weather-img").src = "../images/weather-conditions/w_" 
                    + this.hourlyWeatherData.current_weather.weathercode + "d.svg";
            }
            else{
                document.getElementById("current-weather-img").src = "../images/weather-conditions/w_" 
                    + this.hourlyWeatherData.current_weather.weathercode + "n.svg";
            }
        }
        else if(this.hourlyWeatherData.current_weather.weathercode == 45 || this.hourlyWeatherData.current_weather.weathercode == 48){
            document.getElementById("current-weather-img").src = "../images/weather-conditions/w_4.svg";
        }
        else{
            document.getElementById("current-weather-img").src = "../images/weather-conditions/w_" + this.hourlyWeatherData.current_weather.weathercode + ".svg";
        }
        document.getElementById("current-weather-img").style.display = "block";
    },

    fillCurrentWeather: function(){
        this.fillTextCurrentWeather();
        this.fillImgCurrentWeather();
    },

    hidePastHoursRows: function(){
        if(dayIndex == 0){
            let rows = document.getElementsByClassName("main-info-row-hw");
            let extraInfoRows = document.getElementsByClassName("extra-info-row-hw");
            let currentHour = getCurrentHourByTimezone(this.hourlyWeatherData.timezone);
            for(let i = 0; i < currentHour; i++){
                rows[i].style.display = "none";
                extraInfoRows[i].style.display = "none";
            }
            setMainContainerHeight("main-container-hw", "hourly-weather-main");
        }
    },

    fillDateAndTimezoneContainer: function(){
        if(dayIndex == 0){
            document.getElementById("minus-button").style.backgroundColor = "grey";
            document.getElementById("minus-button").classList.add("disabled-button");
        }
        else if(dayIndex == 15){
            document.getElementById("plus-button").style.backgroundColor = "grey";
            document.getElementById("plus-button").classList.add("disabled-button");
        }
        let date = document.getElementById("date-text");
        let timezone = document.getElementById("timezone-text");

        let formattedDate;
        if(isWidthLowerThanMobileBreakpoint){
            formattedDate = dayOfWeek.substring(0, 3) + " " + dayOfMonth + " " + month.substring(0, 3);
        }
        else{
            formattedDate = dayOfWeek + " " + dayOfMonth + " " + month;
        }

        date.textContent = formattedDate;
        timezone.textContent = "Timezone: " + this.hourlyWeatherData.timezone;
    },

    displayWeatherData: function(hourlyWeatherData){
        this.hourlyWeatherData = hourlyWeatherData;
        this.fillDateAndTimezoneContainer();
        this.hidePastHoursRows();
        this.fillCurrentWeather();
        this.fillMainInfoRows();
        this.fillExtraInfoRows();
        if(dayIndex == 0){
            this.fillAsideTable(getCurrentHourByTimezone(hourlyWeatherData.timezone));
        }
        else{
            this.fillAsideTable(0);
        }
        let mainTable = document.getElementById("main-table-hw");
        mainTable.style.visibility = "visible";
        let asideTable = document.getElementById("aside-table-hw");
        asideTable.style.visibility = "visible";
    }
}