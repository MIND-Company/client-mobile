import {ActivityIndicator, BackHandler, ScrollView, StatusBar} from 'react-native';
import InfoComponent from '../components/forHomeScreen/InfoComponent';
import AddCarComponent from '../components/forHomeScreen/AddCarComponent';
import AddCardComponent from '../components/forHomeScreen/AddCardComponent';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';

export default function HomeScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const [number, setNumber] = useState<string | undefined>(null);
	const [loading, setLoading] = useState <boolean>(true);
	const [card, setCard] = useState<string | undefined>(null);

	useEffect(() => {
		void checkCar();
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => true,
		);
		return () => {
			backHandler.remove();
		};
	}, []);

	const goAddCar = () => {
		navigation.navigate('AddCar', {changeNumber});
	};

	const goAddCard = () => {
		navigation.navigate('AddCard', {changeCard});
	};

	const changeCard = (card: string) => {
		setCard(card);
	};

	const changeNumber = (number: string) => {
		setNumber(number);
	};

	const checkCar = async () => {
		try {
			const number = await AsyncStorage.getItem('number');
			const card = await AsyncStorage.getItem('card');
			setNumber(number);
			setCard(card);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView style={[{width: '100%', backgroundColor: theme.backgroundScreen}]}>
			<InfoComponent bg = {theme.backgroundComponent} textColor = {theme.textColor}/>
			{loading ? (
				<>
					<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
					<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
				</>
			) : (
				<>
					<AddCarComponent bg = {theme.backgroundComponent} func={goAddCar} number={number} numberFunc={setNumber}
					/>
					<AddCardComponent bg = {theme.backgroundComponent} func={goAddCard} card={card} cardFunc={setCard} />
				</>
			)}
			<StatusBar backgroundColor={theme.backgroundScreen} barStyle={theme.statusBarStyle}/>
		</ScrollView>
	);
}
