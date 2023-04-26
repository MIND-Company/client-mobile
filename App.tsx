import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, LogBox, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import AuthNavigation from './src/navigations/AllScreensNavigation';
import YaMap from 'react-native-yamap';
import {EventRegister} from 'react-native-event-listeners';
import ThemeContext from './config/ThemeContext';
import theme from './config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/components/forAuth/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { bazeUrl } from "./src/utils/bazeURL";

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
			const request = await fetch(bazeUrl + '/token/refresh/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					refresh: token,
				}),
			});
			if (request.status === 200) {
				setIsAuth(true);
				setIsLoading(false);
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		void checkAuth();
	}, []);

	return (
		<GestureHandlerRootView>
			<AuthContext.Provider value={{isAuth, setIsAuth}}>
				<ThemeContext.Provider value={mode ? theme.dark : theme.light}>
					<View style={[{backgroundColor: mode ? '#151719' : '#EFF1FB', height: '100%'}]}>
						<StatusBar backgroundColor={'transparent'} barStyle={!mode ? 'dark-content' : ' light-content'} translucent={true}/>
						{isLoading ? <View style={[{marginTop: '50%'}]}>
							<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
						</View> : <AuthNavigation />
						}
					</View>
				</ThemeContext.Provider>
			</AuthContext.Provider>
		</GestureHandlerRootView>
	);
}
