import './style.css';
import { fetchWeather, mainFetchWeather, obtainCity } from './fetch';
import { getUserPosition } from './location';
import { createUi } from './Ui';

import { leftSideModifier, insertAnimation, createWeeeklyCard, createDailyCard,fulfillHighlightsSection } from './domManipulation';
import { convertToDate} from './utilities';
import { setUpButtonListeners, setUpSearchField } from './events';
import { getCurrentAppState, getMeasureUnit } from './states';

const getLoc = async () => {
    try {
        let zone = await getUserPosition();
        let data = await fetchWeather(zone, `${getCurrentAppState().measureUnit}`);
        leftSideModifier(data);
        //insertAnimation(data);
        createDailyCard(data)
        fulfillHighlightsSection(data)
       // console.log(data)
    } catch (err) {
        console.error("Error getting location", err);
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    getLoc()
    
})


setUpButtonListeners()
setUpSearchField()

