import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, LogBox, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import AuthNavigation from './src/navigations/AllScreensNavigation';
import YaMap from 'react-native-yamap';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from './config/ThemeContext';
import theme from './config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/components/forAuth/AuthContext';

void YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');

export default function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [mode, setMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

	const checkAuth = async () => {
		try {
			const token = await AsyncStorage.getItem('refresh_token');
			if (token !== null) {
				setIsAuth(true);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		} catch (e: unknown) {
			Alert.alert('Ошибка', 'Токен истёк', [
				{text: 'OK'},
			]);
		}
	};

	useEffect(() => {
		void checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{isAuth, setIsAuth}}>
			<themeContext.Provider value={mode ? theme.dark : theme.light}>
				<View style={[{backgroundColor: mode ? '#151719' : '#EFF1FB', height: '100%'}]}>
					<StatusBar backgroundColor={mode ? '#151719' : '#EFF1FB'} barStyle={mode ? 'dark-content' : ' light-content'}/>
					{isLoading ? <View style={[{marginTop: '50%'}]}>
						<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
					</View> : <AuthNavigation />
					}
				</View>
			</themeContext.Provider>
		</AuthContext.Provider>
	);
}
