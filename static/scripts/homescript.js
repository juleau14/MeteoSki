const displayer = document.querySelector(".displayer");
const globalWeather = document.querySelector(".global_weather_div");
const searchBar = document.querySelector(".search_bar");
const proposedList = document.querySelector(".proposed_list");
const proposedStations = document.querySelectorAll(".proposed_station");

var weatherIsHidden = true;


searchBar.blur(function() {
    proposedList.style.display = "none";
});


displayer.addEventListener("click", function() {
    if (!weatherIsHidden) { // si ce n'est pas caché
        globalWeather.style.marginTop = "-40vh";
        globalWeather.style.backdropFilter = "none";
        weatherIsHidden = true;
        displayer.innerHTML = "Météo du jour";
    }

    else {
        globalWeather.style.marginTop = "10vh";
        globalWeather.style.display = "flex";

        globalWeather.style.backdropFilter = "blur(10px)";
        weatherIsHidden = false;
        displayer.innerHTML = "Cacher";
    }
});


searchBar.addEventListener("input", function() {        // a chaque fois qu'on entre un car dans la barre de recherche
    if (searchBar.value != "") {
        proposedList.style.display = "flex";
        proposedList.style.flexDirection = "column";

        for (let i = 0; i < proposedStations.length; i++) {         // on parcourt la liste des stations proposées
            let stationName = proposedStations[i].innerHTML;
            let search = searchBar.value;
            let displayable = true;                         // indique si cette station est affichable 
            for (let j = 0; j < search.length; j++) {        // pour chaque car de la recherche    
                if (!stationName.includes(search[j].toUpperCase()) && !stationName.includes(search[j].toLowerCase())) {     // si l'un des char de la recherche n'est pas dans le nom
                    console.log(search[j]+ ' nest pas dans '+stationName);
                    if (search[j] != ' '){                  // si le car dans la barre de recherche n'est pas un espace (cela permet de remplacer les '-' par des espaces par exemple)
                    displayable = false;                    // on indique que le nom n'est pas affichable 
                    }
                }
            }
            if (displayable) {      // une fois sortis de la boucle on regarde si le nom est affichable 
                proposedStations[i].style.display = "flex";  // si oui on affiche le nom
            }
            else {
                proposedStations[i].style.display = "none";
            }
        }

    }

    else {
        proposedList.style.display = "none";
    }

});


searchBar.addEventListener("focus", function() {
    if (searchBar.value != "") {
        proposedList.style.display = "flex";
        proposedList.style.flexDirection = "column";
    }
})


searchBar.addEventListener("focusout", function() {
    if (!proposedList.matches(':hover')){           // si la souris n'est pas sur un élément de la liste proposée 
        proposedList.style.display = "none";        // on cache la liste
    }
});


for (let i = 0; i < proposedStations.length; i++) {
    proposedStations[i].addEventListener("click", function() {
        searchBar.value = proposedStations[i].innerHTML;
        console.log('caca')
    });
};
