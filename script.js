const city_input = document.getElementById("city-input");
const searchbotao = document.getElementById("search-btn");
const weatherresultcontainer = document.getElementById("weather-result");
const errorcontainer = document.getElementById("error-message")
async function fetchClima(nome_cidade) {
    try {
        const lowerCaseName = nome_cidade.toLowerCase();
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=deb15dbbbc234be88c620945251408&q=${lowerCaseName}&aqi=no&lang=pt`)
        if(!response.ok){
            throw new Error(`A cidade '${nome_cidade}' não foi encontrada`)
        }
        const data = await response.json();
        renderCityData(data);
    } catch (error) {
        renderError(error.message)
    }
}
function renderCityData(city){
    weatherresultcontainer.classList.remove("hidden");
    weatherresultcontainer.innerHTML = '';
    const html_insercao = `
        <h2 id="city-name">${city.location.name}, ${city.location.country}</h2>
            <p id="local-time" class="local-time">Horário Local: ${city.location.localtime}</p>

            <div class="weather-main">
                <img id="weather-icon" src="${city.current.condition.icon}" alt="Ícone do tempo">
                <p id="temperature">${city.current.temp_c} C°</p>
            </div>
            <p id="condition">${city.current.condition.text}</p>

            <div class="weather-details">
                <div class="detail-item">
                    <span>Sensação</span>
                    <strong id="feels-like">${city.current.feelslike_c} C°</strong>
                </div>
                <div class="detail-item">
                    <span>Umidade</span>
                    <strong id="humidity">${city.current.humidity} %</strong>
                </div>
                <div class="detail-item">
                    <span>Vento</span>
                    <strong id="wind-speed">${city.current.wind_kph} km/h</strong>
                </div>
                <div class="detail-item">
                    <span>Pressão</span>
                    <strong id="pressure">${city.current.pressure_mb} mb</strong>
                </div>
                <div class="detail-item">
                    <span>Visibilidade</span>
                    <strong id="visibility">${city.current.vis_km} km</strong>
                </div>
                <div class="detail-item">
                    <span>Índice UV</span>
                    <strong id="uv-index">${city.current.uv}</strong>
                </div>
            </div>
    `
    weatherresultcontainer.innerHTML = html_insercao;
}
searchbotao.addEventListener('click', () => {
    const nome_cidade = city_input.value.trim();
    if(nome_cidade){
        errorcontainer.classList.add("hidden")
        fetchClima(nome_cidade);
    }else{
        renderError();
    }
});
function renderError(){
    weatherresultcontainer.classList.add("hidden");
    errorcontainer.classList.remove("hidden");
}
