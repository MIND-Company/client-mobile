import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../../utils/updateAccessTokenFunction';
import Modal from 'react-native-modal/dist/modal';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {SuccessModal} from './SuccessModal';
import {WarningModal} from './WarningModal';
import AddIcon from 'react-native-vector-icons/FontAwesome';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import {TextInput} from 'react-native-paper';
import {TextInputForAddCar} from './TextInputForAddCar';
import {bazeUrl} from '../../../utils/bazeURL';

const AddCarNumberComponent = (props: {addCar: (value) => void}) => {
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);
	const [dropdownError, setDropdownError] = useState(false);
	const [textError, setTextError] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [markValue, setMarkValue] = useState('');
	const [colorValue, setColorValue] = useState('');
	const [modelValue, setModelValue] = useState('');
	const [numberValue, setNumberValue] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);

	const addCarNumber = async () => {
		try {
			setLoad(true);
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch(bazeUrl + '/api/cars/', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					number: numberValue,
					brand: markValue,
					model: modelValue,
					color: colorValue,
				}),
			});
			if (request.status >= 200 || request.status < 200) {
				await AsyncStorage.setItem('number', numberValue);
				props.addCar(numberValue);
				setShowSuccessModal(!showSuccessModal);
			}

			if (request.status === 401) {
				await updateAccessToken(setError, addCarNumber(), setTextError);
			}

			if (request.status === 500) {
				setError(true);
				setTextError('Ошибка сервера');
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			clearInput();
			setLoad(false);
			setShowAddModal(!showAddModal);
		}
	};

	const checkNumber = async () => {
		const number = await AsyncStorage.getItem('number');
		if (number === null) {
			setShowAddModal(true);
		} else {
			setShowErrorModal(!showErrorModal);
		}
	};

	const clearInput = () => {
		setNumberValue('');
		setColorValue('');
		setMarkValue('');
		setModelValue('');
		setDropdownError(false);
	};

	const checkModal = async () => {
		if (markValue === '' || colorValue === '' || modelValue === '' || numberValue === '') {
			setDropdownError(true);
			setTextError('Не все поля заполнены');
		} else if (markValue.length < 3) {
			setDropdownError(true);
			setTextError('Минимальная длина марки - 3');
		} else if (colorValue.length < 5) {
			setDropdownError(true);
			setTextError('Минимальная длина цвета - 5');
		} else if (numberValue.length < 8) {
			setDropdownError(true);
			setTextError('Минимальная длина номера - 8');
		} else if (!(/^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui.exec(numberValue))) {
			setDropdownError(true);
			setTextError('Введите номер формата А000АА777');
		} else {
			await addCarNumber();
		}
	};

	return (
		<View style={[styles.view, {marginBottom: '3%'}]}>
			<Modal isVisible={showAddModal} backdropOpacity={0.2} onSwipeComplete={() => {
				clearInput();
				setShowAddModal(!showAddModal);
			}} swipeDirection= 'left' statusBarTranslucent={true} style={{marginVertical: 0}} >
				<View style={styles.deleteModalView}>
					{load && <View style={styles.loading}>
						<ActivityIndicator size={50} color={'black'}/>
					</View>}
					<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '4%', marginTop: '2%', position: 'absolute'}]}
						onPress={() => {
							clearInput();
							setShowAddModal(!showAddModal);
						}}>
						<CloseIcon name='close' size={28} color= '#886DEC' />
					</TouchableOpacity>

					<View style={{marginTop: '7%', marginBottom: '2%'}}>
						<Text style={{fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.5), color: 'black'}}>Добавить номер т/с</Text>
					</View>
					<View style={styles.textInputView}>
						<TextInputForAddCar maxLength={10} placeholder={'Введите марку'} label={'Марка'} value={markValue} setValue={value => {
							setMarkValue(value);
						}} focus={() => {
							setDropdownError(false);
						}} />
					</View >
					<View style={styles.textInputView}>
						<TextInputForAddCar maxLength={15} placeholder={'Введите модель'} label={'Модель'} value={modelValue} setValue={value => {
							setModelValue(value);
						}} focus={() => {
							setDropdownError(false);
						}} />
					</View >
					<View style={styles.textInputView}>
						<TextInputForAddCar maxLength={10} placeholder={'Введите цвет'} label={'Цвет'} value={colorValue} setValue={value => {
							setColorValue(value);
						}} focus={() => {
							setDropdownError(false);
						}} />
					</View >
					<View style={styles.textInputView}>
						<TextInputForAddCar maxLength={9} placeholder={'Введите номер'} label={'Номер'} value={numberValue} setValue={value => {
							setNumberValue(value);
						}} focus={() => {
							setDropdownError(false);
						}} />
					</View >
					<View style={styles.deleteModalButtonView}>
						<TouchableOpacity onPress={checkModal} style={styles.deleteModalButton}>
							<Text style={{textAlign: 'center', fontSize: 17, color: '#fff8ff', fontFamily: 'Montserrat-Bold'}}>Добавить</Text>
						</TouchableOpacity>
					</View>
					{dropdownError && <Text style={{marginTop: '2%', textAlign: 'center', fontSize: responsiveFontSize(1.8), color: '#de4b4b', fontFamily: 'Montserrat-Bold'}}> {textError} </Text>}
				</View>
			</Modal>
			<TouchableOpacity onPress={async () => checkNumber()} style={[styles.addCarNumberButton]}>
				<Text style={styles.addCarNumberButtonText}>Добавить номер т/с</Text>
				<AddIcon name='plus' size={28} color= 'black' />
			</TouchableOpacity>
			<SuccessModal showFunc={showSuccessModal} setShowFunc={setShowSuccessModal} >
				<Text style={[styles.modalHeadingText, {color: 'rgb(123,144,135)'}]}>Номер успешно добавлен</Text>
			</SuccessModal>
			<WarningModal showFunc={showErrorModal} setShowFunc={setShowErrorModal} >
				<Text style={styles.modalHeadingText}>У вас уже есть машина!</Text>
			</WarningModal>
			{error && <Text style={{marginTop: '4%', fontSize: 16, fontWeight: '500', color: 'red'}}>{textError}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	textInputView: {
		alignItems: 'center',
		marginTop: '3%',
		width: '90%',
	},
	modalHeadingText: {
		fontSize: responsiveFontSize(2.2),
		fontFamily: 'Montserrat-Bold',
		color: 'rgb(157,115,57)',
		textAlign: 'center',
	},
	deleteModalButtonView: {
		marginTop: '5%',
		alignSelf: 'center',
	},
	deleteModalButton: {
		backgroundColor: '#886eed',
		paddingHorizontal: '6%',
		borderRadius: 8,
		padding: '2%',
		minWidth: '30%',
	},
	deleteModalView: {
		alignItems: 'center',
		width: '100%',
		height: '52%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 2,
	},
	loading: {
		borderRadius: 16,
		zIndex: 100,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.2,
		alignSelf: 'center',
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	view: {
		marginVertical: '1%',
		backgroundColor: '#effcf5',
		alignSelf: 'center',
		width: '95%',
		height: responsiveHeight(8),
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	addCarNumberButtonText: {
		fontFamily: 'Montserrat-Bold',
		textAlign: 'left',
		marginLeft: '5%',
		color: '#544d4d',
		fontSize: 19,
	},
	addCarNumberButton: {
		paddingRight: '7%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
});

export default AddCarNumberComponent;
