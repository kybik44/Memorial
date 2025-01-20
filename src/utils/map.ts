import { YMapLocationRequest, YMap, YMapDefaultSchemeLayer } from 'ymaps3';

export async function initMap(): Promise<void> {
    try {
    await ymaps3.ready;

    const LOCATION: YMapLocationRequest = {
        center: [54, 27],
        zoom: 15
    };

        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Could not find the map element on the page.');
            return;
}

        const map = new YMap(mapElement, { location: LOCATION });
        map.addChild(new YMapDefaultSchemeLayer({}));
    } catch (error) {
        console.error('An error occurred while initializing the map:', error);
    }
}
