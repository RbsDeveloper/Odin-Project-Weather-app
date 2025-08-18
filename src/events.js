 import { toggleStatus, refetchBasedOnMeasureUnits, createDailyCard, createWeeeklyCard, fulfillHighlightsSection, leftSideModifier, insertCurrentTemp, showLoader } from "./domManipulation";
 import { mainFetchWeather } from "./fetch";
 import { setMeasureUnit, setTimeForecast, getCurrentAppState} from "./states";


export function setUpButtonListeners () {
    const viewToggleContainer = document.querySelector('.viewToggle');
    const tempToggleContainer = document.querySelector('.temperatureToggle');

    viewToggleContainer.addEventListener('click', async (e)=> {
        toggleStatus(e)
        setTimeForecast(e)
        const info = await refetchBasedOnMeasureUnits();
        
        const appState = getCurrentAppState();
        if(appState.timeForecast === 'daily'){
            //leftSideModifier(info);
            createDailyCard(info);
            console.log(info);
        }else {
            //leftSideModifier(info);
            createWeeeklyCard(info);
            console.log(info);
        }
    });

    tempToggleContainer.addEventListener('click', async (e)=> {
        toggleStatus(e)
        
        if(e.target.dataset.view === 'celsius'){
            setMeasureUnit('metric');
        }else if(e.target.dataset.view === 'fahrenheit') {
            setMeasureUnit('us');
        }else {
            return
        }

        const info = await refetchBasedOnMeasureUnits();
        
        const appState = getCurrentAppState()

        if(appState.timeForecast === 'daily'){
            console.log(info)
            createDailyCard(info);
            insertCurrentTemp(info)
        }else{
            insertCurrentTemp(info)
            createWeeeklyCard(info);
            console.log(info)
        }

        
    })
}

export function setUpSearchField () {
    const searchBar = document.getElementById('searchPlace');

    searchBar.addEventListener('search', async(e)=> {

    //let place = null;
    
    if(e.target.value){
        //place = e.target.value;
        const measureUnit = getCurrentAppState().measureUnit;
        const data = await mainFetchWeather(`${e.target.value}`, `${measureUnit}`);
        searchBar.value = '';
        console.log(getCurrentAppState().forecastData)
        if(getCurrentAppState().timeForecast === 'daily'){
            leftSideModifier(data)
            createDailyCard(data)
            fulfillHighlightsSection(data)
        }else{
            leftSideModifier(data)
            createWeeeklyCard(data)
            fulfillHighlightsSection(data)
        }
    }else {
        console.log('No Values to search for');
        return
    }


});
}