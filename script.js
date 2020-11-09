$(document).ready(function() {

let btnEl = document.querySelector(".button");
let listieEl = document.querySelector(".listie");
let cityArr =  JSON.parse(localStorage.getItem("city-list")) || [];

function cityList(){
let tRow = $("<div class = cityList>" + cityArr +"</div>");
$(".listie").append(tRow);
};
cityList();

let currentCity = localStorage.getItem("currentCity") || "";
localStorage.getItem("currentCity", currentCity);
console.log(currentCity);
searchWeather(currentCity);

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ' ' + year;
    return time;
  }


$("#search-button").on("click", function(event) {
    event.preventDefault();
    let input = $("#form-input").val();

    searchWeather(input);
    console.log(input);
});

// $("#city-button").on("click", function(event) {
//     event.preventDefault();
//     let input = $("#form-input").val();

//     searchWeather(input);
//     console.log(input);
// });
function searchWeather(city) {
    let currentCity = city;
    localStorage.setItem("currentCity", currentCity);

    // let city = "seattle";
    // console.log(city);
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bb70df7726fdccc57ce65df7344701bc";
    
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=bb70df7726fdccc57ce65df7344701bc";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // console.log(response.main.temp);
        // console.log(response.main.humidity);
        // console.log(response.wind.speed);
        // console.log(response.city.coord.lat);
        // console.log(response.city.coord.lon);    
        let latie = parseInt(response.coord.lat);
        let longie = parseInt(response.coord.lon);
        // console.log(response.weather[0].icon);
        // console.log(longie);
        // Changes search result into name populated in the city list
        newCity = response.name;
        let date = timeConverter(response.dt);
        cityArr.push(newCity);
        localStorage.setItem("city-list", JSON.stringify(cityArr));
        console.log(cityArr);
        // cityList();

        
        
        let icon ="https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $(".iconie").attr("href", icon);
        // Pulls information from ajax call to populate fields onto index.html
        $(".date").html(date);
        $(".city-name").text(newCity);
        $(".temp").html("Currently:  " + response.main.temp + " &#8457;");
        $(".humidity").html("Humidity:  " + response.main.humidity + " %");
        $(".windspeed").html("Wind Speed:  " + response.wind.speed + " MPH");
        
        let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latie + "&lon=" + longie + "&appid=bb70df7726fdccc57ce65df7344701bc";
        $.ajax({
                
              url: uvUrl,
              method: "GET"
            }).then(function(response) {
            //   console.log(response.value);
              $(".uv").html("UV Index: " + response.value);
              if(response.value <= 3) {
                  $(".uv").addClass("good");
              }
              else if(response.value <= 5) {
                $(".uv").addClass("moderate");
              }
              else if(response.value <= 9) {
                $(".uv").addClass("high");
              }
              else {
                  $(".uv").addClass("severe");
              }
            })
        
        
           
        

    })
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        // console.log(response.list[1].main.temp);
        // console.log(response.list[5].main.temp);
        // console.log(response.list[0].main.humidity);
        // console.log(response.list[0].wind.speed);
        newCity = response.city.name;
        
        $(".city-nameO").text(newCity);
        $(".tempO9").html("9am: " + response.list[1].main.temp + " &#8457;");
        $(".tempO6").html("6pm: " + response.list[5].main.temp + " &#8457;");
        $(".humidityO").html("Humidity: " + response.list[0].main.humidity + " %");
        $(".windspeedO").html("Wind Speed: " + response.list[0].wind.speed + "mph");
        
        $(".city-nameT").text(newCity);
        $(".tempT9").html("9am: " + response.list[9].main.temp + " &#8457;");
        $(".tempT6").html("6pm: " + response.list[13].main.temp + " &#8457;");
        $(".humidityT").html("Humidity:" + response.list[8].main.humidity + " %");
        $(".windspeedT").html("Wind Speed: " + response.list[8].wind.speed + "mph");

        $(".city-nameH").text(newCity);
        $(".tempH9").html("9am: " + response.list[17].main.temp + " &#8457;");
        $(".tempH6").html("6pm: " + response.list[21].main.temp + " &#8457;");
        $(".humidityH").html("Humidity: " + response.list[16].main.humidity + " %");
        $(".windspeedH").html("Wind Speed: " + response.list[16].wind.speed + "mph");

        $(".city-nameF").text(newCity);
        $(".tempF9").html("9am: " + response.list[25].main.temp + " &#8457;");
        $(".tempF6").html("6pm: " + response.list[29].main.temp + " &#8457;");
        $(".humidityF").html("Humidity: " + response.list[24].main.humidity + " %");
        $(".windspeedF").html("Wind Speed: " + response.list[24].wind.speed + "mph");

        $(".city-nameI").text(newCity);
        $(".tempI9").html("9am: " + response.list[33].main.temp + " &#8457;");
        $(".tempI6").html("6pm: " + response.list[37].main.temp + " &#8457;");
        $(".humidityI").html("Humidity: " + response.list[32].main.humidity + " %");
        $(".windspeedI").html("Wind Speed: " + response.list[32].wind.speed + "mph");
    })
};
;


// 


// btnEl.$("onclick", function(event) {
//     event.preventDefault();
//     if(event.target.matches("button")) {
//       var item = document.createElement("div");
//       item.textContent = listieEl[event.text];
//       listieEl.append(item);
//     }
//   });
})