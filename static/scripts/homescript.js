const displayer = document.querySelector(".displayer");
const globalWeather = document.querySelector(".global_weather_div");

var weatherIsHidden = false;


displayer.addEventListener("click", function() {
    if (!weatherIsHidden) { // si ce n'est pas caché
        globalWeather.style.marginTop = "-50vh";
        globalWeather.style.backdropFilter = "none";
        weatherIsHidden = true;
        displayer.innerHTML = "Show";
    }

    else {
        globalWeather.style.marginTop = "0";
        globalWeather.style.display = "flex";

        globalWeather.style.backdropFilter = "blur(10px)";
        weatherIsHidden = false;
        displayer.innerHTML = "Hide";
    }
})