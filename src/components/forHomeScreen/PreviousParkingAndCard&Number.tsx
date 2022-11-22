import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import AddCarComponent from './AddCarComponent';
import AddCardComponent from './AddCardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../utils/updateAccessTokenFunction';

export default function PreviousParkingAndCardNumber(props: {height: number; number: string; bg: string; card: string}) {
	const [load, setLoad] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [parkingArray, setParkingArray] = useState([]);

	const getHistoryParking = async () => {
		try {
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch('http://188.68.221.169/api/parkings/', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await request.json();
			setParkingArray(data);
			if (request.status === 401) {
				await updateAccessToken(setError, getHistoryParking(), setErrorText);
			}

			if (request.status === 500) {
				setError(true);
				setErrorText('Ошибка сервера');
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setLoad(false);
		}
	};

	useEffect(() => {
		void getHistoryParking();
	}, []);
	// Const timer = () => {
	// 	const entryTime = parkingArray[0].entry_time.slice(0, 19).replace(/-/g, '/').replace('T', ' ');
	// 	const currentTime = new Date();
	// 	const cur = `${currentTime.getFullYear()}/${currentTime.getMonth()}/${currentTime.getDay()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
	// 	var diff = Math.abs(new Date() - new Date(cur))
	// 	return diff
	// };

	return (
		<>
			{error && <Text>{errorText}</Text>}
			<View style={styles.View}>
				{load ? <ActivityIndicator size={20} color={'#886DEC'} />
					: (<>{typeof parkingArray[0] === 'undefined'
						? <Text>У вас нет паркингов</Text>
						: parkingArray[0].checkout_time === null ? <Text> Вы на парковке 0 сек.</Text>
							: <Text>Прошлый паркинг</Text>
					}</>)}
			</View>
			<View>
				<View style={[{height: 110, marginBottom: '3%', marginTop: '3%'}]}>
					<AddCarComponent bg={props.bg} number = {props.number} height={props.height}/>
				</View>
				<View style={[{height: 110, marginBottom: '3%', marginTop: '3%'}]}>
					<AddCardComponent bg ={props.bg} card = {props.card} height={props.height}/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		fontWeight: '500',
		color: '#886DEC',
		marginBottom: '5%',
		fontSize: 17,
	},
	View: {
		backgroundColor: '#FFFFFF',
		alignSelf: 'center',
		marginTop: '3%',
		width: '95%',
		borderRadius: 20,
		height: 220,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
});
