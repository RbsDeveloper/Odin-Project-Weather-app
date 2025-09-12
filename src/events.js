 import { toggleStatus, createDailyCard, createWeeeklyCard, fulfillHighlightsSection, leftSideModifier, insertCurrentTemp, hideModal } from "./domManipulation";
 import { mainFetchWeather, refetchBasedOnMeasureUnits } from "./fetch";
 import { setMeasureUnit, setTimeForecast, getCurrentAppState} from "./states";
 import { createUi } from "./Ui";
 import { loadInitialWeather } from "./startUp";


export function setUpButtonListeners () {
    const viewToggleContainer = document.querySelector('.viewToggle');
    const tempToggleContainer = document.querySelector('.temperatureToggle');
    const modalBtn = document.getElementById('closeModalBtn');

    viewToggleContainer.addEventListener('click', async (e)=> {
        const statusChanged = toggleStatus(e)
        const forecastChanged = setTimeForecast(e)

        if(statusChanged === false && forecastChanged === false){
            return
        }
        
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
        const statusChanged = toggleStatus(e)

        if(statusChanged === false){
            return
        }
        
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

    modalBtn.addEventListener('click', ()=> {
        hideModal()
    })
}

export function setUpSearchField () {
    const searchBar = document.getElementById('searchPlace');
    const form = document.getElementById('searchForm');
/*
    searchBar.addEventListener('keydown', async(e)=> {

    //let place = null;
    
    if(e.key==='Enter'){
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
*/
 form.addEventListener('submit', async(e)=> {
    e.preventDefault()
    let inputVal = searchBar.value

    if(inputVal){
        const measureUnit = getCurrentAppState().measureUnit;
        const data = await mainFetchWeather(`${inputVal}`, `${measureUnit}`);
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
    }else{
        console.log('No Values to search for');
        return
    }
 })
}

export function startApp () {
    window.addEventListener('DOMContentLoaded', async()=>{
    createUi()
    await loadInitialWeather()
    
    setUpButtonListeners()
    setUpSearchField()
})
}