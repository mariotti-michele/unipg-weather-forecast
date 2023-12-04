import { displaySuggestions } from "../view/searchBarView.js";

export let geoData = {
    data: null,
    setDefaultCityNameAndCoordinates: function(){
        if(!localStorage.getItem("city-name")){
            localStorage.setItem("city-name", "Perugia");
            localStorage.setItem("city-latitude", 43.1122);
            localStorage.setItem("city-longitude", 12.38878);
        }
    },
    fetchGeocodingDataAndDisplaySuggestions: function(inputValue, numberOfResults, suggestionsContainer, suggestionsList){
        fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" + inputValue + "&count=" + numberOfResults 
                + "&language=" + localStorage.getItem("language") + "&format=json"
        )
            .then((response) => {
                if (!response.ok){
                    alert("geocoding error");
                    throw new Error("geocoding fetching error");
                }
                return response.json();
            })
            .then((data) => {
                this.data = data;
                displaySuggestions(data.results, inputValue, suggestionsContainer, suggestionsList);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to fetch geocoding data. Please check your connection and try again later.");
            });
    }
};