$(document).ready(function () {

  // Array to contain searched cities
  let cityArr = JSON.parse(localStorage.getItem("city-list")) || [];

  // Function to create buttons from previously searched cities
  function cityList() {
    cityArr.forEach(function (city) {
      let tRow = $(`<button type="button" class="btn btn-primary city-btn" id="${city}">${city}</button>`);
      $(".listie").append(tRow);

    })

  };
  cityList();

  // Variables to store and display latest city searched
  let currentCity = localStorage.getItem("currentCity") || "";
  localStorage.getItem("currentCity", currentCity);

  searchWeather(currentCity);

  // Function to convert time from unix timestamp to a readable display format
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ' ' + year;
    return time;
  }

  // Event listener for search button
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    let input = $("#form-input").val();

    searchWeather(input);

    $("#form-input").val("");

  });
  // Event listener for buttons created from previous searches
  $(".city-btn").on("click", function (event) {
    event.preventDefault();
    let city = $(this).text();

    searchWeather(city);

  });
  // Function to do ajax call and return search data to populate html file
  function searchWeather(city) {
    let currentCity = city;
    localStorage.setItem("currentCity", currentCity);


    let apiKey = "bb70df7726fdccc57ce65df7344701bc";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      let date = timeConverter(response.dt);
      let latie = parseInt(response.coord.lat);
      let longie = parseInt(response.coord.lon);

      let icon = response.weather[0].icon;
      let iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
      $(".icon").attr({ src: iconURL, alt: "Weather icon." });


      // Changes search result into name populated in the city list and 
      let newCity = response.name;
      if (cityArr.length > 0) {

        //IF city doesn't exist then it returns -1
        if (cityArr.indexOf(newCity) === -1) {
          cityArr.push(newCity);
          window.localStorage.setItem("city-list", JSON.stringify(cityArr));
          let tRow = $(`<button type="button" class="btn btn-primary city-btn" id="${newCity}">${newCity}</button>`);
          $(".listie").append(tRow);
        }


      }

      else {
        cityArr.push(newCity);
        window.localStorage.setItem("city-list", JSON.stringify(cityArr));
        let tRow = $(`<button type="button" class="btn btn-primary city-btn" id="${newCity}">${newCity}</button>`);
        $(".listie").append(tRow);
      }









      // Pulls information from ajax call to populate fields onto index.html
      $(".date").html(date);
      $(".city-name").text(newCity);
      $(".temp").html("Currently:  " + response.main.temp + " &#8457;");
      $(".humidity").html("Humidity:  " + response.main.humidity + " %");
      $(".windspeed").html("Wind Speed:  " + response.wind.speed + " MPH");
      // Ajax call to get uv index information to populate index.html
      let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latie + "&lon=" + longie + "&appid=bb70df7726fdccc57ce65df7344701bc";

      $.ajax({

        url: uvUrl,
        method: "GET"
      }).then(function (response) {
        // Uses uv index response to add classes that change color of the uv index displayed

        $(".uv").html("UV Index: " + response.value);
        if (response.value <= 3) {

          $(".uv").addClass("good");
        }
        else if (response.value <= 5) {
          $(".uv").addClass("moderate");
        }
        else if (response.value <= 9) {
          $(".uv").addClass("high");
        }
        else {
          $(".uv").addClass("severe");
        }
      })





    })
    // Ajax call to get the five day forecast
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function (response) {
      // Populates the html with the five day forecast
      let newCity1 = response.city.name;

      $(".city-nameO").text(newCity1);
      $(".tempO9").html("9am: " + response.list[3].main.temp + " &#8457;");
      $(".tempO6").html("6pm: " + response.list[6].main.temp + " &#8457;");
      $(".humidityO").html("Humidity: " + response.list[4].main.humidity + " %");
      $(".windspeedO").html("Wind Speed: " + response.list[4].wind.speed + "mph");
      $(".dateO").html(timeConverter(response.list[5].dt));
      let iconO = response.list[4].weather[0].icon;
      let iconOURL = "https://openweathermap.org/img/w/" + iconO + ".png";
      $(".icon1").attr({ src: iconOURL, alt: "Weather icon." });

      $(".city-nameT").text(newCity1);
      $(".tempT9").html("9am: " + response.list[11].main.temp + " &#8457;");
      $(".tempT6").html("6pm: " + response.list[14].main.temp + " &#8457;");
      $(".humidityT").html("Humidity:" + response.list[12].main.humidity + " %");
      $(".windspeedT").html("Wind Speed: " + response.list[12].wind.speed + "mph");
      $(".dateT").html(timeConverter(response.list[13].dt));
      let iconT = response.list[12].weather[0].icon;
      let iconTURL = "https://openweathermap.org/img/w/" + iconT + ".png";
      $(".icon2").attr({ src: iconTURL, alt: "Weather icon." });

      $(".city-nameH").text(newCity1);
      $(".tempH9").html("9am: " + response.list[19].main.temp + " &#8457;");
      $(".tempH6").html("6pm: " + response.list[22].main.temp + " &#8457;");
      $(".humidityH").html("Humidity: " + response.list[20].main.humidity + " %");
      $(".windspeedH").html("Wind Speed: " + response.list[20].wind.speed + "mph");
      $(".dateH").html(timeConverter(response.list[21].dt));
      let iconH = response.list[20].weather[0].icon;
      let iconHURL = "https://openweathermap.org/img/w/" + iconH + ".png";
      $(".icon3").attr({ src: iconHURL, alt: "Weather icon." });

      $(".city-nameF").text(newCity1);
      $(".tempF9").html("9am: " + response.list[27].main.temp + " &#8457;");
      $(".tempF6").html("6pm: " + response.list[30].main.temp + " &#8457;");
      $(".humidityF").html("Humidity: " + response.list[28].main.humidity + " %");
      $(".windspeedF").html("Wind Speed: " + response.list[28].wind.speed + "mph");
      $(".dateF").html(timeConverter(response.list[29].dt));
      let iconF = response.list[28].weather[0].icon;
      let iconFURL = "https://openweathermap.org/img/w/" + iconF + ".png";
      $(".icon4").attr({ src: iconFURL, alt: "Weather icon." });

      $(".city-nameI").text(newCity1);
      $(".tempI9").html("9am: " + response.list[35].main.temp + " &#8457;");
      $(".tempI6").html("6pm: " + response.list[38].main.temp + " &#8457;");
      $(".humidityI").html("Humidity: " + response.list[36].main.humidity + " %");
      $(".windspeedI").html("Wind Speed: " + response.list[36].wind.speed + "mph");
      $(".dateI").html(timeConverter(response.list[37].dt));
      let iconI = response.list[36].weather[0].icon;
      let iconIURL = "https://openweathermap.org/img/w/" + iconI + ".png";
      $(".icon5").attr({ src: iconIURL, alt: "Weather icon." });
    })
  };

})