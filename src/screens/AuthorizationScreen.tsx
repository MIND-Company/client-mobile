import {StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar, ActivityIndicator, Keyboard} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../components/forAuth/useAuth';
import TextInputComponent from '../components/forAuthorizationAndRegistrationScreen/TextInputComponent';
import MainButton from '../components/forAuthorizationAndRegistrationScreen/MainButton';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {Loader} from '@ermolaev/mind-ui';
import {screenHeight} from '../utils/screenSize';

export default function AuthorizationScreen({navigation}: {navigation: NavigationProp<any>}) {
	const {isAuth, setIsAuth} = useAuth();
	const [phone, setPhone] = useState<string>('+7');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const [textError, setTextError] = useState<string>('');
	const [load, setLoad] = useState<boolean>(false);

	const authFunction = async () => {
		if (phone !== '' && password !== '') {
			try {
				setLoad(true);
				const request = await fetch('http://188.68.221.169/login/', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						phone,
						password,
					}),
				});
				const data = await request.json() as {access: string; refresh: string};
				if (request.ok) {
					Keyboard.dismiss();
					await AsyncStorage.setItem('access_token', data.access);
					await AsyncStorage.setItem('refresh_token', data.refresh);
					setIsAuth();
					navigation.navigate('MainNavigation');
				} else {
					request.status === 500 ? errorFunc('Ошибка сервера') : errorFunc('Неверный логин или пароль');
				}
			} catch (e: unknown) {
				errorFunc('Ошибка сети');
			} finally {
				setLoad(false);
			}
		} else {
			errorFunc('Не все поля заполнены');
		}
	};

	const errorFunc = (text: string) => {
		setError(true);
		setTextError(text);
		setPassword('');
	};

	const goRegistrationScreen = () => {
		navigation.navigate('Registration');
		setPhone('+7');
		setPassword('');
		setError(false);
	};

	const clearError = () => {
		setError(false);
	};

	const onChangeForNumber = phone => {
		setPhone(phone);
		if (phone === '' || phone === '+') {
			setPhone('+7');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.borderedView}>
				<View style={[{marginBottom: '13%', width: '80%', alignSelf: 'center', marginTop: '15%'}]}>
					<Text style={[{color: 'gray', fontSize: 15}]}>Ещё нет аккаунта?</Text>
					<TouchableOpacity style={[{maxWidth: '65%'}]} onPress={goRegistrationScreen}>
						<Text style={[{color: '#886DEC', fontSize: 15, fontWeight: 'bold'}]}>Зарегистрироваться</Text>
					</TouchableOpacity>
				</View>
				<TextInputComponent type={'numeric'} length={12} clearError={clearError} value={phone} func={phone => {
					onChangeForNumber(phone);
				}} placeholder={'Номер телефона'} secure={false}/>
				<TextInputComponent length={20} clearError={clearError} value={password} func={setPassword} placeholder={'Пароль'} secure={true} />
				{error && <Text style={[{marginBottom: '4%', fontSize: 15, color: '#963939', fontWeight: 'bold', alignSelf: 'center'}]}>{textError}</Text>}
				<MainButton text={'Войти'} func={() => {
					void authFunction();
				}} />
			</View>
			{load && <View style={styles.loading}>
				<ActivityIndicator size={50} color={'black'}/>
			</View>
			}
			<StatusBar backgroundColor='transparent' translucent={true} />
		</View>
	);
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.2,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	borderedView: {
		marginBottom: (screenHeight < 700) ? screenHeight / 7.5 : '10%',
		height: '50%',
		width: '80%',
		borderRadius: 20,
		backgroundColor: '#EFF1FB',
	},
	container: {
		minHeight: Math.round(screenHeight) + (screenHeight / 7.5),
		flex: 1,
		backgroundColor: '#886DEC',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
