import React, {useContext} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import EmailAndPhoneComponent from '../components/forProfileScreen/EmailAndPhoneComponent';
import ProfileButtonComponent from '../components/forProfileScreen/ProfileButtonComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ProfileScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);

	const goChangeCard = () => {
		navigation.navigate('HomeNavigations', {screen: 'AddCard'});
	};

	const goChangeNumber = () => {
		navigation.navigate('HomeNavigations', {screen: 'RefactorCar'});
	};

	const goStats = () => {
		navigation.navigate('Stats');
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
		<SafeAreaView style={{height: '100%', backgroundColor: theme.backgroundScreen}}>
			<ScrollView>
				<EmailAndPhoneComponent bgColor = {theme.backgroundComponent} textColor = {theme.textColor}/>
				<ProfileButtonComponent cardFunc={goChangeCard} numberFunc={goChangeNumber} statsFunc={goStats}/>
				<View style={[{marginTop: '2%', marginBottom: '2%', alignItems: 'center'}]}>
					<TouchableOpacity style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]} onPress={logOut}>
						<Text style={[{fontSize: 20, fontWeight: 'bold', color: '#886DEC'}]}> Выйти </Text>
						<Icon name='logout' size={26} color='#886DEC' style={[{marginLeft: '1%'}]}/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
