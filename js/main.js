let searchInput = document.querySelector('#search')
async function getData(townName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc7f6e3618d34861abc214936240301&q=${townName}&days=3`);
    let result = await response.json();
    return result;
}
document.getElementById("search").addEventListener("keyup", function (eventInfo) {
    getData(eventInfo.target.value)
});
function displayCurrentDay(result) {
    if (result) {
        let todayDate = new Date();
        let cartona = `
                        <div class="forecast-header d-flex justify-content-between">
                            <div class="">${todayDate.toLocaleDateString("en-US", { weekday: 'long' })}</div>
                            <div class=" ">${todayDate.getDate() + todayDate.toLocaleDateString("en-US", { month: 'long' })}</div>
                        </div>
                        <div class="forecast-content p-5" >
                            <div class="location">${result.location.name}</div>
                            <div class="degree d-flex justify-content-center align-items-center">
                                <div >${result.current.temp_c}<sup>o </sup>C</div>
                                <div class="forecast-icon">
                                    <img src="https:${result.current.condition.icon}" alt="" width="120">
                                </div>
                            </div>
                            <div class="text-info mb-3">${result.current.condition.text}</div>
                            <span class="me-3"><img src="./images/icon-umberella.png" alt="" class="me-1">${result.current.humidity}%</span>
                            <span class="me-3"><img src="./images/icon-wind.png" alt="" class="me-1">${result.current.wind_kph}km/h</span>
                            <span class=""><img src="./images/icon-compass.png" alt="" class="me-1">${result.current.wind_dir}</span>
                        </div>
                     
                                          `;
        document.getElementById("toDay").innerHTML = cartona
    }
}
function displayNextDays(result) {
    let forecastData = result.forecast.forecastday;
    let cartona = "";

    for (let i = 1; i < forecastData.length; i++) {
        let nextDate = new Date(forecastData[i].date);
        cartona += `
        <div class="col-md-6 ">
               <div class="forecast h-100  " >
                    <div class="forecast-header ">
                         <div ">${nextDate.toLocaleDateString("en-US", { weekday: 'long' })}</div>
                        </div>
                        <div class="forecast-content p-5">
                            <div class="forecast-icon">
                                <img src="https:${forecastData[i].day.condition.icon}" alt="" width="100">
                            </div>
                            <div class="fs-2">${forecastData[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <p class="fs-1">${forecastData[i].day.mintemp_c}<sup>o</sup></p>
                            <div class="text-info ">${forecastData[i].day.condition.text}</div>
                        </div>
                                </div>     </div>          
                                        `;
        document.getElementById("nextDay").innerHTML = cartona
    }
}
searchInput.addEventListener('input', function () {
    runApp(searchInput.value)
})


async function runApp(townName = 'cairo') {
    let data = await getData(townName)
    if (!data.error) {
        displayCurrentDay(data)
        displayNextDays(data)
    }
}
runApp();
