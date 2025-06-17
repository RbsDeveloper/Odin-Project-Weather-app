import './style.css';
import { fetchWeather, getForecast, mainFetchWeather } from './fetch';
import { getUserPosition } from './location';
import { createUi } from './Ui';

import { leftSideModifier, insertAnimation } from './domManipulation';
import { convertToDate } from './utilities';
import { setUpButtonListeners } from './events';

const getLoc = async () => {
    try {
        let zone = await getUserPosition();
        let data = await fetchWeather(zone);
        leftSideModifier(data);
        insertAnimation(data);
        console.log(data)
    } catch (err) {
        console.error("Error getting location", err);
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    getLoc()
})






const searchBar = document.getElementById('searchPlace');

searchBar.addEventListener('search', async(e)=> {

    let place = null;
    
    if(e.target.value){
        place = e.target.value;
        const data = await mainFetchWeather(place, 'metric');
        console.log(data)
    }else {
        console.log('No Values to seach for');
        return
    }
});

setUpButtonListeners()


