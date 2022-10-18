import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import AuthNavigation from './src/navigations/AllScreensNavigation';
import YaMap from 'react-native-yamap';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from './config/ThemeContext';
import theme from './config/theme';

void YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');

export default function App() {
	const [mode, setMode] = useState(false);
	useEffect(() => {
		const eventListener: string | boolean = EventRegister.addEventListener('ChangeTheme',
			data => {
				setMode(data);
			});
		return () => {
			if (typeof eventListener === 'string') { //
				EventRegister.removeEventListener(eventListener);
			}
		};
	});
	LogBox.ignoreLogs([
		'Non-serializable values were found in the navigation state',
	]);
	return (
		<themeContext.Provider value={mode ? theme.dark : theme.light}>
			<AuthNavigation />
		</themeContext.Provider>
	);
}
