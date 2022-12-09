import React, {useContext, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import EmailAndPhoneComponent from '../components/forProfileScreen/EmailAndPhoneComponent';
import NumberAndCardComponent from '../components/forProfileScreen/NumberAndCardComponent';
import StatsComponent from '../components/forProfileScreen/StatsComponent';
import ThemeAndLanguageComponent from '../components/forProfileScreen/ThemeAndLanguageComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);

	const goChangeCard = () => {
		navigation.navigate('HomeNavigations', {screen: 'AddCard'});
	};

	const goChangeNumber = () => {
		navigation.navigate('HomeNavigations', {screen: 'AddCar'});
	};

	const goStats = () => {
		navigation.navigate('Stats');
	};

	const goChangeLanguage = () => {
		navigation.navigate('ChangeLanguage');
	};

	const logOut = async () => {
		await AsyncStorage.clear();
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{name: 'Authorization'}],
			}),
		);
	};

	return (
		<ScrollView style={[{width: '100%', backgroundColor: theme.backgroundScreen}]}>
			<EmailAndPhoneComponent bg = {theme.backgroundComponent} textColor = {theme.textColor}/>
			<NumberAndCardComponent func={goChangeCard} secondFunc={goChangeNumber}/>
			<StatsComponent func={goStats} />
			<ThemeAndLanguageComponent />
			<View style={[{marginBottom: '3%', alignItems: 'center'}]}>
				<TouchableOpacity style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]} onPress={logOut}>
					<Text style={[{fontSize: 20, fontWeight: 'bold', color: '#886DEC'}]}> Выйти </Text>
					<Icon name='logout' size={26} color='#886DEC' style={[{marginLeft: '1%'}]}/>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
