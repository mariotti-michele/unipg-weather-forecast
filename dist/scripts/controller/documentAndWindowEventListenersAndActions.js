import { isIndexPage } from "./controllerTools.js";
import { dailyWeatherDataInserter } from "../view/dailyWeatherDataEntry.js";
import { hourlyWeatherDataInserter } from "../view/hourlyWeatherDataEntry.js";
import { MOBILE_BREAKPOINT, LARGE_SCREEN_BREAKPOINT, isWidthLowerThanMobileBreakpoint, isWidthLowerThanLargeScreenBreakpoint, 
    isExpanded, setIsWidthLowerThanMobileBreakpoint, setIsWidthLowerThanLargeScreenBreakpoint, setIsExpanded } 
        from "../constantsAndMultipurposeVariables.js";
import { setMainContainerHeight } from "../view/viewTools.js";

function checkWidthThanBreakpoints(){
    if(window.innerWidth < MOBILE_BREAKPOINT){
        setIsWidthLowerThanMobileBreakpoint(true);
    }
    else{
        setIsWidthLowerThanMobileBreakpoint(false);
    }

    if(window.innerWidth < LARGE_SCREEN_BREAKPOINT){
        setIsWidthLowerThanLargeScreenBreakpoint(true);
    }
    else{
        setIsWidthLowerThanLargeScreenBreakpoint(false);
    }
}

function setPageLoadedActions(mainId, mainContainerId){
    document.addEventListener("DOMContentLoaded", () => {
        setMainContainerHeight(mainId, mainContainerId);
        checkWidthThanBreakpoints();
    });
}

function hideExtraInfoRows(extraInfoRowClass, expandImgId, expandImgPath, lastMainInfoRowId){
    if(isExpanded && window.innerWidth >= LARGE_SCREEN_BREAKPOINT){
        let rows = document.getElementsByClassName(extraInfoRowClass);
        for(let i = 0; i < rows.length; i++){
            rows[i].style.display = "none";
        }
        document.getElementById(expandImgId).src = expandImgPath;
        document.getElementById(lastMainInfoRowId).style.borderBottom = "0.125rem solid"
        + getComputedStyle(document.documentElement).getPropertyValue("--borders-color");
        setIsExpanded(false);
    }
}

function setResizeChangeSideMobileBreakpointActions(dataInserter){
    if(isWidthLowerThanMobileBreakpoint && window.innerWidth >= MOBILE_BREAKPOINT){
        setIsWidthLowerThanMobileBreakpoint(false);
        if(isIndexPage()){
            dataInserter.fillDateCells();
        }
        else{
            dataInserter.fillDateAndTimezoneContainer();
        }
    }
    else if(!isWidthLowerThanMobileBreakpoint && window.innerWidth < MOBILE_BREAKPOINT){
        setIsWidthLowerThanMobileBreakpoint(true);
        if(isIndexPage()){
            dataInserter.fillDateCells();
        }
        else{
            dataInserter.fillDateAndTimezoneContainer();
        }
    }
}

function setResizeChangeSideLargeScreenBreakpointActions(dataInserter){
    if(isWidthLowerThanLargeScreenBreakpoint && window.innerWidth >= LARGE_SCREEN_BREAKPOINT){
        setIsWidthLowerThanLargeScreenBreakpoint(false);
        dataInserter.fillCurrentWeather();
    }
    else if(!isWidthLowerThanLargeScreenBreakpoint && window.innerWidth < LARGE_SCREEN_BREAKPOINT){
        setIsWidthLowerThanLargeScreenBreakpoint(true);
        dataInserter.fillCurrentWeather();
    }
}

function setResizingActions(mainId, mainContainerId, extraInfoRowClass, expandImgId, expandImgPath, lastMainInfoRowId, dataInserter){
    window.addEventListener("resize", () => {
        hideExtraInfoRows(extraInfoRowClass, expandImgId, expandImgPath, lastMainInfoRowId);
        setMainContainerHeight(mainId, mainContainerId);
        setResizeChangeSideMobileBreakpointActions(dataInserter);
        setResizeChangeSideLargeScreenBreakpointActions(dataInserter);
    });
}

export function addDocumentAndWindowEventListenersAndSetActionsIndexPage(){
    setPageLoadedActions("main-container", "index-main");
    setResizingActions("main-container", "index-main", "extra-info-row", "expand-img", "images/expand-arrows.svg", 
        "last-main-info-row", dailyWeatherDataInserter);
}

export function addDocumentAndWindowEventListenersAndSetActionsHourlyWeatherPage(){
    setPageLoadedActions("main-container-hw", "hourly-weather-main");
    setResizingActions("main-container-hw", "hourly-weather-main", "extra-info-row-hw", "expand-img-hw", 
        "../images/expand-arrows.svg", "last-main-info-row-hw", hourlyWeatherDataInserter);
}