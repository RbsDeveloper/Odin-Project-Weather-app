import { createEl } from "./utilities";

export const createUi = (() => {
    //main container

    const main = createEl('main', ['big'])

    const leftContainer = createEl ('div', ['leftContainer']);

    //Search item
    const searchBox = createEl('div', ['searchBox'], '', {id: 'searchBox'});
    const searchinput = createEl('input', ['searchInput'], '', {type: 'search', id: 'searchPlace', placeholder: 'Search for places'});
    searchBox.append(searchinput);

    const currentDayInfo = createEl('div', ['currentDayInfo'], {id: 'currentDayInfo'});
    const mainImg = createEl('img', ['mainImg'], '', {});
    const actualTemp = createEl('h1', ['actualTemp'], '' ,{});
    const actualDay = createEl('p', ['actualDay'], '', {id: 'actualDay'});
    const actualTime = createEl('span', ['actualTime'], '', {id: 'actualSpan'});
    actualDay.append(actualTime)
    
    const overallCondition = createEl('p', ['overallCondition'], '', {id: 'overallCondition'});
    const precipitationCondition = createEl('p', ['precipitationCondition'], '', {id: 'precipitationCondition'}) ;

    currentDayInfo.append(mainImg, actualTemp, actualDay, overallCondition, precipitationCondition)

    const currentLocationContainer = createEl('div', ['currentLocationContainer'], '', {id: 'currentLocationContainer'});
    const currentLocation = createEl('p', ['currentLocation'], '', {id: 'currentLocation'});
    currentLocationContainer.append(currentLocation);

    leftContainer.append(searchBox, currentDayInfo, currentLocationContainer)

    const rightContainer = createEl('div', ['rightContainer'], '', {id: 'rightContainer'});
    
    
    main.append(leftContainer);
    document.querySelector('body').append(main)

   
})()

 