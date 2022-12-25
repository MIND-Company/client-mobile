import {Keyboard, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useContext, useState} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import DeleteCarNumberComponent from '../../components/forHomeScreen/forAddCarScreen/DeleteCarNumberComponent';
import ChangeCarComponent from '../../components/forHomeScreen/forAddCarScreen/ChangeCarComponent';
import AddCarNumberComponent from '../../components/forHomeScreen/forAddCarScreen/AddCarNumberComponent';
import {BackComponent} from '../../components/BackComponent';
import {useFocusEffect} from '@react-navigation/native';
import {CarInfo} from '../../components/forHomeScreen/forAddCarScreen/CarInfo';
import {screenHeight} from '../../utils/screenSize';
import ThemeContext from '../../../config/ThemeContext';

export default function AddCarScreen({navigation}: {navigation: NavigationProp<any>}) {
	const [numberArray, setNumberArray] = useState<string>('');
	const goBackFunc = () => {
		Keyboard.dismiss();
		navigation.goBack();
	};

	const theme = useContext(ThemeContext);

	const checkNumbers = async () => {
		try {
			const number = await AsyncStorage.getItem('number');
			if (number !== null) {
				setNumberArray(number);
			}
		} catch (e: unknown) {
			console.log(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			void checkNumbers();
		},
		[]),
	);
	return (
		<View style={{backgroundColor: theme.backgroundScreen, flex: 1, minHeight: Math.round(screenHeight), paddingTop: '9%'}}>
			<BackComponent goBackFunc={goBackFunc}/>
			<View style={{height: '100%'}}>
				{numberArray !== '' && <CarInfo />}
				<AddCarNumberComponent addCar = {setNumberArray}/>
				<ChangeCarComponent />
				<DeleteCarNumberComponent deleteCar = {setNumberArray} />
			</View>
		</View>
	);
}
