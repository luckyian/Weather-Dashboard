let btnEl = document.querySelector(".button");
let listieEl = document.querySelector(".listie");
let filler = userInput


// $.ajax({
//   url: "https://api.openweathermap.org/data/2.5/weather?q= + filler + &appid=bb70df7726fdccc57ce65df7344701bc"
//   ,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

// $.ajax({
//   url: "https://api.openweathermap.org/data/2.5/uvi?lat= + filler + &appid=bb70df7726fdccc57ce65df7344701bc"
//   ,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });


// btnEl.addEventListener("click", function(event) {
//     event.preventDefault();
//     if(event.target.matches("button")) {
//       var item = document.createElement("div");
//       item.textContent = listieEl[event.target.parentElement.id];
//       listieEl.append(item);
//     }
//   });