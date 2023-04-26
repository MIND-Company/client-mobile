import {
	ActivityIndicator,
	BackHandler,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import InfoComponent from '../components/forHomeScreen/InfoComponent';
import AddCarComponent from '../components/forHomeScreen/AddCarComponent';
import AddCardComponent from '../components/forHomeScreen/AddCardComponent';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import PreviousParkingAndCardNumber from '../components/forHomeScreen/PreviousParkingAndCard&Number';
import {updateAccessToken} from '../utils/updateAccessTokenFunction';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import { bazeUrl } from "../utils/bazeURL";

export default function HomeScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const [number, setNumber] = useState<string | undefined>(null);
	const [loading, setLoading] = useState <boolean>(true);
	const [card, setCard] = useState<string | undefined>(null);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');

	const scrollViewRef = useRef(null);

	useEffect(() => {
		void checkCard();
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => true,
		);
	}, []);

	const checkCard = async () => {
		const card = await AsyncStorage.getItem('card');
		setCard(card);
	};

	useFocusEffect(
		useCallback(() => {
			if (scrollViewRef.current) {
				scrollViewRef.current.scrollTo({y: 0, animated: true});
			}

			void checkCar();
		}, []),
	);

	const goAddCar = () => {
		navigation.navigate('AddCar');
	};

	const goAddCard = () => {
		navigation.navigate('AddCard', {changeCard});
	};

	const changeCard = (card: string) => {
		setCard(card);
	};

	const checkCar = async () => {
		try {
			setLoading(true);
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch(bazeUrl + '/api/cars', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await request.json();
			if (request.ok) {
				if (data[0]) {
					await AsyncStorage.setItem('number', data[0].number);
					setNumber(data[0].number);
				} else {
					setNumber(null);
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

	const goPreviousParkingScreen = () => {
		navigation.navigate('HistoryNavigations');
	};

	return (
		<SafeAreaView style={{height: '100%', backgroundColor: theme.backgroundScreen}}>
			<ScrollView ref={scrollViewRef}>
				<InfoComponent bgColor = {theme.backgroundComponent} textColor = {theme.textColor}/>
				{error && <Text style={[{color: 'black', fontSize: 20}]}>{errorText}</Text>}
				{loading ? (
					<>
						<View style={[styles.View, {backgroundColor: theme.backgroundComponent}]}>
							<ActivityIndicator size={40} color='#886DEC' />
						</View>
						<View style={[styles.View, {marginBottom: '3%', marginTop: 0, backgroundColor: theme.backgroundComponent}]}>
							<ActivityIndicator size={40} color='#886DEC' />
						</View>
					</>
				) : (
					<>
						{(number !== null && card !== null)
							? (
								<>
									<PreviousParkingAndCardNumber navigationFunc = {goPreviousParkingScreen} height = {14} bg={theme.backgroundComponent} card = {card} number={number} />
								</>) : (
								<>
									<AddCarComponent color={theme.color} height = {30} bg={theme.backgroundComponent} func={goAddCar} number={number} />
									<AddCardComponent color={theme.color} height ={30} bg={theme.backgroundComponent} func={goAddCard} card={card} />
								</>)
						}
					</>)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	View: {
		alignSelf: 'center',
		marginTop: '1.5%',
		marginBottom: '3%',
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

