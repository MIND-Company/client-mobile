import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {screenHeight} from '../../utils/screenSize';
import TextInputComponent from '../forAuthorizationAndRegistrationScreen/TextInputComponent';
import Modal from 'react-native-modal';

export default function EmailAndPhoneComponent(props: {bg: string; textColor: string}) {
	const [mainEmail, setMainEmail] = useState<string>('-');
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const clearError = () => {
		setError(false);
	};

	const emailFunc = () => {
		if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(email))) {
			setError(true);
			setErrorText('Некорректный email');
		} else {
			setError(false);
			setMainEmail(email);
			setModalVisible(!modalVisible);
		}
	};

	return (
		<View style={[styles.emailAndPhoneView, {backgroundColor: props.bg}]}>
			<Modal isVisible={modalVisible} onSwipeComplete={() => setModalVisible(!modalVisible)} swipeDirection='left' statusBarTranslucent={true}>
				<View style={styles.modalView}>
					<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '4%', marginTop: '3%'}]} onPress={() => {
						setModalVisible(!modalVisible);
					}}>
						<CloseIcon name='close' size={28} color='#886DEC'/>
					</TouchableOpacity>
					<Text style={styles.modalHeadingText}>Введите новый адрес электронной почты</Text>
					<View style={[{width: '100%', marginTop: '10%'}]}>
						<TextInputComponent type={'email-address'} length={25} clearError={clearError} value={email} func={setEmail} secure={false} placeholder={'Новый email'} />
					</View>
					{error && <Text style={[{marginTop: '7%', marginBottom: '-3%', fontWeight: '400', color: 'red', fontSize: 16, textAlign: 'center'}]}>{errorText}</Text>}
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							emailFunc();
							// Props.back;
						}}
					>
						<Text style={[{color: 'white', fontSize: 15, fontWeight: '500'}]}>Сохранить</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<Text style={styles.textStyle}><Text style={[{color: props.textColor}]}>Номер телефона:</Text> +79223811755</Text>
			<Text style={styles.textStyle}><Text style={[{color: props.textColor}]}>Электронная почта:</Text> {mainEmail}</Text>
			<TouchableOpacity style={[{width: '35%', alignSelf: 'center'}]} onPress={() => {
				setModalVisible(!modalVisible);
			}}>
				<View style={styles.changeView}>
					<Text style={[{color: '#886DEC', fontWeight: '500', fontSize: 16}]}>Изменить</Text>
					<Icon name='edit' size={22} color='#886DEC' style={[{marginLeft: '4%'}]}/>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		fontWeight: '400',
		color: '#7d746d',
		fontSize: 18,
		marginLeft: '8%',
		marginRight: '2%',
	},
	changeView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	emailAndPhoneView: {
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		marginTop: '3%',
		alignSelf: 'center',
		justifyContent: 'space-evenly',
		height: screenHeight / 3.75,
		width: '90%',
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	modalView: {
		alignSelf: 'center',
		height: '35%',
		width: '85%',
		backgroundColor: 'white',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		alignItems: 'center',
	},
	button: {
		marginTop: '9%',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		paddingHorizontal: 30,
		backgroundColor: '#886DEC',
	},
	modalHeadingText: {
		marginTop: '2%',
		fontWeight: 'bold',
		fontSize: 18,
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
