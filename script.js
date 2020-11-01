$(document).ready(function() {

let btnEl = document.querySelector(".button");
let listieEl = document.querySelector(".listie");
// let filler = userInput;
// let city = "seattle"

// let  = 
function searchWeather() {

    let city = "seattle";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bb70df7726fdccc57ce65df7344701bc";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // 
        //     
        //       createRow(response);
    })
};
//  });
// $(".table tbody").append(rowEl);
// });

searchWeather();
// $.ajax({
//   url: "https://api.openweathermap.org/data/2.5/uvi?lat= + "seattle" + &appid=bb70df7726fdccc57ce65df7344701bc"
//   ,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });


// btnEl.$("onclick", function(event) {
//     event.preventDefault();
//     if(event.target.matches("button")) {
//       var item = document.createElement("div");
//       item.textContent = listieEl[event.text];
//       listieEl.append(item);
//     }
//   });
})