import { toggleStatus } from "./domManipulation";


export function setUpButtonListeners () {
    const viewToggleContainer = document.querySelector('.viewToggle');
    const tempToggleContainer = document.querySelector('.temperatureToggle');

    viewToggleContainer.addEventListener('click', (e)=> {
        toggleStatus(e)
    });

    tempToggleContainer.addEventListener('click', (e)=> {
        toggleStatus(e)
    })
}