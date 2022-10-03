import { setLayout, createDisplay, setDisplay } from "./view";
import { getDatas } from "./data";

setLayout();
document.querySelector("#searchBtn").addEventListener("click",showWeather);

async function showWeather(){
    let name = document.querySelector("#cityName").value.trim();
    let temp = document.querySelector("#tempSelect").value;
    if(name){
        let data = await getDatas(name,temp);
        console.log(data)
        if(data === "error") alert("City not found");
        else{
            if( !document.querySelector(".display") ){
                createDisplay();
            }
            setDisplay(data);
        }
    }else alert("Please enter city name.");
}