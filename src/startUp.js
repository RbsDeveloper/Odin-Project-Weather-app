import { getUserPosition } from './location';
import { fetchWeather } from './fetch';
import { getCurrentAppState } from './states';
import { leftSideModifier, createDailyCard, fulfillHighlightsSection, showModal } from './domManipulation';

export const loadInitialWeather = async () => {
    try {
        let zone = await getUserPosition();
        let data = await fetchWeather(zone, `${getCurrentAppState().measureUnit}`);

        leftSideModifier(data);
        createDailyCard(data)
        fulfillHighlightsSection(data)
    } catch (err) {
        console.error("Error getting location", err);
        showModal("An unexpected error occurred.");
    }
}