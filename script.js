let btnEl = document.querySelector(".button");
let filler = userInput


$.ajax({
  url: "https://api.openweathermap.org/data/2.5/weather?q= + filler + &appid=bb70df7726fdccc57ce65df7344701bc"
  ,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

api.openweathermap.org/data/2.5/weather?q= + "" + &appid=bb70df7726fdccc57ce65df7344701bc

api.openweathermap.org/data/2.5/uvi?lat= + "" + &lon= + "" + &appid=bb70df7726fdccc57ce65df7344701bc


btnEl.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("button")) {
      var item = document.createElement("div");
      item.textContent = cities[event.target.parentElement.id];
      citylist.append(item);
    }
  });