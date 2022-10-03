const apiKey = "025605fb5298600bcca4e65628c7d208";
const url = "https://api.openweathermap.org/data/2.5/weather?";

export async function getDatas(name,temp){
    let city = name;
    let unit;
    let mesure;
    let deg;
    let output = {};
    if(temp === "cel"){
        unit = "metric";
        mesure = "meter(s)";
        deg = "°C";
    }else{
        unit = "imperial";
        mesure = "mile(s)";
        deg = "°F";
    }
    console.log(`${url}q=${city}&units=${unit}&appid=${apiKey}`)
    let response = await fetch(
                            `${url}q=${city}&units=${unit}&appid=${apiKey}`,
                            {
                                mode: "cors",
                            });
    if(response.status === 200){
        return getWeather( await response.json(),unit,mesure,deg );
    }else return "error";
}

function getWeather(resJson,unit,mesure,deg){
    let data = resJson;
    let output = {};
    output.city = data.name;
    output.temp = data.main.temp+" "+deg;

    let icon = data.weather[0].icon;
    output.icon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    output.minTemp = data.main.temp_min+" "+deg;
    output.maxTemp = data.main.temp_max+" "+deg;

    let sunrise = new Date(data.sys.sunrise);
    output.sunrise = `${sunrise.getHours()}:${sunrise.getMinutes()}`;

    let sunset = new Date(data.sys.sunset);
    output.sunset = `${sunset.getHours()}:${sunset.getMinutes()}`;
    
    output.cloud = data.clouds.all+"%";
    output.wind = data.wind.speed+" "+mesure+"/";
    if(unit === "metric") output.wind += "sec";
    else output.wind += "hour";

    output.humidity = data.main.humidity+"%";
    output.visibilty = data.visibility+" "+mesure;
    return output;
}