import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import OneHistoryComponent from '../components/OneHistoryComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoPastParking from '../components/forHistoryScreen/NoPastParking';
import {updateAccessToken} from '../utils/updateAccessTokenFunction';
import {useFocusEffect} from '@react-navigation/native';
import CurrentParkingComponent from '../components/forHomeScreen/CurrentParkingComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

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

	const getTimeParking = (entryTime: string, checkoutTime: string) => {
		const milliseconds = Math.abs(Date.parse(checkoutTime) - Date.parse(entryTime));
		const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
		let finalMinutes = '';
		if (minutes < 10) {
			finalMinutes = '0' + minutes.toString();
		} else {
			finalMinutes = minutes.toString();
		}

		const hours = Math.floor((milliseconds / 1000 / 60 / 60));
		let finalHours = '';
		if (hours < 10) {
			finalHours = '0' + hours.toString();
		} else {
			finalHours = hours.toString();
		}

		return (finalHours + ':' + finalMinutes);
	};

	const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const getData = (checkoutTime: string) => {
		const newDate = checkoutTime[19] === '+' ? (new Date(Date.parse(checkoutTime) + (parseInt(checkoutTime.slice(21, 22), 10) * 3600 * 1000))) : (new Date(Date.parse(checkoutTime) - (parseInt(checkoutTime.slice(21, 22), 10) * 3600 * 1000)));
		console.log(newDate)
		console.log(newDate.getDay().toString());
		return (checkoutTime.slice(8, 10) + ' ' + monthNames[parseInt(checkoutTime.slice(5, 7), 10) - 1].toLowerCase() + ', ' + dayNames[parseInt(newDate.getDay().toString(), 10)].toLowerCase());
	};

	// const bottomSheetRef = useRef<BottomSheet>(null);
	// const snapPoints = useMemo(() => ['50%', '70%'], []);
	// const renderBackdrop = useCallback(
	// 	props => (
	// 		<BottomSheetBackdrop
	// 			{...props}
	// 			disappearsOnIndex={-1}
	// 		/>
	// 	),
	// 	[],
	// );
	//
	// const func = () => {
	// 	bottomSheetRef.current.snapToIndex(0);
	// }

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
							<ScrollView style={[{width: '100%'}]}>
								{parkingArray.map((element, index) =>
									element.checkout_time_local !== null
								&& <OneHistoryComponent date = {getData(element.checkout_time_local)}
									price = {element.calculated_price}
									time = {getTimeParking(element.checkout_time_local, element.entry_time_local)}
									key = {index}
									keys = {parkingArray[0].checkout_time_local === null ? index - 1 : index}
									name = {element.park.description}
									car = {element.car} func = {() => {
										goParkingDetails(element);
									}}/>)}
							</ScrollView>
						</>) : null}
					</>}
			</>}
			{/*<BottomSheet*/}
			{/*	backdropComponent={renderBackdrop}*/}
			{/*	index={-1}*/}
			{/*	ref={bottomSheetRef}*/}
			{/*	snapPoints={snapPoints}*/}
			{/*>*/}
			{/*	/!* Bottom Sheet inner View *!/*/}
			{/*	<View style={styles.bottomNavigationView}>*/}
			{/*		<View>*/}
			{/*			<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.9), color: '#886DEC'}}>5</Text>*/}
			{/*		</View>*/}
			{/*		<View*/}
			{/*			style={{*/}
			{/*				height: 10,*/}
			{/*				width: '100%',*/}
			{/*				borderBottomColor: 'gray',*/}
			{/*				borderBottomWidth: 2.5,*/}
			{/*			}}*/}
			{/*		/>*/}
			{/*		<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>*/}
			{/*			<Text style={styles.sheetDetailText}>Адрес: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>5</Text></Text>*/}
			{/*		</View>*/}
			{/*		<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>*/}
			{/*			<Text style={styles.sheetDetailText}>Количество мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>5</Text></Text>*/}
			{/*		</View>*/}
			{/*		<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>*/}
			{/*			<Text style={styles.sheetDetailText}>Свободных мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>5</Text></Text>*/}
			{/*		</View>*/}
			{/*		<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>*/}
			{/*			<Text style={styles.sheetDetailText}>Цена за час сегодня: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>5</Text></Text>*/}
			{/*		</View>*/}
			{/*		<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>*/}
			{/*			<Text style={styles.sheetDetailText}>Бесплатная стоянка: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>5</Text></Text>*/}
			{/*		</View>*/}
			{/*	</View>*/}
			{/*</BottomSheet>*/}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	sheetDetailText: {
		fontSize: responsiveFontSize(2.2),
		fontFamily: 'Montserrat-Regular',
	},
	bottomNavigationView: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
	}});
