import { LARGE_SCREEN_BREAKPOINT, WEATHER_ICONS_WITH_SUN_AND_MOON, WEATHER_DESCRIPTIONS, isWidthLowerThanMobileBreakpoint} 
    from "../constantsAndMultipurposeVariables.js";
import { daysOfWeekSelectedLanguage, monthsSelectedLanguage } from "../settings.js";
import { getCardinalPoint } from "./viewTools.js";

export let dailyWeatherDataInserter = {
    dailyWeatherData: null,
    
    fillDateCells: function(){
        let dateCells = document.getElementsByClassName("date-cell");
        for(let i = 0; i < dateCells.length; i++){
            let paragraphs = dateCells[i].getElementsByTagName("p");
            let dateObj = new Date(this.dailyWeatherData.daily.time[i]);
            let dayOfWeek = daysOfWeekSelectedLanguage[dateObj.getDay()];
            let dayOfMonth = dateObj.getDate();
            let month = monthsSelectedLanguage[dateObj.getMonth()];
            let formattedDate;
            if(isWidthLowerThanMobileBreakpoint){
                formattedDate = dayOfWeek.substring(0, 3) + " " + dayOfMonth + "<br>" + month.substring(0, 3);
            }
            else{
                formattedDate = dayOfWeek + " " + dayOfMonth + " " + month;
            }
            paragraphs[0].innerHTML = formattedDate;
        }
    },

    fillWeatherConditionsCells: function(){
        let weatherConditionCells = document.getElementsByClassName("weather-condition-cell");
        for(let i = 0; i < weatherConditionCells.length; i++){
            let paragraphs = weatherConditionCells[i].getElementsByTagName("p");
            let images = weatherConditionCells[i].getElementsByTagName("img");
            if(this.dailyWeatherData.daily.weathercode[i] == null || this.dailyWeatherData.daily.weathercode[i] == undefined){
                    console.warn("weather code not found for day index " + i + ", code: " + this.dailyWeatherData.daily.weathercode[i]);
                    if(i == weatherConditionCells.length - 1)
                        document.getElementById("last-main-info-row").style.display = "none";
                    else
                        paragraphs[0].textContent = "-";
            }
            else{
                paragraphs[0].textContent = WEATHER_DESCRIPTIONS[this.dailyWeatherData.daily.weathercode[i]][localStorage.getItem("language")];
                if(WEATHER_ICONS_WITH_SUN_AND_MOON.includes(this.dailyWeatherData.daily.weathercode[i])){
                    images[0].src = "images/weather-conditions/w_" + this.dailyWeatherData.daily.weathercode[i] + "d.svg";
                }
                else if(this.dailyWeatherData.daily.weathercode[i] == 45 || this.dailyWeatherData.daily.weathercode[i] == 48){
                    images[0].src = "images/weather-conditions/w_4.svg";
                }
                else{
                    images[0].src = "images/weather-conditions/w_" + this.dailyWeatherData.daily.weathercode[i] + ".svg";
                }
            }
        }
    },
    
    fillMaxTempCells: function(){
        let maxTempCells = document.getElementsByClassName("max-temp-cell");
        for(let i = 0; i < maxTempCells.length; i++){
            let paragraphs = maxTempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.temperature_2m_max[i]) + "°";
        }
    },
    
    fillMinTempCells: function(){
        let minTempCells = document.getElementsByClassName("min-temp-cell");
        for(let i = 0; i < minTempCells.length; i++){
            let paragraphs = minTempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.temperature_2m_min[i]) + "°";
        }
    },
    
    fillPrecipitationsCells: function(){
        let precipitationsCells = document.getElementsByClassName("precipitations-cell");
        for(let i = 0; i < precipitationsCells.length; i++){
            let paragraphs = precipitationsCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = this.dailyWeatherData.daily.precipitation_sum[i]
                + " " + this.dailyWeatherData.daily_units.precipitation_sum;
            if(this.dailyWeatherData.daily.precipitation_sum[i] > 0 
                && this.dailyWeatherData.daily.precipitation_probability_max[i] != null){
                    let prob = " (" + this.dailyWeatherData.daily.precipitation_probability_max[i] + "%)";
                    paragraphs[0].textContent += prob;
            }
        }
    },
    
    fillWindCells: function(){
        let windCells = document.getElementsByClassName("wind-cell");
        for(let i = 0; i < windCells.length; i++){
            let paragraphs = windCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.windspeed_10m_max[i]) 
                + " " + this.dailyWeatherData.daily_units.windspeed_10m_max + " ";
            paragraphs[0].textContent += getCardinalPoint(this.dailyWeatherData.daily.winddirection_10m_dominant[i]);
        }
    },
    
    fillSunriseCellsMainTable: function(){
        let sunriseCells = document.getElementsByClassName("sunrise-cell-main-table");
        for(let i = 0; i < sunriseCells.length; i++){
            let paragraphs = sunriseCells[i].getElementsByTagName("p");
            let date = new Date(this.dailyWeatherData.daily.sunrise[i]);
            let hour = date.getHours();
            let minute = date.getMinutes();
            let timeFormat = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
            paragraphs[0].textContent = timeFormat;
        }
    },
    
    fillSunsetCellsMainTable: function(){
        let sunsetCells = document.getElementsByClassName("sunset-cell-main-table");
        for(let i = 0; i < sunsetCells.length; i++){
            let paragraphs = sunsetCells[i].getElementsByTagName("p");
            let date = new Date(this.dailyWeatherData.daily.sunset[i]);
            let hour = date.getHours();
            let minute = date.getMinutes();
            let timeFormat = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
            paragraphs[0].textContent = timeFormat;
        }
    },
    
    fillMaxApparentTempCellsMainTable: function(){
        let maxAppTempCells = document.getElementsByClassName("max-apparent-temp-cell-main-table");
        for(let i = 0; i < maxAppTempCells.length; i++){
            let paragraphs = maxAppTempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = "p." + Math.round(this.dailyWeatherData.daily.apparent_temperature_max[i]) + "°";
        }
    },
    
    fillMinApparentTempCellsMainTable: function(){
        let minAppTempCells = document.getElementsByClassName("min-apparent-temp-cell-main-table");
        for(let i = 0; i < minAppTempCells.length; i++){
            let paragraphs = minAppTempCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = "p." + Math.round(this.dailyWeatherData.daily.apparent_temperature_min[i]) + "°";
        }
    },
    
    fillUvIndexCellsMainTable: function(){
        let uvCells = document.getElementsByClassName("uv-index-cell-main-table");
        for(let i = 0; i < uvCells.length; i++){
            let paragraphs = uvCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.uv_index_max[i]);
        }
    },
    
    fillWindGustsCellsMainTable: function(){
        let windGustsCells = document.getElementsByClassName("wind-gusts-cell-main-table");
        for(let i = 0; i < windGustsCells.length; i++){
            let paragraphs = windGustsCells[i].getElementsByTagName("p");
            paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.windgusts_10m_max[i]) 
                + " " + this.dailyWeatherData.daily_units.windgusts_10m_max;
        }
    },
    
    fillAsideTable: function(dayIndex){
        let extraInfoDate = document.getElementById("extra-info-date");
        let dateObj = new Date(this.dailyWeatherData.daily.time[dayIndex]);
        let dayOfWeek = daysOfWeekSelectedLanguage[dateObj.getDay()];
        let dayOfMonth = dateObj.getDate();
        let month = monthsSelectedLanguage[dateObj.getMonth()];
        let formattedDate = dayOfWeek + " " + dayOfMonth + " " + month;
        extraInfoDate.textContent = formattedDate;

        if(localStorage.getItem("language") == "en"){
            let extraInfoNameAndImageCells = document.getElementsByClassName("extra-info-name-and-image-aside-table");
            extraInfoNameAndImageCells[0].querySelector("p").textContent = "Maximum Apparent Temperature";
            extraInfoNameAndImageCells[1].querySelector("p").textContent = "Minimum Apparent Temperature";
            extraInfoNameAndImageCells[2].querySelector("p").textContent = "Sunrise";
            extraInfoNameAndImageCells[3].querySelector("p").textContent = "Sunset";
            extraInfoNameAndImageCells[4].querySelector("p").textContent = "Maximum Wind Gusts";
            extraInfoNameAndImageCells[5].querySelector("p").textContent = "Maximum UV Index";
        }

        let extraInfoCells = document.getElementsByClassName("extra-info-data-aside-table");
        for(let i = 0; i < extraInfoCells.length; i++){
            var paragraphs = extraInfoCells[i].getElementsByTagName("p");
            if(i == 0){
                paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.apparent_temperature_max[dayIndex]) + "°";
            }
            else if(i == 1){
                paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.apparent_temperature_min[dayIndex]) + "°";
            }
            else if(i == 2){
                let date = new Date(this.dailyWeatherData.daily.sunrise[dayIndex]);
                let hour = date.getHours();
                let minute = date.getMinutes();
                let timeFormat = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
                paragraphs[0].textContent = timeFormat;
            }
            else if(i == 3){
                let date = new Date(this.dailyWeatherData.daily.sunset[dayIndex]);
                let hour = date.getHours();
                let minute = date.getMinutes();
                let timeFormat = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
                paragraphs[0].textContent = timeFormat;
            }
            else if(i == 4){
                paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.windgusts_10m_max[dayIndex])
                    + " " + this.dailyWeatherData.daily_units.windgusts_10m_max;
            }
            else if(i == 5){
                paragraphs[0].textContent = Math.round(this.dailyWeatherData.daily.uv_index_max[dayIndex]);
            }
        }
    },
    
    fillMainInfoRows: function(){
        this.fillDateCells();
        this.fillWeatherConditionsCells();
        this.fillMaxTempCells();
        this.fillMinTempCells();
        this.fillPrecipitationsCells();
        this.fillWindCells();
    },
    
    fillExtraInfoRows: function(){
        this.fillSunriseCellsMainTable();
        this.fillSunsetCellsMainTable();
        this.fillMaxApparentTempCellsMainTable();
        this.fillMinApparentTempCellsMainTable();
        this.fillUvIndexCellsMainTable();
        this.fillWindGustsCellsMainTable();
    },

    fillTextCurrentWeather: function(cityName){
        document.getElementById("current-weather-text").innerHTML = "<strong><span>" 
                + cityName.charAt(0).toUpperCase() + cityName.slice(1) + "</span></strong>" + ", " 
                    + Math.round(this.dailyWeatherData.current_weather.temperature) + "°";
        
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
        if(WEATHER_ICONS_WITH_SUN_AND_MOON.includes(this.dailyWeatherData.current_weather.weathercode)){
            if(this.dailyWeatherData.current_weather.is_day){
                document.getElementById("current-weather-img").src = "images/weather-conditions/w_" 
                    + this.dailyWeatherData.current_weather.weathercode + "d.svg";
            }
            else{
                document.getElementById("current-weather-img").src = "images/weather-conditions/w_" 
                    + this.dailyWeatherData.current_weather.weathercode + "n.svg";
            }
        }
        else if(this.dailyWeatherData.current_weather.weathercode == 45 || this.dailyWeatherData.current_weather.weathercode == 48){
            document.getElementById("current-weather-img").src = "images/weather-conditions/w_4.svg";
        }
        else{
            document.getElementById("current-weather-img").src = "images/weather-conditions/w_" + this.dailyWeatherData.current_weather.weathercode + ".svg";
        }
        document.getElementById("current-weather-img").style.display = "block";
    },

    fillCurrentWeather: function(){
        this.fillTextCurrentWeather(localStorage.getItem("city-name"));
        this.fillImgCurrentWeather();
    },
    
    displayWeatherData: function(dailyWeatherData){
        this.dailyWeatherData = dailyWeatherData;
        this.fillCurrentWeather();
        this.fillMainInfoRows();
        this.fillExtraInfoRows();
        this.fillAsideTable(0);
        let mainTable = document.getElementById("main-table");
        mainTable.style.visibility = "visible";
        let asideTable = document.getElementById("aside-table");
        asideTable.style.visibility = "visible";
    }
}
