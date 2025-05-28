import './style.css';
import { fetchWeather } from './fetch';
import { getUserPosition } from './location';



const getLoc = async () => {
    try {
        let zone = await getUserPosition();
        let data = fetchWeather(zone);
        //console.log(data)
    } catch (err) {
        console.error("Error getting location", err);
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    getLoc()
})