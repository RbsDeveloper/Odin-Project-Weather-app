import { setCurrentForecast } from "./states";


const KEY = 'KUZ7CPU5YFXU6BTGMPZAWAWNR';


export const fetchWeather = async(location, unit)=> {
    try{
        const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?unitGroup=${unit}&key=${KEY}`);
        const data = await result.json();
        //forecastData = data;
        setCurrentForecast(data);
        return data;
    }catch (err){
        console.error('Could not fetch the weather', err)
        return null
    }
    
};

export const obtainCity = async(location) => {

    try{
        const result = await fetch(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`)
        const json = await result.json();
        console.log(json)
        return json //here is another one, it was .city
    }catch (err){
        console.error('Could not obtain data about the city', err)
        return null
    }
}   

export const mainFetchWeather = async(city, unit)=> {
    
    try{
        const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=${KEY}`);
        const data = await result.json();

        setCurrentForecast(data);
        return data
    }catch (err){
        console.error('Could not fetch the data for the forecast of the city where the user currently is:', err)
    }
}

//try catch to be added, design to be done, loader animation between fetch