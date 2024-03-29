import type {FC} from 'react';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import AddCarComponent from './AddCarComponent';
import AddCardComponent from './AddCardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../utils/updateAccessTokenFunction';
import PreviousParkingComponent from './PreviousParkingComponent';
import CurrentParkingComponent from './CurrentParkingComponent';
import ThemeContext from '../../../config/ThemeContext';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {bazeUrl} from '../../utils/bazeURL';

type PreviousParkingAndCardNumberProps = {
	navigationFunc: () => void;
	height: number;
	number: string | undefined;
	bg: string;
	card: string;
};

const PreviousParkingAndCardNumber: FC<PreviousParkingAndCardNumberProps> = ({navigationFunc, height, number, bg, card}) => {
	const [load, setLoad] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [parkingArray, setParkingArray] = useState([]);
	const theme = useContext(ThemeContext);

	const getHistoryParking = async () => {
		try {
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch(bazeUrl + '/api/parkings/?limit=1', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await request.json();
			if (request.ok) {
				setParkingArray(data.results);
			}

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
		const timer = setInterval(async () => getHistoryParking(), 5000);
		void getHistoryParking();
		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<>
			{error && <Text style={{alignSelf: 'center'}}>{errorText}</Text>}
			<View style={[styles.view, {backgroundColor: theme.backgroundComponent}]}>
				{load ? <ActivityIndicator size={20} color={'#886DEC'} />
					: (<>{!parkingArray[0]
						? <Text style={{textAlign: 'center', color: theme.color, fontFamily: 'Montserrat-SemiBold', fontSize: 17}}>У вас пока нет законченных или активных парковок</Text>
						: parkingArray[0].checkout_time_local === null ? <CurrentParkingComponent element = {parkingArray[0]} screen = {'home'} />
							: <PreviousParkingComponent color = {theme.color} navigationFunc={navigationFunc} element = {parkingArray[0]} />
					}</>)}
			</View>
			<View>
				<View style={[{height: 110, marginBottom: '4%'}]}>
					<AddCarComponent color = {theme.color} bg= {theme.backgroundComponent} number = {number} height={height}/>
				</View>
				<View style={[{height: 110, marginBottom: '2%'}]}>
					<AddCardComponent color = {theme.color} bg= {theme.backgroundComponent} card = {card} height={height}/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	view: {
		alignSelf: 'center',
		marginTop: '1.5%',
		marginBottom: '2%',
		width: '95%',
		borderRadius: 20,
		height: responsiveHeight(30),
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
});

export default PreviousParkingAndCardNumber;
