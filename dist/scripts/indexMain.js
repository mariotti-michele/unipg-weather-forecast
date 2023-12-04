import { setLanguage, setDefaultSettings } from "./settings.js";
import { geoData } from "./model/geocodingData.js";
import { dailyWeatherData } from "./model/dailyWeatherData.js";
import { addElementsEventListenersAndSetActionsIndexPage } from "./controller/elementsEventListenersAndActions.js";
import { addDocumentAndWindowEventListenersAndSetActionsIndexPage } from "./controller/documentAndWindowEventListenersAndActions.js";
import { addSearchBarEventListenersAndSetActions } from "./controller/searchBarEventListenersAndActions.js";

setLanguage();
setDefaultSettings();
geoData.setDefaultCityNameAndCoordinates();
dailyWeatherData.fetchWeatherData();
addElementsEventListenersAndSetActionsIndexPage();
addDocumentAndWindowEventListenersAndSetActionsIndexPage();
addSearchBarEventListenersAndSetActions();