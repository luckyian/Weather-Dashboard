$(document).ready(function() {

let btnEl = document.querySelector(".button");
let listieEl = document.querySelector(".listie");
// let filler = userInput;
// let city = "seattle"

// let  = 
function searchWeather() {

    let city = "seattle";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bb70df7726fdccc57ce65df7344701bc";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        console.log(response.coord.lat);
        console.log(response.coord.lon);    
        let latie = parseInt(response.coord.lat);
        let longie = parseInt(response.coord.lon);
        console.log(latie);
        console.log(longie);
        let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latie + "&lon=" + longie + "&appid=bb70df7726fdccc57ce65df7344701bc";
        $.ajax({
                
              url: uvUrl,
              method: "GET"
            }).then(function(response) {
              console.log(response);
            })
        
        
        
        
        //   createRow(response);
    })
};
//  });
// $(".table tbody").append(rowEl);
// });

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