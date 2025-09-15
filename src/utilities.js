import {format, parse} from 'date-fns';
import { toZonedTime } from 'date-fns-tz'
import { getCurrentAppState, getMeasureUnit } from './states';

//  Creates a DOM element with optional classes, text, and attributes.
export function createEl(tag, classes=[], text='', attributes={}) {
    const element = document.createElement(tag);
    if(classes.length){
        element.classList.add(...classes);
    }
    if(text){
        element.textContent = text;
    }
    for(const [key, value] of Object.entries(attributes)){
        element.setAttribute(key, value);
    }

    return element;
}

export const convertToDate = (obj) => {
    const currentday = format(new Date(obj.currentConditions.datetimeEpoch * 1000), 'eeee');

    return(currentday);
}

export const convertToHour = (obj, timezone) => {
    const currentday = new Date(obj.currentConditions.datetimeEpoch * 1000);
    

    const zonedDate = toZonedTime(currentday, timezone)
    
    return format(zonedDate, 'HH:mm');
}

export const formatToTwelveHour = (hour) => {
    return format( parse(hour, 'HH:mm:ss', new Date()), 'h:mm a' );
}

const weatherIconsMap = {
    'clear-day': 'animations/clearDay.json',
    'clear-night': 'animations/clearNight.json',
    'cloudy': 'animations/cloudy.json',
    'fog': 'animations/fog.json',
    'hail': 'animations/rain.json',
    'partly-cloudy-day': 'animations/partiallyCloudyDay.json',
    'partly-cloudy-night': 'animations/partiallyCloudyNight.json',
    'rain-snow-showers-days': 'animations/rain.json',
    'rain-snow-showers-night': 'animations/rain.json',
    'rain-snow': 'animations/rain.json',
    'rain': 'animations/rain.json',
    'showers-day': 'animations/rain.json',
    'showers-night': 'animations/rain.json',
    'snow': 'animations/snow.json',
    'thunder-rain': 'animations/rain.json',
    'thunder-showers-day': 'animations/rain.json',
    'thunder-showers-night': 'animations/rain.json',
    'thunder': 'animations/rain.json',
    'wind': 'animations/wind.json'
}


export const getIcon = (condition) => {
    return weatherIconsMap[condition];
}

export const extractForecastHours = (externalData) => {
    if(!externalData) {
        return
    }

    const totalHours = externalData.days[0].hours.length;
    
    const currentTime = parseInt(convertToHour(externalData, externalData.timezone).slice(0,2), 10);
    let lastHour = currentTime+7;
    let usableData

    if(lastHour > totalHours){
        const firstPart = externalData.days[0].hours.slice(currentTime, totalHours);
        const secondPart = externalData.days[0].hours.slice(0, lastHour-totalHours);
        usableData = [...firstPart, ...secondPart];
    }else{
        usableData = externalData.days[0].hours.slice(currentTime, lastHour);
    }

    return usableData;
}

export const getWindDirection = (degree) => {
    const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
}

export const obtainUnit = () => {
    const measure = getCurrentAppState().measureUnit;

    if(measure === 'metric'){
        return 'C'
    }else{
        return 'F'
    }
}
