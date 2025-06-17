import { createEl } from "./utilities";


export const createUi = (() => {
    //main container

    const main = createEl('main', ['big'])

    const leftContainer = createEl ('div', ['leftContainer']);

    //Search item
    const searchBox = createEl('div', ['searchBox'], '', {id: 'searchBox'});
    const searchinput = createEl('input', ['searchInput'], '', {type: 'search', id: 'searchPlace', placeholder: 'Search for places'});
    searchBox.append(searchinput);

    const currentDayInfo = createEl('div', ['currentDayInfo'],'',{id: 'currentDayInfo'});
    const mainImg = createEl('div', ['mainImg'], '', {id:'mainImg'});
    const actualTemp = createEl('h1', ['actualTemp'], '' ,{id: 'actualTemp'});
    const actualDay = createEl('p', ['actualDay'], '', {id: 'actualDay'});
    const actualTime = createEl('span', ['actualTime'], '', {id: 'actualSpan'});
    actualDay.append(actualTime)
    
    const overallCondition = createEl('p', ['overallCondition'], 'Mostly Cloudy', {id: 'overallCondition'});
    const precipitationCondition = createEl('p', ['precipitationCondition'], 'Precipitation:', {id: 'precipitationCondition'});
    const precipitationPercentage = createEl('span', ['rainPercent'], '', {id: 'rainPercent'});
    precipitationCondition.append(precipitationPercentage);

    currentDayInfo.append(mainImg, actualTemp, actualDay, overallCondition, precipitationCondition)

    const currentLocationContainer = createEl('div', ['currentLocationContainer'], '', {id: 'currentLocationContainer'});
    const currentLocation = createEl('p', ['currentLocation'], 'New York, NY, USA', {id: 'currentLocation'});
    currentLocationContainer.append(currentLocation);

    leftContainer.append(searchBox, currentDayInfo, currentLocationContainer)

    const rightContainer = createEl('div', ['rightContainer'], '', {id: 'rightContainer'});
    
    const nav = createEl('div', ['navigation',]);
    const viewToggle = createEl('div', ['viewToggle']);
    const todayBtn = createEl('button', ['dailyBtn', 'active'], 'Daily', {'data-view':'daily', id:'dailyBtn'});
    const weekBtn = createEl('button', ['weeklyBtn'], 'Weekly', {'data-view':'weekly', id:'weeklyBtn'});
    viewToggle.append(todayBtn, weekBtn);

    const temperatureToggle = createEl('div', ['temperatureToggle']);
    const celsiusUnit = createEl('button', ['celsiusBtn', 'active'], '°C', {'data-view':'celsius', id:'celsiusBtn', 'data-active': true});
    const fahrenheitUnit = createEl('button', ['fahrenheitBtn'], '°F', {'data-view': 'fahrenheit', id: 'fahrenheit', 'data-active': false});
    temperatureToggle.append(celsiusUnit, fahrenheitUnit);
    nav.append(viewToggle, temperatureToggle);

    const forecastDisplay = createEl('div', ['forecastContainer'], '', {id:'forecastDisplay'});

    const highlightsContainer = createEl('div', ['highlightsContainer'], '', {id: 'highlightsContainer'});
    const hlTitle = createEl('h3', ['hlTitle'], "Today's Highlights");
    const cardsContainer = createEl('div', ['cardsContainer'],);

    //Uv card
    const uvCard = createEl('div', ['uvCard'], '', {id:'uvCard'});
    const uvTitle = createEl('h4', ['hlCardTitle'], 'UV Index');
    const chart = createEl('div', ['uvChart'], '', {id:'uvChart'});
    uvCard.append(uvTitle, chart);
    //Wind status
    const windCard = createEl('div', ['windCard'], '', {id:'windCard'});
    const windTitle = createEl('h4', ['hlCardTitle'], 'Wind Status');
    const windValue = createEl('p', ['windVal', 'hhValue'], '', {id: 'windVal'});
    const direction = createEl('p', ['windDirection'], '', {id: 'windDirection'});
    windCard.append(windTitle, windValue, direction);
    //Sunrise&Sunset
    const ssCard = createEl('div', ['ssCard'],)
    const ssTitle = createEl('h4', ['hlCardTitle'], 'Sunrise & Sunset');
    ssCard.append(ssTitle);
    //Humidity
    const humidityCard = createEl('div', ['humidityCard'], '', {id:'humidityCard'});
    const humidityTitle = createEl('h4', ['hlCardTitle'], 'Humidity');
    const humidityValue = createEl('p', ['humidityVal', 'hhValue'], '', {id: 'humidityVal'});
    const humidityState = createEl('p', ['humidityState', 'hhState'], '', {id: 'hhState'});
    humidityCard.append(humidityTitle, humidityValue, humidityState);
    //Visibility
    const visibilityCard = createEl('div', ['visibilityCard'], '', {id:'visibilityCard'});
    const visibilityTitle = createEl('h4', ['hlCardTitle'], 'Visibility');
    const visibilityValue = createEl('p', ['visibilityVal', 'hhValue'], '', {id: 'visibilityVal'});
    const visibilityState = createEl('p', ['visibilityState', 'hhState'], '', {id: 'hhState'});
    visibilityCard.append(visibilityTitle, visibilityValue, visibilityState);
    //Air Quality
    const airQualityCard = createEl('div', ['airQualityCard'], '', {id:'airQualityCard'});
    const airQualityTitle = createEl('h4', ['hlCardTitle'], 'Air Quality');
    const airQualityValue = createEl('p', ['airQualityVal', 'hhValue'], '', {id: 'airQualityVal'});
    const airQualityState = createEl('p', ['airQualityState', 'hhState'], '', {id: 'hhState'});
    airQualityCard.append(airQualityTitle, airQualityValue, airQualityState);

    cardsContainer.append(uvCard, windCard, ssCard, humidityCard, visibilityCard, airQualityCard);
    highlightsContainer.append(hlTitle, cardsContainer)
    rightContainer.append(nav, forecastDisplay, highlightsContainer);


    main.append(leftContainer, rightContainer);
    document.querySelector('body').append(main)
   
})()

 