import {ActivityIndicator, BackHandler, ScrollView, StatusBar} from 'react-native';
import InfoComponent from '../components/forHomeScreen/InfoComponent';
import AddCarComponent from '../components/forHomeScreen/AddCarComponent';
import AddCardComponent from '../components/forHomeScreen/AddCardComponent';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function HomeScreen({navigation}: {navigation: any}) {
	const [number, setNumber] = useState<string | undefined>(null);
	const [loading, setLoading] = useState(true);
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
		<ScrollView style={[{width: '100%', backgroundColor: '#EFF1FB'}]}>
			<InfoComponent />
			{loading ? (
				<>
					<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
					<ActivityIndicator animating={true} size='large' color='#C5C5C5' />
				</>
			) : (
				<>
					<AddCarComponent func={goAddCar} number={number} numberFunc={setNumber}
					/>
					<AddCardComponent func={goAddCard} card={card} cardFunc={setCard} />
				</>
			)}
			<StatusBar backgroundColor='#EFF1FB'
				barStyle='dark-content'/>
		</ScrollView>
	);
}
