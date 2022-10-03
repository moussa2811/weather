/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDatas": () => (/* binding */ getDatas)
/* harmony export */ });
const apiKey = "025605fb5298600bcca4e65628c7d208";
const url = "https://api.openweathermap.org/data/2.5/weather?";

async function getDatas(name,temp){
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

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDisplay": () => (/* binding */ createDisplay),
/* harmony export */   "setDisplay": () => (/* binding */ setDisplay),
/* harmony export */   "setLayout": () => (/* binding */ setLayout)
/* harmony export */ });
const body = document.querySelector(".wrapper");

function setLayout(){
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

function createDisplay(){
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

function setDisplay(object){
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");



(0,_view__WEBPACK_IMPORTED_MODULE_0__.setLayout)();
document.querySelector("#searchBtn").addEventListener("click",showWeather);

async function showWeather(){
    let name = document.querySelector("#cityName").value.trim();
    let temp = document.querySelector("#tempSelect").value;
    if(name){
        let data = await (0,_data__WEBPACK_IMPORTED_MODULE_1__.getDatas)(name,temp);
        console.log(data)
        if(data === "error") alert("City not found");
        else{
            if( !document.querySelector(".display") ){
                (0,_view__WEBPACK_IMPORTED_MODULE_0__.createDisplay)();
            }
            (0,_view__WEBPACK_IMPORTED_MODULE_0__.setDisplay)(data);
        }
    }else alert("Please enter city name.");
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsSUFBSSxJQUFJLEtBQUssU0FBUyxLQUFLLFNBQVMsT0FBTztBQUM5RDtBQUNBLCtCQUErQixJQUFJLElBQUksS0FBSyxTQUFTLEtBQUssU0FBUyxPQUFPO0FBQzFFO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELEtBQUs7O0FBRTNEO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsbUJBQW1CLEdBQUcscUJBQXFCOztBQUVuRTtBQUNBLHVCQUF1QixrQkFBa0IsR0FBRyxvQkFBb0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZEQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDMUtBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhEO0FBQzVCOztBQUVsQyxnREFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtDQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9EQUFhO0FBQzdCO0FBQ0EsWUFBWSxpREFBVTtBQUN0QjtBQUNBLEtBQUs7QUFDTCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcGlLZXkgPSBcIjAyNTYwNWZiNTI5ODYwMGJjY2E0ZTY1NjI4YzdkMjA4XCI7XG5jb25zdCB1cmwgPSBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YXMobmFtZSx0ZW1wKXtcbiAgICBsZXQgY2l0eSA9IG5hbWU7XG4gICAgbGV0IHVuaXQ7XG4gICAgbGV0IG1lc3VyZTtcbiAgICBsZXQgZGVnO1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZih0ZW1wID09PSBcImNlbFwiKXtcbiAgICAgICAgdW5pdCA9IFwibWV0cmljXCI7XG4gICAgICAgIG1lc3VyZSA9IFwibWV0ZXIocylcIjtcbiAgICAgICAgZGVnID0gXCLCsENcIjtcbiAgICB9ZWxzZXtcbiAgICAgICAgdW5pdCA9IFwiaW1wZXJpYWxcIjtcbiAgICAgICAgbWVzdXJlID0gXCJtaWxlKHMpXCI7XG4gICAgICAgIGRlZyA9IFwiwrBGXCI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3VybH1xPSR7Y2l0eX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gKVxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3VybH1xPSR7Y2l0eX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApe1xuICAgICAgICByZXR1cm4gZ2V0V2VhdGhlciggYXdhaXQgcmVzcG9uc2UuanNvbigpLHVuaXQsbWVzdXJlLGRlZyApO1xuICAgIH1lbHNlIHJldHVybiBcImVycm9yXCI7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXIocmVzSnNvbix1bml0LG1lc3VyZSxkZWcpe1xuICAgIGxldCBkYXRhID0gcmVzSnNvbjtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0LmNpdHkgPSBkYXRhLm5hbWU7XG4gICAgb3V0cHV0LnRlbXAgPSBkYXRhLm1haW4udGVtcCtcIiBcIitkZWc7XG5cbiAgICBsZXQgaWNvbiA9IGRhdGEud2VhdGhlclswXS5pY29uO1xuICAgIG91dHB1dC5pY29uID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7aWNvbn1AMngucG5nYDtcblxuICAgIG91dHB1dC5taW5UZW1wID0gZGF0YS5tYWluLnRlbXBfbWluK1wiIFwiK2RlZztcbiAgICBvdXRwdXQubWF4VGVtcCA9IGRhdGEubWFpbi50ZW1wX21heCtcIiBcIitkZWc7XG5cbiAgICBsZXQgc3VucmlzZSA9IG5ldyBEYXRlKGRhdGEuc3lzLnN1bnJpc2UpO1xuICAgIG91dHB1dC5zdW5yaXNlID0gYCR7c3VucmlzZS5nZXRIb3VycygpfToke3N1bnJpc2UuZ2V0TWludXRlcygpfWA7XG5cbiAgICBsZXQgc3Vuc2V0ID0gbmV3IERhdGUoZGF0YS5zeXMuc3Vuc2V0KTtcbiAgICBvdXRwdXQuc3Vuc2V0ID0gYCR7c3Vuc2V0LmdldEhvdXJzKCl9OiR7c3Vuc2V0LmdldE1pbnV0ZXMoKX1gO1xuICAgIFxuICAgIG91dHB1dC5jbG91ZCA9IGRhdGEuY2xvdWRzLmFsbCtcIiVcIjtcbiAgICBvdXRwdXQud2luZCA9IGRhdGEud2luZC5zcGVlZCtcIiBcIittZXN1cmUrXCIvXCI7XG4gICAgaWYodW5pdCA9PT0gXCJtZXRyaWNcIikgb3V0cHV0LndpbmQgKz0gXCJzZWNcIjtcbiAgICBlbHNlIG91dHB1dC53aW5kICs9IFwiaG91clwiO1xuXG4gICAgb3V0cHV0Lmh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5K1wiJVwiO1xuICAgIG91dHB1dC52aXNpYmlsdHkgPSBkYXRhLnZpc2liaWxpdHkrXCIgXCIrbWVzdXJlO1xuICAgIHJldHVybiBvdXRwdXQ7XG59IiwiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3JhcHBlclwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldExheW91dCgpe1xuICAgIGJvZHkuYXBwZW5kKFxuICAgICAgICBoZWFkZXIoKSxcbiAgICAgICAgbWFpbigpLFxuICAgICAgICBmb290ZXIoKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpe1xuICAgIGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIsXCJmbGV4XCIpO1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSBcIldlYXRoZXIgQXBwXCI7XG4gICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICByZXR1cm4gaGVhZGVyRGl2O1xufVxuXG5mdW5jdGlvbiBtYWluKCl7XG4gICAgbGV0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1haW5EaXYuY2xhc3NMaXN0LmFkZChcIm1haW5cIixcImZsZXhcIik7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChzZWFyY2hCb3goKSk7XG4gICAgcmV0dXJuIG1haW5EaXY7XG59XG5cbmZ1bmN0aW9uIHNlYXJjaEJveCgpe1xuICAgIGxldCBzZWFyY2hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNlYXJjaERpdi5jbGFzc0xpc3QuYWRkKFwic2VhcmNoQm94XCIsXCJmbGV4XCIpO1xuXG4gICAgbGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIixcImNpdHlOYW1lXCIpO1xuXG4gICAgbGV0IHRlbXBTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIHRlbXBTZWxlY3Quc2V0QXR0cmlidXRlKFwiaWRcIixcInRlbXBTZWxlY3RcIik7XG4gICAgbGV0IGNlbE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgY2VsT3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsXCJjZWxcIik7XG4gICAgY2VsT3B0aW9uLmlubmVyVGV4dCA9IFwiQ2Vsc2l1c1wiO1xuICAgIGxldCBmYXJPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIGZhck9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFwiZmFyXCIpO1xuICAgIGZhck9wdGlvbi5pbm5lclRleHQgPSBcIkZhaHJlbmhlaXRcIjtcbiAgICB0ZW1wU2VsZWN0LmFwcGVuZChjZWxPcHRpb24sZmFyT3B0aW9uKTtcbiAgICBcbiAgICBsZXQgc2VhcmNoQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzZWFyY2hCdG4uc2V0QXR0cmlidXRlKFwiaWRcIixcInNlYXJjaEJ0blwiKTtcbiAgICBzZWFyY2hCdG4uaW5uZXJUZXh0ID0gXCJPa1wiO1xuXG4gICAgc2VhcmNoRGl2LmFwcGVuZChuYW1lSW5wdXQsdGVtcFNlbGVjdCxzZWFyY2hCdG4pO1xuICAgIHJldHVybiBzZWFyY2hEaXY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXNwbGF5KCl7XG4gICAgbGV0IGRpc3BsYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpc3BsYXlEaXYuY2xhc3NMaXN0LmFkZChcImRpc3BsYXlcIixcImZsZXhcIik7XG5cbiAgICBsZXQgY2l0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjaXR5LnNldEF0dHJpYnV0ZShcImlkXCIsXCJjaXR5XCIpO1xuXG4gICAgbGV0IGltZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaW1nRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsXCJpbWdEaXZcIik7XG4gICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1nLnNldEF0dHJpYnV0ZShcImlkXCIsXCJpbWdcIik7XG4gICAgaW1nRGl2LmFwcGVuZChpbWcpO1xuXG4gICAgZGlzcGxheURpdi5hcHBlbmQoXG4gICAgICAgIGNpdHksaW1nRGl2LGluZm9zKClcbiAgICApO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKS5hcHBlbmRDaGlsZChkaXNwbGF5RGl2KTtcbn1cblxuZnVuY3Rpb24gaW5mb3MoKXtcbiAgICBsZXQgaW5mb3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGluZm9zRGl2LmNsYXNzTGlzdC5hZGQoXCJpbmZvc1wiLFwiZmxleFwiKTtcbiAgICBjb25zdCBib3hlcyA9IFtcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIk1pblwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJtaW5UZW1wXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzYyA6IFwiTWF4XCIsXG4gICAgICAgICAgICAgICAgaWQgOiBcIm1heFRlbXBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIlN1bnJpc2VcIixcbiAgICAgICAgICAgICAgICBpZCA6IFwic3VucmlzZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIlN1bnNldFwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJzdW5zZXRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIkNsb3VkXCIsXG4gICAgICAgICAgICAgICAgaWQgOiBcImNsb3VkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzYyA6IFwiV2luZFwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJ3aW5kXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJIdW1pZGl0eVwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJodW1pZGl0eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIlZpc2liaWxpdHlcIixcbiAgICAgICAgICAgICAgICBpZCA6IFwidmlzaWJpbGl0eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIF07XG4gICAgZm9yIChjb25zdCBib3ggb2YgYm94ZXMpIHtcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiYm94XCIsXCJmbGV4XCIpO1xuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBib3gpe1xuICAgICAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIHAuaW5uZXJUZXh0ID0gaXRlbS5kZXNjK1wiIFwiO1xuICAgICAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiaWRcIixpdGVtLmlkKTtcbiAgICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5mb3NEaXYuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm9zRGl2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGlzcGxheShvYmplY3Qpe1xuICAgIGxldCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5XCIpXG4gICAgY2l0eS5pbm5lclRleHQgPSBvYmplY3QuY2l0eSArIFwiIFwiICsgb2JqZWN0LnRlbXA7XG5cbiAgICBsZXQgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbWdcIilcbiAgICBpbWcuc3JjID0gb2JqZWN0Lmljb247XG5cbiAgICBsZXQgbWluVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluVGVtcFwiKVxuICAgIG1pblRlbXAuaW5uZXJUZXh0ID0gb2JqZWN0Lm1pblRlbXA7XG5cbiAgICBsZXQgbWF4VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4VGVtcFwiKVxuICAgIG1heFRlbXAuaW5uZXJUZXh0ID0gb2JqZWN0Lm1heFRlbXA7XG5cbiAgICBsZXQgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VucmlzZVwiKVxuICAgIHN1bnJpc2UuaW5uZXJUZXh0ID0gb2JqZWN0LnN1bnJpc2U7XG5cbiAgICBsZXQgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5zZXRcIilcbiAgICBzdW5zZXQuaW5uZXJUZXh0ID0gb2JqZWN0LnN1bnNldDtcblxuICAgIGxldCBjbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvdWRcIilcbiAgICBjbG91ZC5pbm5lclRleHQgPSBvYmplY3QuY2xvdWQ7XG5cbiAgICBsZXQgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2luZFwiKVxuICAgIHdpbmQuaW5uZXJUZXh0ID0gb2JqZWN0LndpbmQ7XG5cbiAgICBsZXQgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2h1bWlkaXR5XCIpXG4gICAgaHVtaWRpdHkuaW5uZXJUZXh0ID0gb2JqZWN0Lmh1bWlkaXR5O1xuXG4gICAgbGV0IHZpc2liaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Zpc2liaWxpdHlcIilcbiAgICB2aXNpYmlsaXR5LmlubmVyVGV4dCA9IG9iamVjdC52aXNpYmlsaXR5O1xufVxuXG5mdW5jdGlvbiBmb290ZXIoKXtcbiAgICBsZXQgZm9vdGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb290ZXJEaXYuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiLFwiZmxleFwiKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gXCJUaGUgT2RpbiBQcm9qZWN0XCI7XG4gICAgZm9vdGVyRGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICByZXR1cm4gZm9vdGVyRGl2O1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2V0TGF5b3V0LCBjcmVhdGVEaXNwbGF5LCBzZXREaXNwbGF5IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgZ2V0RGF0YXMgfSBmcm9tIFwiLi9kYXRhXCI7XG5cbnNldExheW91dCgpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hCdG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsc2hvd1dlYXRoZXIpO1xuXG5hc3luYyBmdW5jdGlvbiBzaG93V2VhdGhlcigpe1xuICAgIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5TmFtZVwiKS52YWx1ZS50cmltKCk7XG4gICAgbGV0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTZWxlY3RcIikudmFsdWU7XG4gICAgaWYobmFtZSl7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0RGF0YXMobmFtZSx0ZW1wKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgaWYoZGF0YSA9PT0gXCJlcnJvclwiKSBhbGVydChcIkNpdHkgbm90IGZvdW5kXCIpO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlcIikgKXtcbiAgICAgICAgICAgICAgICBjcmVhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXREaXNwbGF5KGRhdGEpO1xuICAgICAgICB9XG4gICAgfWVsc2UgYWxlcnQoXCJQbGVhc2UgZW50ZXIgY2l0eSBuYW1lLlwiKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=