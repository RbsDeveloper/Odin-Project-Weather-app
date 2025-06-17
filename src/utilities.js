import {format} from 'date-fns';

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

export const convertToHour = (obj) => {
    const currentday = format(new Date(obj.currentConditions.datetimeEpoch * 1000), 'HH:mm');

    return(currentday);
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