import { hideLoader, showLoader, showModal } from "./domManipulation";
import { setCurrentForecast } from "./states";
import { getCurrentAppState } from "./states";

const KEY = 'KUZ7CPU5YFXU6BTGMPZAWAWNR';


export const fetchWeather = async(location, unit)=> {
    try{
        showLoader()
        const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?unitGroup=${unit}&key=${KEY}`);
        const data = await result.json();

        if (!data) {
            showModal("Service unavailable, try again later.");
            return;
        }
        //forecastData = data;
        setCurrentForecast(data);
        return data;
    }catch (err){
        console.error('Could not fetch the weather', err)
        showModal('network error')
        return null
    }finally{
        hideLoader()
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
        showLoader()
        const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=${KEY}`);
        const data = await result.json();

        if(!data || !data.days || data.days.length === 0){
            showModal('Could not retrieve weather data for this location. Please check the city name and try again.');
            return null;
        }

        setCurrentForecast(data);
        return data
    }catch (err){
        console.error('Could not fetch the data:', err)
        showModal('Unable to reach the weather service. Please check your connection or try again later.')
    }finally{
        hideLoader()
    }
}

export const refetchBasedOnMeasureUnits = async () => {
    try{ 
        
    let unit = getCurrentAppState().measureUnit;
    
    const coordinates = getCurrentAppState().forecastData;
    
    const place = await obtainCity(coordinates);

    let data = await mainFetchWeather(place.city, unit); 

    console.log('from refetch:', data, );

    return data
    }catch (err){
        console.error('Could not obtain data from the state', err)
    }
   
};

