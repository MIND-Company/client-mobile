import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../../utils/updateAccessTokenFunction';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import ThemeContext from '../../../../config/ThemeContext';

export const CarInfo = () => {
	const [loading, setLoading] = useState <boolean>(true);
	const [number, setNumber] = useState({});
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const theme = useContext(ThemeContext);
	const checkCar = async () => {
		try {
			setLoading(true);
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch('http://188.68.221.169/api/cars', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await request.json();
			if (request.ok) {
				setNumber(data[0]);
				if (typeof data[0] === 'undefined') {
					await AsyncStorage.removeItem('number');
				}
			}

			if (request.status === 401) {
				await updateAccessToken(setError, checkCar(), setErrorText);
			}

			if (request.status === 500) {
				setError(true);
				setErrorText('Ошибка сервера');
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			void checkCar();
		}, []),
	);

	return (
		<View style={[styles.view, {marginBottom: '3%', backgroundColor: theme.backgroundComponent}]}>
			{loading ? <ActivityIndicator size={40} color='#886DEC' /> : (
				<>
					<View style={styles.headingTextView}>
						{error && <Text style={[{color: 'black', fontSize: 20}]}>{errorText}</Text>}
						<Text style={[styles.headingText, {color: theme.buttonProfileAndAddCar}]}>Добавленное т/с</Text>
					</View>
					<View>
						<View style={styles.propertyView}>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>Модель:</Text>
							</View>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>{(typeof number !== 'undefined') ? number.brand + ' ' + number.model : 'Ошибка'}</Text>
							</View>
						</View>
						<View style={styles.propertyView}>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>Номер:</Text>
							</View>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>{(typeof number !== 'undefined') ? number.number : 'Ошибка'}</Text>
							</View>
						</View>
						<View style={styles.propertyView}>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>Цвет:</Text>
							</View>
							<View style={styles.propertyTextView}>
								<Text style={[styles.propertyText, {color: theme.buttonProfileAndAddCar}]}>{(typeof number !== 'undefined') ? number.color : 'Ошибка'}</Text>
							</View>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	headingTextView: {
		width: '80%',
		alignSelf: 'center',
	},
	propertyTextView: {
		width: '50%',
	},
	propertyView: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '80%',
		alignSelf: 'center',
	},
	headingText: {
		textAlign: 'left',
		fontFamily: 'Montserrat-ExtraBold',
		fontWeight: '500',
		color: '#544d4d',
		fontSize: responsiveFontSize(2.95),
	},
	view: {
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		height: responsiveHeight(27),
		borderRadius: 18,
		alignSelf: 'center',
		width: '95%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	propertyText: {
		fontFamily: 'Montserrat-Medium',
		marginBottom: '4%',
		fontWeight: '500',
		color: '#544d4d',
		fontSize: responsiveFontSize(2.5),
	},
});
