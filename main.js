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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixJQUFJLElBQUksS0FBSyxTQUFTLEtBQUssU0FBUyxPQUFPO0FBQzFFO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELEtBQUs7O0FBRTNEO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsbUJBQW1CLEdBQUcscUJBQXFCOztBQUVuRTtBQUNBLHVCQUF1QixrQkFBa0IsR0FBRyxvQkFBb0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3REQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDMUtBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhEO0FBQzVCOztBQUVsQyxnREFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtDQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixvREFBYTtBQUM3QjtBQUNBLFlBQVksaURBQVU7QUFDdEI7QUFDQSxLQUFLO0FBQ0wsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXIvLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpS2V5ID0gXCIwMjU2MDVmYjUyOTg2MDBiY2NhNGU2NTYyOGM3ZDIwOFwiO1xuY29uc3QgdXJsID0gXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERhdGFzKG5hbWUsdGVtcCl7XG4gICAgbGV0IGNpdHkgPSBuYW1lO1xuICAgIGxldCB1bml0O1xuICAgIGxldCBtZXN1cmU7XG4gICAgbGV0IGRlZztcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYodGVtcCA9PT0gXCJjZWxcIil7XG4gICAgICAgIHVuaXQgPSBcIm1ldHJpY1wiO1xuICAgICAgICBtZXN1cmUgPSBcIm1ldGVyKHMpXCI7XG4gICAgICAgIGRlZyA9IFwiwrBDXCI7XG4gICAgfWVsc2V7XG4gICAgICAgIHVuaXQgPSBcImltcGVyaWFsXCI7XG4gICAgICAgIG1lc3VyZSA9IFwibWlsZShzKVwiO1xuICAgICAgICBkZWcgPSBcIsKwRlwiO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt1cmx9cT0ke2NpdHl9JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgcmV0dXJuIGdldFdlYXRoZXIoIGF3YWl0IHJlc3BvbnNlLmpzb24oKSx1bml0LG1lc3VyZSxkZWcgKTtcbiAgICB9ZWxzZSByZXR1cm4gXCJlcnJvclwiO1xufVxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyKHJlc0pzb24sdW5pdCxtZXN1cmUsZGVnKXtcbiAgICBsZXQgZGF0YSA9IHJlc0pzb247XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dC5jaXR5ID0gZGF0YS5uYW1lO1xuICAgIG91dHB1dC50ZW1wID0gZGF0YS5tYWluLnRlbXArXCIgXCIrZGVnO1xuXG4gICAgbGV0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcbiAgICBvdXRwdXQuaWNvbiA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2ljb259QDJ4LnBuZ2A7XG5cbiAgICBvdXRwdXQubWluVGVtcCA9IGRhdGEubWFpbi50ZW1wX21pbitcIiBcIitkZWc7XG4gICAgb3V0cHV0Lm1heFRlbXAgPSBkYXRhLm1haW4udGVtcF9tYXgrXCIgXCIrZGVnO1xuXG4gICAgbGV0IHN1bnJpc2UgPSBuZXcgRGF0ZShkYXRhLnN5cy5zdW5yaXNlKTtcbiAgICBvdXRwdXQuc3VucmlzZSA9IGAke3N1bnJpc2UuZ2V0SG91cnMoKX06JHtzdW5yaXNlLmdldE1pbnV0ZXMoKX1gO1xuXG4gICAgbGV0IHN1bnNldCA9IG5ldyBEYXRlKGRhdGEuc3lzLnN1bnNldCk7XG4gICAgb3V0cHV0LnN1bnNldCA9IGAke3N1bnNldC5nZXRIb3VycygpfToke3N1bnNldC5nZXRNaW51dGVzKCl9YDtcbiAgICBcbiAgICBvdXRwdXQuY2xvdWQgPSBkYXRhLmNsb3Vkcy5hbGwrXCIlXCI7XG4gICAgb3V0cHV0LndpbmQgPSBkYXRhLndpbmQuc3BlZWQrXCIgXCIrbWVzdXJlK1wiL1wiO1xuICAgIGlmKHVuaXQgPT09IFwibWV0cmljXCIpIG91dHB1dC53aW5kICs9IFwic2VjXCI7XG4gICAgZWxzZSBvdXRwdXQud2luZCArPSBcImhvdXJcIjtcblxuICAgIG91dHB1dC5odW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eStcIiVcIjtcbiAgICBvdXRwdXQudmlzaWJpbHR5ID0gZGF0YS52aXNpYmlsaXR5K1wiIFwiK21lc3VyZTtcbiAgICByZXR1cm4gb3V0cHV0O1xufSIsImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndyYXBwZXJcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMYXlvdXQoKXtcbiAgICBib2R5LmFwcGVuZChcbiAgICAgICAgaGVhZGVyKCksXG4gICAgICAgIG1haW4oKSxcbiAgICAgICAgZm9vdGVyKClcbiAgICApO1xufVxuXG5mdW5jdGlvbiBoZWFkZXIoKXtcbiAgICBsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiLFwiZmxleFwiKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gXCJXZWF0aGVyIEFwcFwiO1xuICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgcmV0dXJuIGhlYWRlckRpdjtcbn1cblxuZnVuY3Rpb24gbWFpbigpe1xuICAgIGxldCBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtYWluRGl2LmNsYXNzTGlzdC5hZGQoXCJtYWluXCIsXCJmbGV4XCIpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoc2VhcmNoQm94KCkpO1xuICAgIHJldHVybiBtYWluRGl2O1xufVxuXG5mdW5jdGlvbiBzZWFyY2hCb3goKXtcbiAgICBsZXQgc2VhcmNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzZWFyY2hEaXYuY2xhc3NMaXN0LmFkZChcInNlYXJjaEJveFwiLFwiZmxleFwiKTtcblxuICAgIGxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsXCJjaXR5TmFtZVwiKTtcblxuICAgIGxldCB0ZW1wU2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICB0ZW1wU2VsZWN0LnNldEF0dHJpYnV0ZShcImlkXCIsXCJ0ZW1wU2VsZWN0XCIpO1xuICAgIGxldCBjZWxPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIGNlbE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFwiY2VsXCIpO1xuICAgIGNlbE9wdGlvbi5pbm5lclRleHQgPSBcIkNlbHNpdXNcIjtcbiAgICBsZXQgZmFyT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBmYXJPcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIixcImZhclwiKTtcbiAgICBmYXJPcHRpb24uaW5uZXJUZXh0ID0gXCJGYWhyZW5oZWl0XCI7XG4gICAgdGVtcFNlbGVjdC5hcHBlbmQoY2VsT3B0aW9uLGZhck9wdGlvbik7XG4gICAgXG4gICAgbGV0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2VhcmNoQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsXCJzZWFyY2hCdG5cIik7XG4gICAgc2VhcmNoQnRuLmlubmVyVGV4dCA9IFwiT2tcIjtcblxuICAgIHNlYXJjaERpdi5hcHBlbmQobmFtZUlucHV0LHRlbXBTZWxlY3Qsc2VhcmNoQnRuKTtcbiAgICByZXR1cm4gc2VhcmNoRGl2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlzcGxheSgpe1xuICAgIGxldCBkaXNwbGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXNwbGF5RGl2LmNsYXNzTGlzdC5hZGQoXCJkaXNwbGF5XCIsXCJmbGV4XCIpO1xuXG4gICAgbGV0IGNpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY2l0eS5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwiY2l0eVwiKTtcblxuICAgIGxldCBpbWdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGltZ0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwiaW1nRGl2XCIpO1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwiaW1nXCIpO1xuICAgIGltZ0Rpdi5hcHBlbmQoaW1nKTtcblxuICAgIGRpc3BsYXlEaXYuYXBwZW5kKFxuICAgICAgICBjaXR5LGltZ0RpdixpbmZvcygpXG4gICAgKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIikuYXBwZW5kQ2hpbGQoZGlzcGxheURpdik7XG59XG5cbmZ1bmN0aW9uIGluZm9zKCl7XG4gICAgbGV0IGluZm9zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbmZvc0Rpdi5jbGFzc0xpc3QuYWRkKFwiaW5mb3NcIixcImZsZXhcIik7XG4gICAgY29uc3QgYm94ZXMgPSBbXG4gICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJNaW5cIixcbiAgICAgICAgICAgICAgICBpZCA6IFwibWluVGVtcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIk1heFwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJtYXhUZW1wXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJTdW5yaXNlXCIsXG4gICAgICAgICAgICAgICAgaWQgOiBcInN1bnJpc2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJTdW5zZXRcIixcbiAgICAgICAgICAgICAgICBpZCA6IFwic3Vuc2V0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJDbG91ZFwiLFxuICAgICAgICAgICAgICAgIGlkIDogXCJjbG91ZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2MgOiBcIldpbmRcIixcbiAgICAgICAgICAgICAgICBpZCA6IFwid2luZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzYyA6IFwiSHVtaWRpdHlcIixcbiAgICAgICAgICAgICAgICBpZCA6IFwiaHVtaWRpdHlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjIDogXCJWaXNpYmlsaXR5XCIsXG4gICAgICAgICAgICAgICAgaWQgOiBcInZpc2liaWxpdHlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgYm94IG9mIGJveGVzKSB7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImJveFwiLFwiZmxleFwiKTtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2YgYm94KXtcbiAgICAgICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBwLmlubmVyVGV4dCA9IGl0ZW0uZGVzYytcIiBcIjtcbiAgICAgICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZShcImlkXCIsaXRlbS5pZCk7XG4gICAgICAgICAgICBwLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHApO1xuICAgICAgICB9XG4gICAgICAgIGluZm9zRGl2LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICAgIHJldHVybiBpbmZvc0Rpdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERpc3BsYXkob2JqZWN0KXtcbiAgICBsZXQgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2l0eVwiKVxuICAgIGNpdHkuaW5uZXJUZXh0ID0gb2JqZWN0LmNpdHkgKyBcIiBcIiArIG9iamVjdC50ZW1wO1xuXG4gICAgbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nXCIpXG4gICAgaW1nLnNyYyA9IG9iamVjdC5pY29uO1xuXG4gICAgbGV0IG1pblRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pblRlbXBcIilcbiAgICBtaW5UZW1wLmlubmVyVGV4dCA9IG9iamVjdC5taW5UZW1wO1xuXG4gICAgbGV0IG1heFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heFRlbXBcIilcbiAgICBtYXhUZW1wLmlubmVyVGV4dCA9IG9iamVjdC5tYXhUZW1wO1xuXG4gICAgbGV0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1bnJpc2VcIilcbiAgICBzdW5yaXNlLmlubmVyVGV4dCA9IG9iamVjdC5zdW5yaXNlO1xuXG4gICAgbGV0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vuc2V0XCIpXG4gICAgc3Vuc2V0LmlubmVyVGV4dCA9IG9iamVjdC5zdW5zZXQ7XG5cbiAgICBsZXQgY2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3VkXCIpXG4gICAgY2xvdWQuaW5uZXJUZXh0ID0gb2JqZWN0LmNsb3VkO1xuXG4gICAgbGV0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dpbmRcIilcbiAgICB3aW5kLmlubmVyVGV4dCA9IG9iamVjdC53aW5kO1xuXG4gICAgbGV0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNodW1pZGl0eVwiKVxuICAgIGh1bWlkaXR5LmlubmVyVGV4dCA9IG9iamVjdC5odW1pZGl0eTtcblxuICAgIGxldCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aXNpYmlsaXR5XCIpXG4gICAgdmlzaWJpbGl0eS5pbm5lclRleHQgPSBvYmplY3QudmlzaWJpbGl0eTtcbn1cblxuZnVuY3Rpb24gZm9vdGVyKCl7XG4gICAgbGV0IGZvb3RlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9vdGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIixcImZsZXhcIik7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9IFwiVGhlIE9kaW4gUHJvamVjdFwiO1xuICAgIGZvb3RlckRpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgcmV0dXJuIGZvb3RlckRpdjtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldExheW91dCwgY3JlYXRlRGlzcGxheSwgc2V0RGlzcGxheSB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IGdldERhdGFzIH0gZnJvbSBcIi4vZGF0YVwiO1xuXG5zZXRMYXlvdXQoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoQnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHNob3dXZWF0aGVyKTtcblxuYXN5bmMgZnVuY3Rpb24gc2hvd1dlYXRoZXIoKXtcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2l0eU5hbWVcIikudmFsdWUudHJpbSgpO1xuICAgIGxldCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2VsZWN0XCIpLnZhbHVlO1xuICAgIGlmKG5hbWUpe1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldERhdGFzKG5hbWUsdGVtcCk7XG4gICAgICAgIGlmKGRhdGEgPT09IFwiZXJyb3JcIikgYWxlcnQoXCJDaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKCAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5XCIpICl7XG4gICAgICAgICAgICAgICAgY3JlYXRlRGlzcGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RGlzcGxheShkYXRhKTtcbiAgICAgICAgfVxuICAgIH1lbHNlIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGNpdHkgbmFtZS5cIik7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9