import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	Alert,
	ActivityIndicator,
	Modal,
	Pressable,
	Keyboard,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TextInputComponent from '../components/forAuthorizationAndRegistrationScreen/TextInputComponent';
import MainButton from '../components/forAuthorizationAndRegistrationScreen/MainButton';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import ModalForRegistration from '../components/forAuthorizationAndRegistrationScreen/ModalForRegistration';

export default function RegistrationScreen({navigation}: {navigation: NavigationProp<any>}) {
	const [phone, setPhone] = useState<string>('+7');
	const [firstPassword, setFirstPassword] = useState<string>('');
	const [secondPassword, setSecondPassword] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const [textError, setTextError] = useState<string>('');
	const [load, setLoad] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState(false);
	const registrationFunc = async () => {
		if (phone !== '' && firstPassword !== '' && secondPassword !== '') {
			setLoad(true);
			try {
				Keyboard.dismiss();
				const request = await fetch('http://188.68.221.169/register/', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						phone,
						password: firstPassword,
						password_retype: secondPassword,
					}),
				});
				const data = await request.json();
				console.log(data);
				const message = data.phone ? (data.phone[0][0] === 'П' ? data.phone[0] : 'Введите номер формата +7xxxxxxxxxx') : (data.password[0].indexOf('common') !== -1 ? 'Пароль слишком простой' : (data.password[0][0] === 'В' ? 'Пароли не совпадают' : 'Минимальная длина пароля - 8 символов'));
				if (request.ok) {
					setModalVisible(true);
				} else {
					request.status === 500 ? errorFunc('Ошибка сервера') : errorFunc(message);
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
		setFirstPassword('');
		setSecondPassword('');
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

	const goBackFunc = () => {
		navigation.goBack();
	};

	const ErrorComponent = (props: {textError: string}) => (
		<View style={[{alignItems: 'center', justifyContent: 'center'}]}>
			<Text style={[{textAlign: 'center', marginHorizontal: '4%', marginBottom: '3%', fontSize: 15, color: '#963939', fontWeight: 'bold', alignSelf: 'center'}]}>{textError}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{/*<ModalForRegistration setFunc={setModalVisible} modal={modalVisible} back={() => navigation.goBack}/>*/}
			<Modal
				statusBarTranslucent={true}
				animationType='none'
				transparent={true}
				visible={modalVisible}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalHeadingText}>Успешно!</Text>
						<Text style={styles.modalText}>Вы успешно зарегистрировались!</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setModalVisible(!modalVisible);
								navigation.goBack();
							}}
						>
							<Text style={[{color: 'white', fontSize: 15, fontWeight: '500'}]}>Окей</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<View style={styles.borderedView}>
				<TouchableOpacity style={[{marginBottom: '13%', maxWidth: '35%'}]} onPress={() => {
					navigation.goBack();
				}}>
					<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
						<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
						<Text style={styles.backStyle}>Вернуться</Text>
					</View>
				</TouchableOpacity>
				<TextInputComponent length={12} type={'numeric'} clearError={clearError} value={phone} func={phone => {
					onChangeForNumber(phone);
				}} placeholder={'Номер телефона'} secure={false}/>
				<TextInputComponent length={20} clearError={clearError} value={firstPassword} func={setFirstPassword} placeholder={'Пароль'} secure={true} />
				<TextInputComponent length={20} clearError={clearError} value={secondPassword} func={setSecondPassword} placeholder={'Повторите пароль'} secure={true}/>
				{error && <ErrorComponent textError={textError}/>}
				<MainButton text={'Зарегистрироваться'} func={async () => registrationFunc()} />
			</View>
			{load && <View style={styles.loading}>
				<ActivityIndicator size={50} color={'black'}/>
			</View>
			}
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
	centeredView: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		height: '30%',
		width: '75%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		marginTop: '13%',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		paddingHorizontal: 30,
		backgroundColor: '#886DEC',
	},
	modalHeadingText: {
		marginTop: '6%',
		fontWeight: 'bold',
		fontSize: 22,
		color: '#886DEC',
		textAlign: 'center',
	},
	modalText: {
		marginTop: '11%',
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 20,
		textAlign: 'center',
	},
});
