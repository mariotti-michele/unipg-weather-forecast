import { dailyWeatherData } from "../model/dailyWeatherData.js"
import { isIndexPage } from "../controller/controllerTools.js";
import { geoData } from "../model/geocodingData.js";
import { highlightSelectedElement } from "../view/searchBarView.js";
import { selectedItemIndex, setSelectedItemIndex } from "../view/searchBarView.js";

function setSelectedSuggestion(element, searchInput, suggestionsContainer){
    searchInput.value = "";
    suggestionsContainer.style.display = "none";
    localStorage.setItem("city-name", element.textContent.split("(")[0].trim());
    localStorage.setItem("city-latitude", element.getAttribute("latitude"));
    localStorage.setItem("city-longitude", element.getAttribute("longitude"));
}

function enterPressedAndButtonClickedAction(items, selectedItemIndex, searchInput, suggestionsContainer){
    if(isIndexPage()){
        setSelectedSuggestion(items[selectedItemIndex], searchInput, suggestionsContainer);
        dailyWeatherData.fetchWeatherData();
    }
    else{
        setSelectedSuggestion(items[selectedItemIndex], searchInput, suggestionsContainer);
        window.location.href = "../index.html";
    }
}

function clickedSuggestionAction(e, searchInput, suggestionsContainer){
    searchInput.value = "";
    suggestionsContainer.style.display = "none";
    localStorage.setItem("city-name", e.target.textContent.split("(")[0].trim());
    localStorage.setItem("city-latitude", e.target.getAttribute("latitude"));
    localStorage.setItem("city-longitude", e.target.getAttribute("longitude"));
}

function setSearchBarInputAction(){
    let searchInput = document.getElementById("search-input");
    let suggestionsContainer = document.getElementById("search-suggestions-container");
    let suggestionsList = document.getElementById("suggestions-list");

    searchInput.addEventListener("input", () => {
        geoData.fetchGeocodingDataAndDisplaySuggestions(searchInput.value.trim(), 10, suggestionsContainer, suggestionsList);
    });

    suggestionsList.addEventListener("click", (e) => {
        if(e.target.tagName == "LI"){
            clickedSuggestionAction(e, searchInput, suggestionsContainer);
            if(isIndexPage()){
                dailyWeatherData.fetchWeatherData();
            }
            else{
                window.location.href = "../index.html";
            }
        }
    });
}

function setClickedSearchButtonAction(){
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-input");
    let suggestionsContainer = document.getElementById("search-suggestions-container");
    let elementList = document.getElementById("suggestions-list");
    let items = elementList.getElementsByTagName("li");
    searchButton.addEventListener("click", () => {
        enterPressedAndButtonClickedAction(items, selectedItemIndex, searchInput, suggestionsContainer);
    });
}

function setSuggestionsKeyboardNavigation(){
    let searchInput = document.getElementById("search-input");
    let suggestionsContainer = document.getElementById("search-suggestions-container");
    let elementList = document.getElementById("suggestions-list");
    let items = elementList.getElementsByTagName("li");
    
    document.addEventListener("keydown", (event) => {
        if(event.key == "ArrowUp" && selectedItemIndex > 0){
            event.preventDefault();
            setSelectedItemIndex(selectedItemIndex - 1);
            items[selectedItemIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
        } 
        else if(event.key == "ArrowDown" && selectedItemIndex < items.length - 1){
            event.preventDefault();
            setSelectedItemIndex(selectedItemIndex + 1);
            items[selectedItemIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        else if(event.key == "Enter"){
            enterPressedAndButtonClickedAction(items, selectedItemIndex, searchInput, suggestionsContainer);
        }
        else if(event.key == "ArrowUp" && selectedItemIndex == 0){
            event.preventDefault();
        }
        highlightSelectedElement(items);
    });
}

export function addSearchBarEventListenersAndSetActions(){
    setSearchBarInputAction();
    setClickedSearchButtonAction();
    setSuggestionsKeyboardNavigation();
}