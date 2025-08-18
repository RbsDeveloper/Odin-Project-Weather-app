import { convertToDate, convertToHour, getIcon, createEl, getWindDirection, extractForecastHours, formatToTwelveHour, obtainUnit } from "./utilities";
import {format, parse} from 'date-fns';
import Lottie from 'lottie-web';
import { getForecast, mainFetchWeather, obtainCity } from "./fetch";
import { getCurrentAppState, getMeasureUnit } from "./states";

export const insertCurrentTemp = (forecast) => {
    const temp = document.getElementById('actualTemp');
    temp.innerHTML = '';
    temp.textContent = forecast.currentConditions.temp + `${obtainUnit()}`
}

export const leftSideModifier = async (obj) =>{

    setTimeout(async ()=> {
        let appropriateIcon = getIcon(obj.currentConditions.icon);
    insertAnimation(`${appropriateIcon}`, 'mainImg')
    /*
    const temp = document.getElementById('actualTemp');
    temp.textContent = obj.currentConditions.temp + `${obtainUnit()}`;
    */

    insertCurrentTemp(obj)

    const time = document.getElementById('actualDay');
    time.textContent = convertToDate(obj) + ', ' + convertToHour(obj, obj.timezone);

    const currentCondition = document.getElementById('overallCondition');
    currentCondition.textContent = obj.currentConditions.conditions

    const rainPercent = document.getElementById('rainPercent');
    rainPercent.textContent = obj.currentConditions.precipprob+'%'

    const location = document.getElementById('currentLocation');
    const cityData = await obtainCity(obj);
    location.innerText = '';
    location.innerText = `${cityData.city}, ${cityData.countryCode}`
    }, 1000)

    
} 

export const toggleStatus = (eTarget) => {
    const childrenList = eTarget.target.closest("div").childNodes
    
        if(eTarget.target.classList.contains('active')){
            console.log('nothing to change here');
            return
        }else{
            childrenList.forEach((children)=> {
                children.classList.remove('active');
            });
            eTarget.target.classList.add('active');
        }
    //console.log(eTarget.target.classList)
    //console.log(childrenList)
}

export const insertAnimation = (iconName, containerId) => {

    const container = document.getElementById(`${containerId}`);

    container.innerHTML = '';

    Lottie.loadAnimation(
    {
        container: document.getElementById(`${containerId}`),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `${iconName}`,
    }
)
}

export const createWeeeklyCard = (forecastData) =>{
    const forecastContainer = document.getElementById('forecastDisplay');
    forecastContainer.innerHTML = '';
    const usableData = forecastData.days.slice(0, 7);
    let iconPath

    setTimeout(()=>{
        for(let i=0; i< usableData.length; i++){
        const card = createEl('div', ['dayCard', 'forecastCard'], '', {id: `dayCard${i}`});
        const day = createEl('p', ['cardTitle'], `${format(new Date(forecastData.days[i].datetime), 'E')}`,);
        const cardIcon = createEl('div', ['weatherIcon'], '', {id: `cardIcon${i}`});
        const temperatureContainer = createEl('div', ['dayTemp']);
        const maxTemp = createEl('p', ['maxTemp'], `${forecastData.days[i].tempmax} ${obtainUnit()}`, );
        const minTemp = createEl('p', ['minTemp'], `${forecastData.days[i].tempmin} ${obtainUnit()}`,);

        temperatureContainer.append(maxTemp, minTemp);
        card.append(day, cardIcon, temperatureContainer);
        forecastContainer.append(card);

        iconPath = getIcon(usableData[i].icon);
        insertAnimation(`${iconPath}`, `cardIcon${i}`)
        }
    }, 1000)

    
};

export const createDailyCard = (forecastData) => {
    const forecastContainer = document.getElementById('forecastDisplay');
    forecastContainer.innerHTML = '';
    
    let usableData = extractForecastHours(forecastData);
    console.log(usableData)

    let iconPath

    setTimeout(()=> {
        usableData.forEach((day, index) => {
        const card = createEl('div', ['dayCard', 'forecastCard'], '', {id: `dayCard${index}`});

        const hourFormatted = formatToTwelveHour(day.datetime)

        const hour = createEl('p', ['cardTitle'], hourFormatted);
        const cardIcon = createEl('div', ['weatherIcon'], '', {id: `cardIcon${index}`});
        //const temperatureContainer = createEl('div', ['dayTemp']);
        const temp = createEl('p', ['currentTemp'], `${usableData[index].temp} ${obtainUnit()}`, );

        card.append(hour, cardIcon, temp);
        forecastContainer.append(card);

        iconPath = getIcon(usableData[index].icon);
        insertAnimation(`${iconPath}`, `cardIcon${index}`)
        
    })
    }, 1000)

    

}

    const injectUvData = (forecast) => {
    const uvVal = document.getElementById('uvVal');
    const uvState = document.getElementById('uState');
    const uvValue = forecast.currentConditions.uvindex;

    uvVal.innerText = `${uvValue}`;

    if(uvValue >= 0 && uvValue <= 2){
        uvState.innerText = 'Low';
    }else if(uvValue >= 3 && uvValue <= 5){
        uvState.innerText = 'Moderate';
    }else if(uvValue >= 6 && uvValue <= 7){
        uvState.innerText = 'High';
    }else if(uvValue >= 8 && uvValue <= 10){
        uvState.innerText = 'Very High';
    }else {
        uvState.innerText = 'Extreme';
    }
}

    const injectHumidityData = (forecastData) => {
    const percentage = document.getElementById('humidityVal');
    const hStatus = document.getElementById('hState');
    const humVal = forecastData.currentConditions.humidity;
    
    percentage.innerText = humVal;

    if(humVal <= 30){
        hStatus.innerText = 'Low';
    }else if(humVal > 30 && humVal <= 60){
        hStatus.innerText = 'Medium';
    }else {
        hStatus.innerText = 'High';
    }
}

    const injectVisibilityData = (forecastData) => {
    const visibiliTyVal = document.getElementById('visibilityVal');
    const vStatus = document.getElementById('vState');
    const visValue = forecastData.currentConditions.visibility;

    visibiliTyVal.innerText = `${visValue} km`;

    if(visValue > 0 && visValue <= 1){
        vStatus.innerText = 'Very Poor';
    }else if(visValue > 1 && visValue <= 4){
        vStatus.innerText = 'Poor';
    }else if(visValue > 4 && visValue <= 10){
        vStatus.innerText = 'Moderate';
    }else if(visValue > 10 && visValue <= 20){
        vStatus.innerText = 'Good';
    }else {
        vStatus.innerText = 'Excellent';
    }
}

    const injectpressureData = (forecastData) => {
    const pressureVal = document.getElementById('pressureVal');
    const pressureStatus = document.getElementById('pState');
    const pressureValue = forecastData.currentConditions.pressure;

    pressureVal.innerText = `${pressureValue} hPa`

    if(pressureValue > 1020){
        pressureStatus.innerText = 'High';
    }else if(pressureValue>= 1000 && pressureValue <= 1020){
        pressureStatus.innerText = 'Normal';
    }else {
        pressureStatus.innerText = 'Low';
    }

}
    
    const injectWindData = (forecastData) => {
    const windVal =  document.getElementById('windVal');
    const windStatus = document.getElementById('windDirection');
    const windValue = forecastData.currentConditions.windspeed;

    windVal.innerText = `${windValue} km/h`;

    windStatus.innerText = `${getWindDirection(forecastData.currentConditions.winddir)}`
}

    const injectSunMovement = (forecastData) => {
    const sunRiseContainer = document.getElementById('sunriseContainer');
    const sunSetContainer = document.getElementById('sunsetContainer');
    const srInfo = forecastData.currentConditions.sunrise
    const ssInfo = forecastData.currentConditions.sunset

    sunRiseContainer.innerText = '';
    sunSetContainer.innerText = '';

    const sunRiseImg = createEl('img', ['sunriseImg'], '');
    const sunRiseTime = createEl('p', ['sunriseTime'], `${formatToTwelveHour(srInfo)}`)
    sunRiseContainer.append(sunRiseImg, sunRiseTime);

    
    const sunSetImg = createEl('img', ['sunsetImg'], '');
    const sunSetTime = createEl('p', ['sunsetTime'], `${formatToTwelveHour(ssInfo)}`)
    sunSetContainer.append(sunSetImg, sunSetTime);
}

export const fulfillHighlightsSection = (forecastData) => {
    setTimeout(()=> {
        injectUvData(forecastData);
        injectWindData(forecastData);
        injectSunMovement(forecastData);
        injectHumidityData(forecastData);
        injectVisibilityData(forecastData);
        injectpressureData(forecastData)
    }, 1000)
    
};

export const refetchBasedOnMeasureUnits = async () => {
    let unit = getCurrentAppState().measureUnit;
    
    const coordinates = getCurrentAppState().forecastData;
    const place = await obtainCity(coordinates);

    let data = await mainFetchWeather(place.city, unit); //here is a change

    console.log('from refetch:', data, );

    return data
};

let loaderStartTime; 

export const showLoader = () => {
    const animation = document.getElementById('loader-animation');
    loaderStartTime = Date.now()
    if(animation.classList.contains('loader-hidden')){
        animation.classList.remove('loader-hidden');
    }
}

export const hideLoader = () => {   
    const animation = document.getElementById('loader-animation');
    const elapsedTime = Date.now() - loaderStartTime;
    if(elapsedTime >= 2000) {
        animation.classList.add('loader-hidden');
    }else{
        const timeLeft = 2000 - elapsedTime;

        setTimeout(()=>{
            animation.classList.add('loader-hidden')
        }, timeLeft)
    }
}