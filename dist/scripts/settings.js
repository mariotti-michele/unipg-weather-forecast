import { DAYS_OF_WEEK_EN, MONTHS_EN, DAYS_OF_WEEK_IT, MONTHS_IT } 
    from "./constantsAndMultipurposeVariables.js";

export let daysOfWeekSelectedLanguage;
export let monthsSelectedLanguage;

export function setLanguage(){
    if(localStorage.getItem("language") == "it"){
        document.documentElement.lang = "it";
        document.getElementById("ita-flag").classList.add("selected-language");
        daysOfWeekSelectedLanguage = DAYS_OF_WEEK_IT;
        monthsSelectedLanguage = MONTHS_IT;
    }
    else if(localStorage.getItem("language") == "en"){
        document.documentElement.lang = "en";
        document.getElementById("uk-flag").classList.add("selected-language");
        daysOfWeekSelectedLanguage = DAYS_OF_WEEK_EN;
        monthsSelectedLanguage = MONTHS_EN;
    }
    else{
        localStorage.setItem("language", "it");
        document.documentElement.lang = "it";
        document.getElementById("ita-flag").classList.add("selected-language");
        daysOfWeekSelectedLanguage = DAYS_OF_WEEK_IT;
        monthsSelectedLanguage = MONTHS_IT;
    }
}

export function setDefaultSettings(){
    if(localStorage.getItem("temperature-unit") == null){
        localStorage.setItem("temperature-unit", "celsius");
    }
    if(localStorage.getItem("wind-speed-unit") == null){
        localStorage.setItem("wind-speed-unit", "kmh");
    }
    if(localStorage.getItem("precipitations-unit") == null){
        localStorage.setItem("precipitations-unit", "mm"); 
    }
}