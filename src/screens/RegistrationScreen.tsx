import {StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../components/forAuthorizationAndRegistrationScreen/TextInputComponent';
import MainButton from '../components/forAuthorizationAndRegistrationScreen/MainButton';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';

export default function RegistrationScreen({navigation}: {navigation: NavigationProp<any>}) {
	const [phone, setPhone] = useState<string>('');
	const [firstPassword, setFirstPassword] = useState<string>('');
	const [secondPassword, setSecondPassword] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const [textError, setTextError] = useState<string>('');

	const registrationFunc = async () => {
		if (phone !== '' && firstPassword !== '' && secondPassword !== '') {
			try {
				const request = await fetch('http://188.68.221.169/register/', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						phone: phone,
						password: firstPassword,
						password_retype: secondPassword,
					}),
				});
				const data = await request.json();
				if (request.ok) {
					navigation.goBack();
					// Alert.alert('Вы зарегистрированы', 'Окей', [
					// 	{text: 'OK', onPress() {
					// 		navigation.goBack();
					// 	}},
					// ]);
				} else {
					request.status === 500 ? errorFunc('Ошибка сервера') : errorFunc(data.password[0]);
				}
			} catch (e: unknown) {
				errorFunc('Ошибка сети');
			}
		} else {
			errorFunc('Не все поля заполнены');
		}
	};

	const errorFunc = (text: string) => {
		setError(true);
		setTextError(text);
		setFirstPassword('');
		setSecondPassword('');
	};

	const clearError = () => {
		setError(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.borderedView}>
				<TouchableOpacity style={[{marginBottom: '13%', maxWidth: '35%'}]} onPress={() => {
					navigation.goBack();
				}}>
					<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
						<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
						<Text style={styles.backStyle}>Вернуться</Text>
					</View>
				</TouchableOpacity>
				<TextInputComponent clearError={clearError} value={phone} func={setPhone} placeholder={'Номер телефона'} secure={false} focus={() => setPhone('+7')}/>
				<TextInputComponent clearError={clearError} value={firstPassword} func={setFirstPassword} placeholder={'Пароль'} secure={true} />
				<TextInputComponent clearError={clearError} value={secondPassword} func={setSecondPassword} placeholder={'Повторите пароль'} secure={true}/>
				{error && <Text style={[{marginHorizontal: '4%', marginBottom: '3%', fontSize: 15, color: '#963939', fontWeight: 'bold', alignSelf: 'center'}]}>{textError}</Text>}
				<MainButton text={'Зарегистрироваться'} func={async () => registrationFunc()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	backStyle: {
		color: '#886DEC',
		fontSize: 16,
		fontWeight: 'bold',
	},
	borderedView: {
		marginTop: '-30%',
		height: '50%',
		width: '80%',
		borderRadius: 20,
		backgroundColor: '#EFF1FB',
		paddingTop: '5%',
	},
	container: {
		minHeight: Math.round(Dimensions.get('window').height) + 100,
		flex: 1,
		backgroundColor: '#886DEC',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
