
const KEY = 'KUZ7CPU5YFXU6BTGMPZAWAWNR';

export const fetchWeather = async(location)=> {
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?key=${KEY}`);
    const json = await result.json();
    console.log(json);
    obtainCity(location);
    return(json);
};

const obtainCity = async(location) => {
    const result = await fetch(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`)
    const json = await result.json();
    console.log(json)
}   

