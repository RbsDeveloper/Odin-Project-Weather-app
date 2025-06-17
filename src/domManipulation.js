import { convertToDate, convertToHour, getIcon } from "./utilities";
import Lottie from 'lottie-web';

export const leftSideModifier = (obj) =>{
    
    const temp = document.getElementById('actualTemp');
    temp.textContent = obj.currentConditions.temp;

    const time = document.getElementById('actualDay');
    time.textContent = convertToDate(obj) + ',' + convertToHour(obj);

    const currentCondition = document.getElementById('overallCondition');
    currentCondition.textContent = obj.currentConditions.conditions

    const rainPercent = document.getElementById('rainPercent');
    rainPercent.textContent = obj.currentConditions.precipprob+'%'
} 

export const toggleStatus = (eTarget) => {
    const childrenList = eTarget.target.closest("div").childNodes
    
        if(eTarget.target.classList.contains('active')){
            console.log('nothing to change here');
            return
        }else{
            childrenList.forEach((children)=> {
                children.classList.remove('active');
                eTarget.target.classList.add('active');
            })
        }
    console.log(eTarget.target.classList)
}

export const insertAnimation = (obj) => {
    const iconPath = getIcon(obj.currentConditions.icon);

    Lottie.loadAnimation(
    {
        container: document.getElementById('mainImg'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: iconPath,
    }
)
}