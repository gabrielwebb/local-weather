window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/64cffb22b137bc61929b9c4637cc3fcf/${lat},${long}`


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //Set DOM elements from API

                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;


                    //formula for c 

                    let celsius = (temperature - 32) * (5 / 9)


                    ///Set icon
                    setIcons(icon, document.querySelector('.icon'));


                    /// Change Tempt C or F
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    })



                })

        });




    } else {
        h1.textContent = "hey if you want the weather you're gonna have to enable your location."
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });


        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});