import {Text, Keyboard, View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bazeUrl} from '../../utils/bazeURL';
import {updateAccessToken} from '../../utils/updateAccessTokenFunction';
import {SuccessModal} from '../../components/forHomeScreen/forAddCarScreen/SuccessModal';
import {WarningModal} from '../../components/forHomeScreen/forAddCarScreen/WarningModal';
import Modal from 'react-native-modal';
import ChangeIcon from 'react-native-vector-icons/Foundation';
import CloseModelIcon from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';

export default function AddCarScreen({navigation, route}: {route: any; navigation: NavigationProp<any>}) {
	const [load, setLoad] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
	const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
	const [showNumberModal, setShowNumberModal] = useState<boolean>(false);
	const [modalNumber, setModalNumber] = useState<string>('');

	const code: any = route.params;

	const goBackFunc = () => {
		Keyboard.dismiss();
		setError(false);
		setShowWarningModal(false);
		navigation.goBack();
	};

	const addCar = async () => {
		try {
			setError(false);
			setShowWarningModal(false);
			setLoad(true);
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch(bazeUrl + '/api/add-car/', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					confirmation_code: code,
					number: modalNumber,
				}),
			});
			const data = await request.json();
			if (request.ok) {
				await AsyncStorage.setItem('number', data.number);
				setShowSuccessModal(true);
				setTimeout(() => {
					setShowSuccessModal(false);
					navigation.navigate('RefactorCar');
				}, 3000);
			}

			if (request.status === 400) {
				setShowWarningModal(true);
				setTimeout(() => {
					setShowSuccessModal(false);
					navigation.navigate('RefactorCar');
					setError(false);
				}, 3000);
			}

			if (request.status === 401) {
				await updateAccessToken(setError, addCar(), setErrorText);
			}

			if (request.status === 500) {
				setError(true);
				setErrorText('Ошибка сервера');
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setLoad(false);
		}
	};

	const checkModalNumber = () => {
		if (/^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui.exec(modalNumber)) {
			setShowNumberModal(!showNumberModal);
		} else {
			setModalNumber('');
		}
	};

	return (
		<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
			<Modal isVisible={showNumberModal} backdropOpacity={0.6} onSwipeComplete={() => {
				setShowNumberModal(!showNumberModal);
			}} swipeDirection= 'left' statusBarTranslucent={true} style={{marginVertical: 0}}>
				<View style={styles.modalNumberView}>
					<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '4%', marginTop: '2%'}]}
						onPress={() => {
							setError(false);
							setModalNumber('');
							setShowNumberModal(!showNumberModal);
						}}>
						<CloseModelIcon name='close' size={28} color= '#886DEC' />
					</TouchableOpacity>
					<View style={{alignSelf: 'center'}}>
						<Text style={{fontFamily: 'Montserrat-Bold', color: '#886DEC', fontSize: responsiveFontSize(2.1)}}>Введите номер вашего т.с:</Text>
					</View>
					<TextInput
						value={modalNumber}
						onChangeText={value => {
							setModalNumber(value.toUpperCase());
						}}
						maxLength={9}
						placeholderTextColor = {'gray'}
						placeholder = {'Введите номер т.с'}
						outlineColor = {'#b2a9d6'}
						outlineStyle = {{borderRadius: 12, borderWidth: 2}}
						mode = {'outlined'}
						style = {{width: '90%', backgroundColor: '#fafbff', marginTop: '5%', alignSelf: 'center'}}
						label ={'Регистрационный номер'}
					/>
					<View style={{marginLeft: '5%', marginTop: '3%'}}>
						<Text style={{fontFamily: 'Montserrat-SemiBold', color: 'gray', fontSize: responsiveFontSize(1.8)}}>Номер в формате <Text style={{color: '#886DEC'}}>Х777ХХ777</Text></Text>
					</View>
					<TouchableOpacity style={styles.buttonStyle} onPress={() => {
						checkModalNumber();
					}}>
						<Text style={[styles.buttonTextStyle, {fontSize: responsiveFontSize(2)}]}>Сохранить</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<BackComponent goBackFunc={goBackFunc}/>
			<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
				<Text style={[{alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.5), color: '#886DEC'}]}>Ваш код:</Text>
				<Text style={[{marginTop: '3%', alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.1), color: 'black'}]}>{code}</Text>
			</View>
			<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
				<Text style={[{alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.3), color: '#886DEC'}]}>Введите регистрационный номер:</Text>
				<View style={{flexDirection: 'row', alignSelf: 'center', marginTop: '6%'}}>
					<View style={styles.numberView}>
						<View style={styles.numberCarView}>
							<Text style={[styles.numberText, {color: modalNumber.length < 8 ? '#bbbbbb' : 'black'}]}> {!modalNumber.length > 0 ? 'Х' : modalNumber.slice(0, 1).toUpperCase()}<Text style={{fontSize: responsiveFontSize(3.3)}}>{ modalNumber.length < 3 ? '777' : modalNumber.slice(1, 4).toUpperCase()}</Text>{ modalNumber.length < 5 ? 'ХХ' : modalNumber.slice(4, 6).toUpperCase()} </Text>
						</View>
						<View style={ {height: '100%', width: '30%'}}>
							<Text style={[styles.numberRegionText, {color: modalNumber.length < 8 ? '#bbbbbb' : 'black'}]}> { modalNumber.length < 7 ? '777' : modalNumber.slice(6, 9).toUpperCase()} </Text>
							<View style={ {width: '100%', flexDirection: 'row', justifyContent: 'center', height: '30%'}}>
								<Text style={[styles.numberRegionText, {fontSize: 12}]}> RUS </Text>
								<View style={styles.regionView}>
									<View style={{width: '100%', height: '33%', backgroundColor: 'white'}}>
									</View>
									<View style={{width: '100%', height: '33%', backgroundColor: 'blue'}}>
									</View>
									<View style={{width: '100%', height: '33%', backgroundColor: '#ed1b24'}}>
									</View>
								</View>
							</View>
						</View>
					</View>
					<TouchableOpacity style={{alignSelf: 'center', marginLeft: '3%'}} onPress={() => {
						setShowNumberModal(!showNumberModal);
					}}>
						<ChangeIcon name='pencil' size={36} color= '#886DEC' />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={styles.buttonStyle} onPress={() => {
				modalNumber.length >= 8 ? void addCar() : setError(true); setErrorText('Введите номер');
			}}>
				<Text style={styles.buttonTextStyle}>Добавить</Text>
			</TouchableOpacity>
			{error && <Text style={[{position: 'absolute', marginTop: '100%', fontSize: responsiveFontSize(2.2), color: '#963939', fontWeight: 'bold', alignSelf: 'center'}]}>{errorText}</Text>}
			<View style={[{width: '90%', alignSelf: 'center', marginTop: '85%'}]}>
				<Text selectable={true} style={[{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(1.7)}]}>Если у вас возникли какие-либо вопросы или <Text style={[{color: '#886DEC', fontSize: responsiveFontSize(1.7)}]}>ваш номер определён неправильно</Text>, отправьте запрос в тех. поддержку на почту <Text style={[{color: '#886DEC', fontSize: responsiveFontSize(1.7), textDecorationLine: 'underline'}]}>mindcc@internet.ru</Text></Text>
			</View>
			{showSuccessModal && <SuccessModal showFunc={showSuccessModal} setShowFunc={setShowSuccessModal}>
				<Text style={[styles.modalHeadingText, {color: 'rgb(123,144,135)'}]}>Номер успешно добавлен</Text>
			</SuccessModal>}
			{showWarningModal && <WarningModal showFunc={showWarningModal} setShowFunc={setShowWarningModal}>
				<Text style={styles.modalHeadingText}>Неверный код или номер</Text>
			</WarningModal>}
			{load && <View style={styles.loading}>
				<ActivityIndicator size={50} color={'black'}/>
			</View>
			}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	modalNumberView: {
		width: '100%',
		height: '30%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 2,
	},
	loading: {
		zIndex: 100,
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
	modalHeadingText: {
		fontSize: responsiveFontSize(2.0),
		fontFamily: 'Montserrat-Bold',
		color: 'rgb(157,115,57)',
		textAlign: 'center',
	},
	buttonTextStyle: {
		color: 'white',
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.3),
	},
	buttonStyle: {
		alignSelf: 'center',
		backgroundColor: '#886DEC',
		marginTop: '5%',
		borderColor: '#8000ff',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: '3%',
		paddingVertical: '1%',
	},
	regionView: {
		backgroundColor: 'red',
		width: '40%',
		marginRight: '7%',
		height: '100%',
		borderColor: 'black',
		borderWidth: 1,
	},
	numberCarView: {
		height: '100%',
		width: '70%',
		borderRightColor: 'black',
		borderRightWidth: 2,
		justifyContent: 'center',
	},
	numberRegionText: {
		fontFamily: 'Montserrat-Bold',
		textAlign: 'center',
		fontSize: responsiveFontSize(2.6),
		fontWeight: '400',
		color: 'black',
	},
	numberText: {
		letterSpacing: 1,
		fontFamily: 'Montserrat-ExtraBold',
		textAlign: 'center',
		fontSize: responsiveFontSize(2.9),
		color: 'black',
		marginRight: '1%',
	},
	numberView: {
		alignSelf: 'center',
		borderRadius: 5,
		height: 50,
		flexDirection: 'row',
		width: 190,
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: 'black',
	},
	mainTextStyle: {
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.4),
		color: '#886DEC',
	},
});
