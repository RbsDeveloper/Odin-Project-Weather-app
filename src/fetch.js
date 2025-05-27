
const KEY = 'KUZ7CPU5YFXU6BTGMPZAWAWNR';

export const fetchWeather = async()=> {
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${KEY}`);
    const json = await result.json();
    console.log(json);
};

