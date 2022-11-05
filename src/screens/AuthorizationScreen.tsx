import {StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../components/forAuth/useAuth';
import TextInputComponent from '../components/forAuthorizationAndRegistrationScreen/TextInputComponent';
import MainButton from '../components/forAuthorizationAndRegistrationScreen/MainButton';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {Loader} from '@ermolaev/mind-ui';

export default function AuthorizationScreen({navigation}: {navigation: NavigationProp<any>}) {
	const {isAuth, setIsAuth} = useAuth();
	const [phone, setPhone] = useState<string>('');
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
						phone: phone,
						password: password,
					}),
				});
				const data = await request.json() as {access: string; refresh: string};
				if (request.ok) {
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
		setPhone('');
		setPassword('');
		setError(false);
	};

	const clearError = () => {
		setError(false);
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
				<TextInputComponent clearError={clearError} value={phone} func={setPhone} placeholder={'Номер телефона'} secure={false} focus={() => {
					setPhone('+7');
				}}/>
				<TextInputComponent clearError={clearError} value={password} func={setPassword} placeholder={'Пароль'} secure={true} />
				{error && <Text style={[{marginBottom: '4%', fontSize: 15, color: '#963939', fontWeight: 'bold', alignSelf: 'center'}]}>{textError}</Text>}
				<MainButton text={'Войти'} func={() => {
					void authFunction();
				}} />
			</View>
			{load && <View style={styles.loading}>
				<ActivityIndicator size={50} color={'black'}/>
			</View>
			}
			<StatusBar backgroundColor='#886DEC' barStyle='dark-content' translucent={false}/>
		</View>
	);
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 100,
		opacity: 0.1,
		backgroundColor: 'gray',
		justifyContent: 'center',
		alignItems: 'center',
	},
	borderedView: {
		marginTop: '-30%',
		height: '50%',
		width: '80%',
		borderRadius: 20,
		backgroundColor: '#EFF1FB',
	},
	container: {
		minHeight: Math.round(Dimensions.get('window').height) + 100,
		flex: 1,
		backgroundColor: '#886DEC',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
