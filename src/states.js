let measureUnit = 'metric';
let timeForecast = 'daily';
let forecastData = null;

export const setMeasureUnit = (unit) => {
    measureUnit = unit;
};

export const setTimeForecast = (e) => {
    if(timeForecast === e.target.dataset.view){
        console.log('the same')
        return
    }else{
        timeForecast = e.target.dataset.view
    }
};

export const setCurrentForecast = (forecastObj) => {
    forecastData = forecastObj;
}

export const getCurrentAppState = () => {
    return {
        measureUnit,
        timeForecast,
        forecastData,
    }
}
