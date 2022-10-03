const body = document.querySelector(".wrapper");

export function setLayout(){
    body.append(
        header(),
        main(),
        footer()
    );
}

function header(){
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("header","flex");
    let title = document.createElement("h1");
    title.innerText = "Weather App";
    headerDiv.appendChild(title);
    return headerDiv;
}

function main(){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("main","flex");
    mainDiv.appendChild(searchBox());
    return mainDiv;
}

function searchBox(){
    let searchDiv = document.createElement("div");
    searchDiv.classList.add("searchBox","flex");

    let nameInput = document.createElement("input");
    nameInput.setAttribute("id","cityName");

    let tempSelect = document.createElement("select");
    tempSelect.setAttribute("id","tempSelect");
    let celOption = document.createElement("option");
    celOption.setAttribute("value","cel");
    celOption.innerText = "Celsius";
    let farOption = document.createElement("option");
    farOption.setAttribute("value","far");
    farOption.innerText = "Fahrenheit";
    tempSelect.append(celOption,farOption);
    
    let searchBtn = document.createElement("button");
    searchBtn.setAttribute("id","searchBtn");
    searchBtn.innerText = "Ok";

    searchDiv.append(nameInput,tempSelect,searchBtn);
    return searchDiv;
}

export function createDisplay(){
    let displayDiv = document.createElement("div");
    displayDiv.classList.add("display","flex");

    let city = document.createElement("h2");
    city.setAttribute("id","city");

    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("id","imgDiv");
    let img = document.createElement("img");
    img.setAttribute("id","img");
    imgDiv.append(img);

    displayDiv.append(
        city,imgDiv,infos()
    );
    document.querySelector(".main").appendChild(displayDiv);
}

function infos(){
    let infosDiv = document.createElement("div");
    infosDiv.classList.add("infos","flex");
    const boxes = [
        [
            {
                desc : "Min",
                id : "minTemp"
            },
            {
                desc : "Max",
                id : "maxTemp"
            },
        ],
        [
            {
                desc : "Sunrise",
                id : "sunrise"
            },
            {
                desc : "Sunset",
                id : "sunset"
            },
        ],
        [
            {
                desc : "Cloud",
                id : "cloud"
            },
            {
                desc : "Wind",
                id : "wind"
            },
        ],
        [
            {
                desc : "Humidity",
                id : "humidity"
            },
            {
                desc : "Visibility",
                id : "visibility"
            },
        ],
    ];
    for (const box of boxes) {
        let div = document.createElement("div");
        div.classList.add("box","flex");
        for(const item of box){
            let p = document.createElement("p");
            p.innerText = item.desc+" ";
            let span = document.createElement("span");
            span.setAttribute("id",item.id);
            p.appendChild(span);
            div.appendChild(p);
        }
        infosDiv.appendChild(div);
    }
    return infosDiv;
}

export function setDisplay(object){
    let city = document.querySelector("#city")
    city.innerText = object.city + " " + object.temp;

    let img = document.querySelector("#img")
    img.src = object.icon;

    let minTemp = document.querySelector("#minTemp")
    minTemp.innerText = object.minTemp;

    let maxTemp = document.querySelector("#maxTemp")
    maxTemp.innerText = object.maxTemp;

    let sunrise = document.querySelector("#sunrise")
    sunrise.innerText = object.sunrise;

    let sunset = document.querySelector("#sunset")
    sunset.innerText = object.sunset;

    let cloud = document.querySelector("#cloud")
    cloud.innerText = object.cloud;

    let wind = document.querySelector("#wind")
    wind.innerText = object.wind;

    let humidity = document.querySelector("#humidity")
    humidity.innerText = object.humidity;

    let visibility = document.querySelector("#visibility")
    visibility.innerText = object.visibility;
}

function footer(){
    let footerDiv = document.createElement("div");
    footerDiv.classList.add("footer","flex");
    let title = document.createElement("h2");
    title.innerText = "The Odin Project";
    footerDiv.appendChild(title);
    return footerDiv;
}