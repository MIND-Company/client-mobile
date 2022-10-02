import YaMap, {Marker} from 'react-native-yamap';
import {StatusBar} from "react-native";
import React from 'react';

YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');
export default function ParkingScreen({navigation}: {navigation: any}) {
        return (
        <>
            <YaMap
                nightMode={false}
                userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
                initialRegion={{
                    lat: 56.8380620,
                    lon: 60.6601190,
                    zoom: 17,
                    azimuth: 80,
                    tilt: 30
                }}
                style={{ flex: 1}}>
           </YaMap>
        {/*<StatusBar backgroundColor={'transparent'}*/}
        {/*           barStyle="light-content" translucent={true} />*/}
        </>
    );
};
