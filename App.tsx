import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import AuthNavigation from './src/navigations/AllScreensNavigation';
import YaMap from 'react-native-yamap';

YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');

export default function App() {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    return <AuthNavigation />;
}
