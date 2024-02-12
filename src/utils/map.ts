import type { YMapLocationRequest } from 'ymaps3';

export async function initMap(): Promise<void> {
    await ymaps3.ready;

    const LOCATION: YMapLocationRequest = {
        center: [54, 27],
        zoom: 15
    };

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    const map = new YMap(document.getElementById('map'), { location: LOCATION });
    map.addChild(new YMapDefaultSchemeLayer({}));
}

