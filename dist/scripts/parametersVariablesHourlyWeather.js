export let cityLatitude;
export let cityLongitude;
export let cityName;
export let dayIndex;
export let dayOfWeek;
export let dayOfMonth;
export let month;
export let sunrise;
export let sunset;

export function setParametersVariables(){
    let url = new URL(window.location.href);
    cityLatitude = url.searchParams.get("city-latitude");
    cityLongitude = url.searchParams.get("city-longitude");
    cityName = url.searchParams.get("city-name");
    dayIndex = url.searchParams.get("day-index");
    dayOfWeek = url.searchParams.get("day-of-week");
    dayOfMonth = url.searchParams.get("day-of-month");
    month = url.searchParams.get("month");
    sunrise = url.searchParams.get("sunrise");
    sunset = url.searchParams.get("sunset");
}