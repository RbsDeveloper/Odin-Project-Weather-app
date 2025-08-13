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
    const currentLocation = createEl('p', ['currentLocation'], '', {id: 'currentLocation'});
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
    const uvValue = createEl('p', ['uvVal', 'hhValue'], '', {id: 'uvVal'});
    const uvState = createEl('p', ['uvState', 'hhState'], '', {id: 'uState'});
    uvCard.append(uvTitle, uvValue, uvState);
    //Wind status
    const windCard = createEl('div', ['windCard'], '', {id:'windCard'});
    const windTitle = createEl('h4', ['hlCardTitle'], 'Wind Status');
    const windValue = createEl('p', ['windVal', 'hhValue'], '', {id: 'windVal'});
    const direction = createEl('p', ['windDirection'], '', {id: 'windDirection'});
    windCard.append(windTitle, windValue, direction);
    //Sunrise&Sunset
    const ssCard = createEl('div', ['ssCard'],)
    const ssTitle = createEl('h4', ['hlCardTitle'], 'Sunrise & Sunset');
    const srContainer = createEl('div', ['sunMovementContainer'], '', {id:'sunriseContainer'});
    const ssContainer = createEl('div', ['sunMovementContainer'], '', {id:'sunsetContainer'});
    ssCard.append(ssTitle, srContainer, ssContainer);
    //Humidity
    const humidityCard = createEl('div', ['humidityCard'], '', {id:'humidityCard'});
    const humidityTitle = createEl('h4', ['hlCardTitle'], 'Humidity');
    const humidityValue = createEl('p', ['humidityVal', 'hhValue'], '', {id: 'humidityVal'});
    const humidityState = createEl('p', ['humidityState', 'hhState'], '', {id: 'hState'});
    humidityCard.append(humidityTitle, humidityValue, humidityState);
    //Visibility
    const visibilityCard = createEl('div', ['visibilityCard'], '', {id:'visibilityCard'});
    const visibilityTitle = createEl('h4', ['hlCardTitle'], 'Visibility');
    const visibilityValue = createEl('p', ['visibilityVal', 'hhValue'], '', {id: 'visibilityVal'});
    const visibilityState = createEl('p', ['visibilityState', 'hhState'], '', {id: 'vState'});
    visibilityCard.append(visibilityTitle, visibilityValue, visibilityState);
    //Air Quality
    const pressureCard = createEl('div', ['pressureCard'], '', {id:'pressureCard'});
    const pressureTitle = createEl('h4', ['hlCardTitle'], 'Pressure');
    const pressureValue = createEl('p', ['pressureVal', 'hhValue'], '', {id: 'pressureVal'});
    const pressureState = createEl('p', ['pressureState', 'hhState'], '', {id: 'pState'});
    pressureCard.append(pressureTitle, pressureValue, pressureState);

    cardsContainer.append(uvCard, windCard, ssCard, humidityCard, visibilityCard, pressureCard);
    highlightsContainer.append(hlTitle, cardsContainer)
    rightContainer.append(nav, forecastDisplay, highlightsContainer);


    main.append(leftContainer, rightContainer);
    document.querySelector('body').append(main)
   
})()

 