import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import OneHistoryComponent from '../components/OneHistoryComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoPastParking from '../components/forHistoryScreen/NoPastParking';
import {updateAccessToken} from '../utils/updateAccessTokenFunction';

export default function HistoryScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const [load, setLoad] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [parkingArray, setParkingArray] = useState([]);

	const goParkingDetails = (element: Record<string, unknown>) => {
		navigation.navigate('ParkingDetails', {element});
	};

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

	// const [refreshing, setRefreshing] = React.useState(false);
	// const wait = async timeout => new Promise(resolve => setTimeout(resolve, timeout));
	// const onRefresh = React.useCallback(() => {
	// 	setRefreshing(true);
	// 	 getHistoryParking().then(() => {
	// 		setRefreshing(false);
	// 	});
	// }, []);

	return (
		<View style={[{height: '100%', backgroundColor: theme.backgroundScreen}]}>
			{error && <Text style={[{color: 'black', fontSize: 20}]}>{errorText}</Text>}
			{load ? <View style={[{height: '100%', justifyContent: 'center', alignItems: 'center'}]}>
				<ActivityIndicator size={40} color={'#886DEC'}/>
			</View> : <>
				{ parkingArray.length === 0 || typeof parkingArray[0] === 'undefined'
					? <NoPastParking />
					: <>
						<View style={[{width: '95%', height: '7%', alignSelf: 'center', backgroundColor: theme.backgroundScreen}]}>
							<View style={[styles.upView, {backgroundColor: theme.backgroundComponent}]}>
								<View style={[styles.upViewContainer, {alignItems: 'stretch'}]}><Text style={[{fontSize: 19, color: theme.textColor}]}>Название</Text></View>
								<View style={styles.upViewContainer}><Text style={[{fontSize: 19, color: theme.textColor}]}>Номер</Text></View>
								<View style={[{paddingVertical: '0.5%', width: '30%', alignItems: 'center'}]}><Text style={[{fontSize: 19, color: theme.textColor}]}>Дата</Text></View>
							</View>
						</View>
						<ScrollView style={[{width: '100%'}]}
							// refreshControl={
							// 	<RefreshControl
							// 		refreshing={refreshing}
							// 		onRefresh={onRefresh}
							// 	/>
							// }
						>
							{parkingArray.map((element, index) =>
								element.checkout_time !== null
								&& <OneHistoryComponent textColor = {theme.textColor} bg = {theme.backgroundComponent} key = {index} name = {element.park.description} car = {element.car} date = {element.checkout_time.slice(0, 10)} func = {() => {
									goParkingDetails(element);
								}}/>)}
						</ScrollView>
					</>}
			</>}
		</View>
	);
}

const styles = StyleSheet.create({
	upViewContainer: {
		paddingVertical: '0.5%',
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
		marginTop: '3%',
	},
	container: {
		flex: 1,
		backgroundColor: '#EFF1FB',
		alignItems: 'center',
	},
});
