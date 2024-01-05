async function search(state) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc7f6e3618d34861abc214936240301&q=${state}&days=3`);
    let result = await response.json();
    displayCurrent(result.location, result.current);
    displayNextDays(result.forecast.forecastday);
    // console.log(result.forecast.forecastday);
    // console.log(result.current.last_updated);

}
document.getElementById("search").addEventListener("keyup", function (eventInfo) {
    search(eventInfo.target.value)
});
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(state, current) {
    if (current) {
        let date = new Date(current.last_updated);
        // console.log(date.getDay())
        let cartona = `
            <div class="col-md-4">
                    <div class="today forecast text-start h-100 ">
                        <div class="forecast-header d-flex justify-content-between" id="today">
                            <div class="">${days[date.getDay()]}</div>
                            <div class=" ">${date.getDate() + monthNames[date.getMonth()]}</div>
                        </div>
                        <div class="forecast-content p-5" id="current">
                            <div class="location">${state.name}</div>
                            <div class="degree d-flex justify-content-center align-items-center">
                                <div >${current.temp_c}<sup>o </sup>C</div>
                                <div class="forecast-icon">
                                    <img src="https:${current.condition.icon}" alt="" width="120">
                                </div>
                            </div>
                            <div class="text-info">${current.condition.text}</div>
                            <span class="me-2"><img src="./images/icon-umberella.png" alt="">20%</span>
                            <span class="me-2"><img src="./images/icon-wind.png" alt="">18km/h</span>
                            <span class="me-2"><img src="./images/icon-compass.png" alt="">East</span>
                        </div>
                    </div>
                </div> 
                                          `;
        document.getElementById("forecast").innerHTML = cartona
    }
}
function displayNextDays(arr) {
    let cartona = "";
    for (let i = 1; i < arr.length; i++)
        cartona += `
            <div class="col-md-4">
                <div class="forecast h-100 ">
                    <div class="forecast-header">
                        <div >${days[new Date(arr[i].date).getDay()]}</div>
                        </div>
                        <div class="forecast-content p-5">
                            <div class="forecast-icon">
                                <img src="https:${arr[i].day.condition.icon}" alt="" width="100">
                            </div>
                            <div class="fs-2">${arr[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <p class="fs-1">${arr[i].day.mintemp_c}<sup>o</sup></p>
                            <div class="text-info ">${arr[i].day.condition.text}</div>
                        </div>
                    </div>
                </div>                                
                                        `;
    document.getElementById("forecast").innerHTML += cartona
}
search("cairo");
