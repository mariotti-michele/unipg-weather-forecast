import { dailyWeatherData } from "../model/dailyWeatherData.js";
import { dailyWeatherDataInserter } from "../view/dailyWeatherDataEntry.js";
import { hourlyWeatherData } from "../model/hourlyWeatherData.js";
import { hourlyWeatherDataInserter } from "../view/hourlyWeatherDataEntry.js";
import { getCurrentHourByTimezone, getHour } from "../view/viewTools.js";
import { isIndexPage } from "./controllerTools.js"
import { isExpanded, setIsExpanded } from "../constantsAndMultipurposeVariables.js";
import { daysOfWeekSelectedLanguage, monthsSelectedLanguage } from "../settings.js";
import { dayIndex } from "../parametersVariablesHourlyWeather.js";

function reduceAction(rows, expandImgPath, expandImgId, lastMainInfoRowId){
    for(let i = 0; i < rows.length; i++){
        rows[i].style.display = "none";
    }
    document.getElementById(expandImgId).src = expandImgPath;
    document.getElementById(lastMainInfoRowId).style.borderBottom = "0.125rem solid"
        + getComputedStyle(document.documentElement).getPropertyValue("--borders-color");
}

function setClickedExpandImgActionIndexPage(expandImgId, extraInfoRowClass, lastMainInfoRowId, expandImgPath, reduceImgPath){
    let expandImg = document.getElementById(expandImgId);
    expandImg.addEventListener("click", () => {
        let rows = document.getElementsByClassName(extraInfoRowClass);
        setIsExpanded(!isExpanded);
        if(isExpanded){
            for(let i = 0; i < rows.length; i++){
                rows[i].style.display = "table-row";
            }
            document.getElementById(expandImgId).src = reduceImgPath;
            document.getElementById(lastMainInfoRowId).style.borderBottom = "none";
        }
        else{
            reduceAction(rows, expandImgPath, expandImgId, lastMainInfoRowId);
        }
    });
}

function setClickedExpandImgActionHourlyWeatherPage(expandImgId, extraInfoRowClass, lastMainInfoRowId, expandImgPath, reduceImgPath, dayIndex){
    let expandImg = document.getElementById(expandImgId);
    expandImg.addEventListener("click", () => {
        let rows = document.getElementsByClassName(extraInfoRowClass);
        setIsExpanded(!isExpanded);
        if(isExpanded){
            for(let i = 0; i < rows.length; i++){
                if(dayIndex != 0 || i >= getCurrentHourByTimezone(hourlyWeatherData.data.timezone)){
                    rows[i].style.display = "table-row";
                }
            }
            document.getElementById(expandImgId).src = reduceImgPath;
            document.getElementById(lastMainInfoRowId).style.borderBottom = "none";
        }
        else{
            reduceAction(rows, expandImgPath, expandImgId, lastMainInfoRowId);
        }
    });
}

function setClickedMoreInfoImagesActions(moreInfoImgClass, dataInserter){
    let moreInfoImages = document.getElementsByClassName(moreInfoImgClass);
    for(let i = 0; i < moreInfoImages.length; i++){
        moreInfoImages[i].addEventListener("click", (event) => {
            event.stopPropagation();
            dataInserter.fillAsideTable(i);
        });
    }
}

function setClickedMainInfoRowsActionIndexPage(mainInfoRowClass){
    let mainInfoRows = document.getElementsByClassName(mainInfoRowClass);
    for(let i = 0; i < mainInfoRows.length; i++){
        mainInfoRows[i].addEventListener("click", () => {
            let cityLatitude = localStorage.getItem("city-latitude");
            let cityLongitude = localStorage.getItem("city-longitude");
            let cityName = localStorage.getItem("city-name");
            let dayIndex = i;
            let dateObj = new Date(dailyWeatherData.data.daily.time[i]);
            let dayOfWeek = daysOfWeekSelectedLanguage[dateObj.getDay()];
            let dayOfMonth = dateObj.getDate();
            let month = monthsSelectedLanguage[dateObj.getMonth()];
            let sunriseHour = getHour(dailyWeatherData.data.daily.sunrise[i]);
            let sunsetHour = getHour(dailyWeatherData.data.daily.sunset[i]);
            let urlWithParameters = "pages/hourly-weather.html?city-latitude=" + encodeURIComponent(cityLatitude) + "&city-longitude=" + 
                encodeURIComponent(cityLongitude) + "&city-name=" + encodeURIComponent(cityName) + "&day-index=" +
                    encodeURIComponent(dayIndex) + "&day-of-week=" + encodeURIComponent(dayOfWeek) + "&day-of-month=" + 
                        encodeURIComponent(dayOfMonth) + "&month=" + encodeURIComponent(month) + "&sunrise=" + 
                            encodeURIComponent(sunriseHour) + "&sunset=" + encodeURIComponent(sunsetHour);
            window.location.href = urlWithParameters;
            setIsExpanded(false);
        });
    }
}

function setLogosClickedAction(){
    let logosContainer = document.getElementById("logos-container");
    logosContainer.addEventListener("click", () => {
        if(isIndexPage()){
            window.location.href = "index.html";
        }
        else{
            window.location.href = "../index.html";
        }
    });
}

function changeDisplayedDate(shift){
    let url = new URL(window.location.href);
    let cityLatitude = url.searchParams.get("city-latitude");
    let cityLongitude = url.searchParams.get("city-longitude");
    let cityName = url.searchParams.get("city-name");
    let dayIndex = (parseInt(url.searchParams.get("day-index")) + shift).toString();
    let dateObj = new Date(hourlyWeatherData.data.hourly.time[24*dayIndex]);
    let dayOfWeek = daysOfWeekSelectedLanguage[dateObj.getDay()];
    let dayOfMonth = dateObj.getDate();
    let month = monthsSelectedLanguage[dateObj.getMonth()];
    let sunrise = url.searchParams.get("sunrise");
    let sunset = url.searchParams.get("sunset");
    let urlWithParameters = "hourly-weather.html?city-latitude=" + encodeURIComponent(cityLatitude) + "&city-longitude=" + 
        encodeURIComponent(cityLongitude) + "&city-name=" + encodeURIComponent(cityName) + "&day-index=" +
            encodeURIComponent(dayIndex) + "&day-of-week=" + encodeURIComponent(dayOfWeek) + "&day-of-month=" + 
                encodeURIComponent(dayOfMonth) + "&month=" + encodeURIComponent(month) + "&sunrise=" + 
                    encodeURIComponent(sunrise) + "&sunset=" + encodeURIComponent(sunset);
    window.location.href = urlWithParameters;
    setIsExpanded(false);
}

function setMinusButtonAction(){
    let button = document.getElementById("minus-button");
    button.addEventListener("click", () => {
        if(dayIndex > 0){
            changeDisplayedDate(-1);
        }
    });
}

function setPlusButtonAction(){
    let button = document.getElementById("plus-button");
    button.addEventListener("click", () => {
        if(dayIndex < 15){
            changeDisplayedDate(1);
        }
    });
}

function setClickedSettingsImgAction(){
    let settingImg = document.getElementById("settings-img");
    let settingsContainer = document.getElementById("settings-container");
    settingImg.addEventListener("click", () => {
        if(settingsContainer.style.display != "block"){
            settingsContainer.style.display = "block";
        }
        else{
            settingsContainer.style.display = "none";
        }
    });
}

function setClickedSaveSettingButtonAction(){
    let saveButton = document.getElementById("save-settings-button");
    saveButton.addEventListener("click", () => {
        let tempUnitSelection = document.getElementById("temperature-unit-selection");
        let windSpeedUnitSelection = document.getElementById("wind-speed-unit-selection");
        let precipitationsUnitSelection = document.getElementById("precipitations-unit-selection");
        let flagSelected = document.getElementsByClassName("selected-language");
        localStorage.setItem("language", flagSelected[0].getAttribute("data-lang"));
        localStorage.setItem("temperature-unit", tempUnitSelection.options[tempUnitSelection.selectedIndex].value);
        localStorage.setItem("wind-speed-unit", windSpeedUnitSelection.options[windSpeedUnitSelection.selectedIndex].value);
        localStorage.setItem("precipitations-unit", precipitationsUnitSelection.options[precipitationsUnitSelection.selectedIndex].value);
        if(isIndexPage()){
            window.location.href = "index.html";
        }
        else{
            window.location.href = "../index.html";
        }
    });
}

function setClickedFlagsImgAction(){
    let itaFlag = document.getElementById("ita-flag");
    itaFlag.addEventListener("click", () => {
        document.getElementById("ita-flag").classList.add("selected-language");
        document.getElementById("uk-flag").classList.remove("selected-language");
    });

    let ukFlag = document.getElementById("uk-flag");
    ukFlag.addEventListener("click", () => {
        document.getElementById("uk-flag").classList.add("selected-language");
        document.getElementById("ita-flag").classList.remove("selected-language");
    });
}

export function addElementsEventListenersAndSetActionsIndexPage(){
    setClickedExpandImgActionIndexPage("expand-img", "extra-info-row", "last-main-info-row", "images/expand-arrows.svg", "images/reduce-arrows.svg");
    setClickedMoreInfoImagesActions("more-info-img", dailyWeatherDataInserter);
    setClickedMainInfoRowsActionIndexPage("main-info-row");
    setLogosClickedAction();
    setClickedSettingsImgAction();
    setClickedSaveSettingButtonAction();
    setClickedFlagsImgAction();
}

export function addElementsEventListenersAndSetActionsHourlyWeatherPage(dayIndex){
    setClickedExpandImgActionHourlyWeatherPage("expand-img-hw", "extra-info-row-hw", "last-main-info-row-hw", "../images/expand-arrows.svg", "../images/reduce-arrows.svg", dayIndex);
    setClickedMoreInfoImagesActions("more-info-img-hw", hourlyWeatherDataInserter);
    setLogosClickedAction();
    setMinusButtonAction();
    setPlusButtonAction();
    setClickedSettingsImgAction();
    setClickedSaveSettingButtonAction();
    setClickedFlagsImgAction();
}