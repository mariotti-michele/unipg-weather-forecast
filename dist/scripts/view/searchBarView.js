export let selectedItemIndex = 0;

export function setSelectedItemIndex(index){
    selectedItemIndex = index;
}

export function displaySuggestions(results, inputValue, suggestionsContainer, suggestionsList){
    let suggestions = results;
    suggestionsList.textContent = "";
    if(inputValue.length > 1 && suggestions != null){
        suggestionsContainer.style.display = "block";
        suggestions.forEach((suggestion, index) => {
            let li = document.createElement("li");
            li.textContent = suggestion.name + " (" + suggestion.admin1 + ", " + suggestion.country_code + ")";
            li.setAttribute("latitude", suggestion.latitude);
            li.setAttribute("longitude", suggestion.longitude);
            suggestionsList.appendChild(li);
            if(index == 0){
                li.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--suggestion-selected-color");
                selectedItemIndex = 0;
            }
        });
    } 
    else if(inputValue.length > 1 && suggestions == null){
        let li = document.createElement("li");
        li.textContent = "No locations found";
        suggestionsList.appendChild(li);
    }
    else{
        suggestionsContainer.style.display = "none";
    }
}

export function highlightSelectedElement(items){
    for(let i = 0; i < items.length; i++){
        if (i == selectedItemIndex) {
            items[i].style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--suggestion-selected-color");
        } 
        else {
            items[i].style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
        }
    }
}