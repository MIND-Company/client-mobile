import React, {useCallback, useContext, useState} from 'react';
import {ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import OneHistoryComponent from '../components/OneHistoryComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoPastParking from '../components/forHistoryScreen/NoPastParking';
import {updateAccessToken} from '../utils/updateAccessTokenFunction';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';
import CurrentParkingComponent from '../components/forHomeScreen/CurrentParkingComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

type ElementType = {
	calculated_price: string | undefined;
	car: string;
	checkout_time: string;
	entry_time: string;
	park: {
		description: string;
		id: number;
		web_address: string;};
};

export default function HistoryScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const [load, setLoad] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [parkingArray, setParkingArray] = useState([]);

	const goParkingDetails = (element: ElementType) => {
		navigation.navigate('ParkingDetails', {element});
	};

	const getHistoryParking = async () => {
		try {
			setLoad(true);
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
			console.log(data);
			if (request.ok) {
				setParkingArray(data);
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

	useFocusEffect(
		useCallback(() => {
			void getHistoryParking();
		}, []),
	);

	const goParkingScreen = () => {
		navigation.navigate('Parking');
	};

	return (
		<SafeAreaView style={{height: '100%', backgroundColor: theme.backgroundScreen}}>
			{error && <Text style={[{color: 'black', fontSize: 20}]}>{errorText}</Text>}
			{load ? <View style={[{height: '100%', justifyContent: 'center', alignItems: 'center'}]}>
				<ActivityIndicator size={40} color={'#886DEC'}/>
			</View> : <>
				{ parkingArray.length === 0 || typeof parkingArray[0] === 'undefined'
					? <NoPastParking func = {goParkingScreen}/>
					: <>
						{ parkingArray[0].checkout_time_local === null && <CurrentParkingComponent color = {theme.color} element = {parkingArray[0]} screen = {'history'}/> }

						{ (parkingArray.length > 1 || (parkingArray.length === 1 && parkingArray[0].checkout_time_local !== null)) ? (<>
							<View style={[{borderRadius: 15, width: '95%', height: '5.5%', alignSelf: 'center', backgroundColor: theme.backgroundScreen, marginTop: '2%'}]}>
								<View style={[styles.upView, {backgroundColor: theme.backgroundComponent}]}>
									<View style={[styles.upViewContainer, {alignItems: 'stretch'}]}><Text style={[{fontSize: responsiveFontSize(2.4), color: theme.textColor, fontFamily: 'Montserrat-Medium'}]}>Название</Text></View>
									<View style={styles.upViewContainer}><Text style={[{fontSize: responsiveFontSize(2.4), color: theme.textColor, fontFamily: 'Montserrat-Medium'}]}>Номер</Text></View>
									<View style={[{paddingVertical: '0.5%', alignSelf: 'center', width: '30%', alignItems: 'center'}]}><Text style={[{fontSize: responsiveFontSize(2.4), color: theme.textColor, fontFamily: 'Montserrat-Medium'}]}>Дата</Text></View>
								</View>
							</View>
							<ScrollView style={[{width: '100%'}]}>
								{parkingArray.map((element, index) =>
									element.checkout_time_local !== null
								&& <OneHistoryComponent key = {index} keys = {parkingArray[0].checkout_time_local === null ? index - 1 : index} textColor = {theme.textColor} bg = {theme.backgroundComponent} name = {element.park.description} car = {element.car} date = {element.entry_time_local.slice(0, 10)} func = {() => {
									goParkingDetails(element);
								}}/>)}
							</ScrollView>
						</>) : null}
					</>}
			</>}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	upViewContainer: {
		alignSelf: 'center',
		borderColor: '#886DEC',
		borderRightWidth: 2,
		width: '35%',
		alignItems: 'center',
	},
	upView: {
		borderColor: '#886DEC',
		borderRadius: 15,
		alignSelf: 'center',
		width: '100%',
		borderStyle: 'solid',
		borderWidth: 3,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		paddingHorizontal: '5%',
		paddingVertical: '0.5%',
		// ShadowColor: '#000000',
		// shadowOpacity: 0.15,
		// elevation: 3,
		// shadowOffset: {width: 7, height: 7},
	},
	container: {
		flex: 1,
		backgroundColor: '#EFF1FB',
		alignItems: 'center',
	},
});
