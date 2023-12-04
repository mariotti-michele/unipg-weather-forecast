export const MOBILE_BREAKPOINT = 768;
export const LARGE_SCREEN_BREAKPOINT = 1025;
export const DAYS_OF_WEEK_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAYS_OF_WEEK_IT = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
export const MONTHS_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
export const WEATHER_ICONS_WITH_SUN_AND_MOON = [0, 1, 2, 80, 81, 82, 85, 86];
export const WEATHER_DESCRIPTIONS = {
    0: { en: "clear sky", it: "cielo sereno" },
    1: { en: "mainly clear", it: "prevalentemente sereno" },
    2: { en: "partly cloudy", it: "parzialmente nuvoloso" },
    3: { en: "overcast", it: "coperto" },
    45: { en: "fog", it: "nebbia" },
    48: { en: "fog", it: "nebbia" },
    51: { en: "light drizzle", it: "pioviggine debole" },
    53: { en: "moderate drizzle", it: "pioviggine moderata" },
    55: { en: "dense drizzle", it: "pioviggine intensa" },
    56: { en: "light freezing drizzle", it: "pioviggine ghiacciata debole" },
    57: { en: "dense freezing drizzle", it: "pioviggine ghiacciata intensa" },
    61: { en: "light rain", it: "pioggia debole" },
    63: { en: "moderate rain", it: "pioggia moderata" },
    65: { en: "heavy rain", it: "pioggia intensa" },
    66: { en: "light freezing rain", it: "pioggia debole ghiacciata" },
    67: { en: "heavy freezing rain", it: "pioggia intensa ghiacciata" },
    71: { en: "light snow fall", it: "neve debole" },
    73: { en: "moderate snow fall", it: "neve moderata" },
    75: { en: "heavy snow fall", it: "neve intensa" },
    77: { en: "snow grains", it: "nevischio" },
    80: { en: "light rain showers", it: "rovesci di pioggia leggeri" },
    81: { en: "moderate rain showers", it: "rovesci di pioggia moderati" },
    82: { en: "violent rain showers", it: "rovesci di pioggia violenti" },
    85: { en: "light snow showers", it: "rovesci di neve leggeri" },
    86: { en: "heavy snow showers", it: "rovesci di neve intensi" },
    95: { en: "thunderstorm", it: "temporale" },
    96: { en: "thunderstorm with light hail", it: "temporale con grandine debole" },
    99: { en: "thunderstorm with heavy hail", it: "temporale con grandine intensa" }
  };
export let isWidthLowerThanMobileBreakpoint;
export let isWidthLowerThanLargeScreenBreakpoint;
export let isExpanded = false;

export function setIsWidthLowerThanMobileBreakpoint(boolean){
  isWidthLowerThanMobileBreakpoint = boolean;
}

export function setIsWidthLowerThanLargeScreenBreakpoint(boolean){
  isWidthLowerThanLargeScreenBreakpoint = boolean;
}

export function setIsExpanded(boolean){
  isExpanded = boolean;
}