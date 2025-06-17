
const KEY = 'KUZ7CPU5YFXU6BTGMPZAWAWNR';

let forecastData = null;

export const fetchWeather = async(location)=> {
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?key=${KEY}`);
    const data = await result.json();
    //console.log(json);
    forecastData = data;
    obtainCity(location);
    return data;
};

const obtainCity = async(location) => {
    const result = await fetch(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`)
    const json = await result.json();
    console.log(json)
}   

export const getForecast = () => forecastData;

/*
    1)dupa incarcare se asteapta pentru obtinerea pozitiei
    dupa ce obtinem pozitia facem fetch pentru a primii datele 


    la deschidere trebuie sa avem o functie de fetch care:
        -asteapta dupa aprobarea locatiei de catre user
        -face fetch cu locatia pentru forecast. 
    
    ulterior avem nevoie de o functie pentru forecast care sa fie actionata la fiecare search. 
    se va face fetch cu numele orasului. dar o sa verificat si ce buton are dataset-activ

    dupa obtinerea forecastului acesta va fi salvat intro variabila 

*/

export const mainFetchWeather = async(city, unit)=> {
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=${KEY}`);
    const data = await result.json();

    forecastData = data;
    return data
}