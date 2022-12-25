import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HelloScreenComponent} from '../components/forHelloScreen/HelloScreenComponent';
import type {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function HelloScreen({navigation}: {navigation: NavigationProp<any>}) {
	const goAuthScreen = () => {
		navigation.navigate('Authorization');
	};

	const goRegistrationScreen = () => {
		navigation.navigate('Registration');
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#ECECEC'}}>
			<View style={{alignItems: 'center', justifyContent: 'center', marginTop: '3%'}}>
				<Image source={require('../images/logo.png')} style={{width: 65, height: 65}}/>
			</View>
			<View style={styles.wrapper}>
				<Swiper autoplay={true} autoplayTimeout={5} loop={false}>
					<HelloScreenComponent headingText={'1 шаг:'} h2Text={ 'Зарегистрируйтесь и привяжите номер своего т/с и банковскую карту'} image={'First'}/>
					<HelloScreenComponent headingText={'2 шаг:'} h2Text={ 'Убедитесь, что номер автомобиля читаем и заезжайте на парковку'} image={'Second'}/>
					<HelloScreenComponent headingText={'3 шаг:'} h2Text={ 'Выезжайте с парковки, оплата спишется с вашей карты автоматически'} image={'Third'}/>
				</Swiper>
			</View>
			<TouchableWithoutFeedback style={styles.buttonStyle} onPress={goRegistrationScreen} >
				<Text style={styles.buttonText}>Зарегистрироваться</Text>
			</TouchableWithoutFeedback>
			<View style={styles.bottomTextView}>
				<Text style={[{color: 'gray', fontSize: 15, fontFamily: 'Montserrat-Medium'}]}> Вы уже имеете аккаунт? </Text>
				<TouchableWithoutFeedback onPress={goAuthScreen}>
					<Text style={[{color: '#886DEC', fontSize: 17, fontFamily: 'Montserrat-Medium'}]}>Войти</Text>
				</TouchableWithoutFeedback>
			</View>
			<StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		fontFamily: 'Montserrat-Medium',
		color: 'white',
		fontSize: responsiveFontSize(2.3),
		fontWeight: '400',
	},
	bottomTextView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '9%',
	},
	wrapper: {
		// BorderStyle: 'solid',
		// borderColor: '#886DEC',
		// borderWidth: 5,
		// borderRadius: 20,
		width: '95%',
		alignSelf: 'center',
		marginTop: '1%',
		height: '60%',
	},
	buttonStyle: {
		elevation: 7,
		marginTop: '8%',
		borderRadius: 10,
		backgroundColor: '#886DEC',
		alignSelf: 'center',
		paddingHorizontal: 18,
		paddingVertical: 12,
	},
});

