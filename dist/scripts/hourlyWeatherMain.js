import { setLanguage, setDefaultSettings } from "./settings.js";
import { addElementsEventListenersAndSetActionsHourlyWeatherPage } from "./controller/elementsEventListenersAndActions.js";
import { addDocumentAndWindowEventListenersAndSetActionsHourlyWeatherPage } from "./controller/documentAndWindowEventListenersAndActions.js";
import { addSearchBarEventListenersAndSetActions } from "./controller/searchBarEventListenersAndActions.js";
import { hourlyWeatherData } from "./model/hourlyWeatherData.js";
import { dayIndex, setParametersVariables } from "./parametersVariablesHourlyWeather.js";

setParametersVariables();
setLanguage();
setDefaultSettings();
hourlyWeatherData.fetchWeatherData();
addElementsEventListenersAndSetActionsHourlyWeatherPage(dayIndex);
addDocumentAndWindowEventListenersAndSetActionsHourlyWeatherPage();
addSearchBarEventListenersAndSetActions();