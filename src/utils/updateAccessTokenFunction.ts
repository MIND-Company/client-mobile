import AsyncStorage from '@react-native-async-storage/async-storage';
import { bazeUrl } from "./bazeURL";

export const updateAccessToken = async (setE: any, func: any, setEText: any) => {
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
		const data = await request.json();
		if (request.status === 200) {
			await AsyncStorage.removeItem('access_token');
			await AsyncStorage.setItem('access_token', data.access);
			await func;
		} else {
			setE(true);
			request.status === 500 ? setEText('Ошибка сервера') : setEText('Ошибка');
		}
	} catch (e: unknown) {
		console.log(e);
	}
};
