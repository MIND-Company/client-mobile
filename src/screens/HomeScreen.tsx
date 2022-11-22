import {ActivityIndicator, BackHandler, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import InfoComponent from '../components/forHomeScreen/InfoComponent';
import AddCarComponent from '../components/forHomeScreen/AddCarComponent';
import AddCardComponent from '../components/forHomeScreen/AddCardComponent';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import PreviousParkingAndCardNumber from '../components/forHomeScreen/PreviousParkingAndCard&Number';

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
			if (number !== null) {
				setNumber(number);
			}

			if (card !== null) {
				setCard(card);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView style={[{width: '100%', backgroundColor: theme.backgroundScreen, paddingBottom: 20}]}>
			<InfoComponent bg = {theme.backgroundComponent} textColor = {theme.textColor}/>
			{loading ? (
				<>
					<View style={styles.View}>
						<ActivityIndicator size={40} color='#886DEC' />
					</View>
					<View style={styles.View}>
						<ActivityIndicator size={40} color='#886DEC' />
					</View>
				</>
			) : (
				<>
					{(number !== null && card !== null)
						? (
							<>
								<PreviousParkingAndCardNumber height = {110} bg={theme.backgroundComponent} card = {card} number={number} />
							</>) : (
							<>
								<AddCarComponent height = {220} bg={theme.backgroundComponent} func={goAddCar} number={number} numberFunc={setNumber} />
								<AddCardComponent height ={220} bg={theme.backgroundComponent} func={goAddCard} card={card} cardFunc={setCard} />
							</>)
					}
				</>)}
			<StatusBar backgroundColor={theme.backgroundScreen} barStyle={theme.statusBarStyle}/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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

