$(document).ready(function() {

let btnEl = document.querySelector(".button");
let listieEl = document.querySelector(".listie");
// let filler = userInput;
// let city = "seattle"

// let  = 
function searchWeather() {

    let city = "seattle";
   
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bb70df7726fdccc57ce65df7344701bc";
    
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=bb70df7726fdccc57ce65df7344701bc";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        // console.log(response.city.coord.lat);
        // console.log(response.city.coord.lon);    
        let latie = parseInt(response.coord.lat);
        let longie = parseInt(response.coord.lon);
        console.log(latie);
        console.log(longie);
        // Changes search result into name populated in the city list
        newCity = response.name;
        let tRow = $("<div>" + newCity +"<div>");
        
        // Pulls information from ajax call to populate fields onto index.html
        $(".listie").append(tRow);
        $(".city-name").text(newCity);
        $(".temp").html("Currently:  " + response.main.temp + " &#8457;");
        $(".humidity").html("Humidity:  " + response.main.humidity + " %");
        $(".windspeed").html("Wind Speed:  " + response.wind.speed + " MPH");
        
        let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latie + "&lon=" + longie + "&appid=bb70df7726fdccc57ce65df7344701bc";
        $.ajax({
                
              url: uvUrl,
              method: "GET"
            }).then(function(response) {
              console.log(response.value);
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
        console.log(response);
        console.log(response.list[1].main.temp);
        console.log(response.list[5].main.temp);
        console.log(response.list[0].main.humidity);
        console.log(response.list[0].wind.speed);
    })
};
;

searchWeather();
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