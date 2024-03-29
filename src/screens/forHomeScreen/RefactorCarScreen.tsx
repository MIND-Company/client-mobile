import {Keyboard, View, Text} from 'react-native';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import Exclamation from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function RefactorCarScreen({navigation}: {navigation: NavigationProp<any>}) {
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
			} else {
				setNumberArray('');
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

	const goQrScreen = () => {
		navigation.navigate('ScanQRcode');
	};

	return (
		<SafeAreaView style={{backgroundColor: theme.backgroundScreen, flex: 1, minHeight: Math.round(screenHeight), paddingTop: '9%'}}>
			<BackComponent goBackFunc={goBackFunc}/>
			<View style={{height: '100%'}}>
				{numberArray !== '' && <CarInfo />}
				<AddCarNumberComponent addCar = {setNumberArray} goQrScan={goQrScreen}/>
				<ChangeCarComponent />
				<DeleteCarNumberComponent deleteCar = {setNumberArray} />
				<View style={{width: '100%', height: '0.3%', backgroundColor: '#B00000', marginTop: numberArray !== '' ? '59%' : '82%'}}/>
				<View style={{flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: '3%'}}>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2)}}><Text style={{fontFamily: 'Montserrat-Bold', color: '#B00000'}}>Важно:</Text> Чтобы добавить номер своего т/с вам надо <Text style={{color: '#886DEC'}}>заехать</Text> на любую парковку с нашей системой и <Text style={{color: '#886DEC'}}>получить</Text> напечатанный чек с Qr-кодом </Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
