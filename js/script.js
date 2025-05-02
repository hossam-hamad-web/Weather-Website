
let temprature = document.querySelector(".temp p ");
let city = document.querySelector(".city");
let time_date = document.querySelector(".time_date");
let cond = document.querySelector(".cond p");
let search = document.querySelector(".search");
let form = document.querySelector("form");

let date = new Date();


form.addEventListener('submit', (e) => {

    e.preventDefault();
    let newCity = search.value.trim();

    if (newCity == "") return;

    fetch(`http://api.weatherapi.com/v1/current.json?key=b20c8fabc51642d7bb9123847250105&q=${newCity}&aqi=no`)
        .then(res => res.json())

        .then(data => {

            temprature.textContent = "+" + data.current.temp_c + "°C";
            city.textContent = data.location.name + " , " + data.location.country;
            time_date.textContent = data.location.localtime;
            cond.textContent = data.current.condition.text;
        })
        .catch(err => {
            console.log(err);
            city.textContent = "⚠️ لم يتم العثور على المدينة";
        });
})

// to udatetime each 1s
function updateClock() {
    let date = new Date();

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // الساعة 0 تبقى 12

    let formattedTime =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, '0') + "-" +
        String(date.getDate()).padStart(2, '0') + "\n" +
        String(hours).padStart(2, '0') + ":" + minutes + ":" + seconds + " " + ampm;

    time_date.textContent = formattedTime;
}

setInterval(updateClock, 1000); // this function call a callback function every 1s to update time and date data