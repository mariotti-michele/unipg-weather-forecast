export function getHour(data){
    let date = new Date(data);
    let hour = date.getHours();
    return hour;
}

export function getCurrentHourByTimezone(timezone){
    let now = new Date();
    let options = {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false
    };
    let currentHour = now.toLocaleTimeString('en-US', options);
    return parseInt(currentHour) % 24;
}

export function getCardinalPoint(degrees){
    if (degrees >= 0 && degrees < 22.5){
        return "N";
    } 
    else if (degrees >= 22.5 && degrees < 67.5){
        return "NE";
    } 
    else if (degrees >= 67.5 && degrees < 112.5){
        return "E";
    } 
    else if (degrees >= 112.5 && degrees < 157.5){
        return "SE";
    } 
    else if (degrees >= 157.5 && degrees < 202.5){
        return "S";
    } 
    else if (degrees >= 202.5 && degrees < 247.5){
        return "SW";
    } 
    else if (degrees >= 247.5 && degrees < 292.5){
        return "W";
    } 
    else if (degrees >= 292.5 && degrees < 337.5){
        return "NW";
    } 
    else {
        return "N";
    }
}

export function setMainContainerHeight(mainId, mainContainerId) {
    let heightMainContainer = document.getElementById(mainId).clientHeight;
    document.getElementById(mainContainerId).style.height = heightMainContainer + "px";
}