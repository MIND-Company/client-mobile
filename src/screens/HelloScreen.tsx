import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HelloScreenComponent} from '../components/forHelloScreen/HelloScreenComponent';
import type {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HelloScreen({navigation}: {navigation: NavigationProp<any>}) {
	const goAuthScreen = () => {
		navigation.navigate('Authorization');
	};

	const goRegistrationScreen = () => {
		navigation.navigate('Registration');
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#ECECEC'}}>
			<View style={{alignItems: 'center', justifyContent: 'center', marginTop: '2%'}}>
				<Image source={require('../images/logo.png')} style={{width: 80, height: 80}}/>
			</View>
			<View style={styles.wrapper}>
				<Swiper autoplay={true} autoplayTimeout={5} loop={false} activeDot={<View style={{backgroundColor: 'rgba(138, 56, 161, 0.4)', width: 25, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />} dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}>
					<HelloScreenComponent headingText={'Почему мы?'} h2Text={ 'У нас полностью бесшовная система'} image={'First'}/>
					<HelloScreenComponent headingText={'Почему мы?'} h2Text={ 'У нас полностью бесшовная система'} image={'Second'}/>
					<HelloScreenComponent headingText={'Почему мы?'} h2Text={ 'У нас полностью бесшовная система'} image={'Third'}/>
				</Swiper>
			</View>
			<TouchableWithoutFeedback style={styles.buttonStyle} onPress={goRegistrationScreen} >
				<Text style={styles.buttonText}>Зарегистрироваться</Text>
			</TouchableWithoutFeedback>
			<View style={styles.bottomTextView}>
				<Text style={[{color: 'gray', fontSize: 15, fontWeight: '400'}]}> Вы уже имеете аккаунт? </Text>
				<TouchableWithoutFeedback onPress={goAuthScreen}>
					<Text style={[{color: '#886DEC', fontSize: 17, fontWeight: 'bold'}]}>Войти</Text>
				</TouchableWithoutFeedback>
			</View>
			<StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={true}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		color: 'white',
		fontSize: 19,
		fontWeight: '400',
	},
	bottomTextView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '8%',
	},
	wrapper: {
		// BorderStyle: 'solid',
		// borderColor: '#886DEC',
		// borderWidth: 5,
		// borderRadius: 20,
		width: '95%',
		alignSelf: 'center',
		marginTop: '5%',
		height: '60%',
	},
	buttonStyle: {
		elevation: 7,
		marginTop: '5%',
		borderRadius: 10,
		backgroundColor: '#886DEC',
		alignSelf: 'center',
		paddingHorizontal: 18,
		paddingVertical: 12,
	},
});

