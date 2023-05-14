import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../../utils/updateAccessTokenFunction';
import Modal from 'react-native-modal';
import CloseModelIcon from 'react-native-vector-icons/AntDesign';
import {WarningModal} from './WarningModal';
import {SuccessModal} from './SuccessModal';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import {bazeUrl} from '../../../utils/bazeURL';

const DeleteCarNumberButtonText = (props: {deleteCar: (value) => void}) => {
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);
	const [textError, setTextError] = useState('');
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [data, setData] = useState('');

	const deleteCarNumber = async () => {
		try {
			setError(false);
			setLoad(true);
			const token = await AsyncStorage.getItem('access_token');
			const number = data;
			if (number === null) {
				setShowErrorModal(!showErrorModal);
			} else {
				const request = await fetch(bazeUrl + '/api/cars/' + number + '/', {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + token,
					},
				});
				if (request.status === 204) {
					await AsyncStorage.removeItem('number');
					props.deleteCar('');
					setShowSuccessModal(true);
				}

				if (request.status === 401) {
					await updateAccessToken(setError, deleteCarNumber(), setTextError);
				}

				if (request.status === 500) {
					setError(true);
					setTextError('Ошибка сервера');
				}
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setLoad(false);
			setShowDeleteModal(false);
		}
	};

	const checkCar = async () => {
		const number = await AsyncStorage.getItem('number');
		if (number === null) {
			setShowErrorModal(!showErrorModal);
		} else {
			setData(number);
			setShowDeleteModal(!showDeleteModal);
		}
	};

	return (
		<View style={styles.view}>
			<Modal isVisible={showDeleteModal} backdropOpacity={0.6} onSwipeComplete={() => {
				setShowDeleteModal(!showDeleteModal);
			}} swipeDirection= 'left' statusBarTranslucent={true} style={{marginVertical: 0}}>
				<View style={styles.deleteModalView}>
					{load && <View style={styles.loading}>
						<ActivityIndicator size={50} color={'black'}/>
					</View>}
					<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '4%', marginTop: '2%'}]}
						onPress={() => {
							setShowDeleteModal(!showDeleteModal);
						}}>
						<CloseModelIcon name='close' size={28} color= '#886DEC' />
					</TouchableOpacity>
					<Text style={styles.deleteModalHeadingText}>Удаление номера</Text>
					<View style={styles.numberView}>
						<View style={styles.numberCarView}>
							<Text style={[styles.numberText, {color: 'black'}]}> {data.slice(0, 1).toUpperCase()}<Text style={{fontSize: responsiveFontSize(3.3)}}>{data.slice(1, 4).toUpperCase()}</Text>{data.slice(4, 6).toUpperCase()} </Text>
						</View>
						<View style={ {height: '100%', width: '30%'}}>
							<Text style={[styles.numberRegionText, {color: 'black'}]}> {data.slice(6, 9).toUpperCase()} </Text>
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
					<View style={{width: '95%', alignSelf: 'center', marginTop: '3%'}}>
						<Text style={{fontFamily: 'Montserrat-SemiBold'}}>
							<Text style={{color: '#886DEC'}}>Примечание:</Text> после удаления вам придётся снова получить напечатанный чек с Qr-кодом на парковке с нашей системой
						</Text>
					</View>
					<View style={styles.deleteModalButtonView}>
						<TouchableOpacity onPress={async () => deleteCarNumber()} style={[styles.deleteModalButton, {backgroundColor: '#de4b4b'}]}>
							<Text style={{textAlign: 'center', fontSize: 17, color: 'white', fontFamily: 'Montserrat-SemiBold'}}>Удалить</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<WarningModal showFunc={showErrorModal} setShowFunc={setShowErrorModal} >
				<Text style={styles.modalHeadingText}>У вас ещё нет номера!</Text>
			</WarningModal>
			<SuccessModal showFunc={showSuccessModal} setShowFunc={setShowSuccessModal} >
				<Text style={[styles.modalHeadingText, {color: 'rgb(123,144,135)'}]}>Номер успешно удалён</Text>
			</SuccessModal>

			<TouchableOpacity onPress={async () => checkCar()} style={[styles.deleteCarNumberButton]}>
				<Text style={styles.deleteCarNumberButtonText}>Удалить номер т/с</Text>
				<DeleteIcon name='delete' size={28} color= 'black' />
			</TouchableOpacity>
			{error && <Text style={{marginTop: '4%', fontSize: 16, fontWeight: '500', color: 'red'}}>{textError}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
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
		marginTop: '5%',
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
	loading: {
		zIndex: 2,
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
	deleteModalButtonView: {
		marginTop: '3%',
		alignSelf: 'center',
	},
	deleteModalButton: {
		backgroundColor: '#886eed',
		paddingHorizontal: '6%',
		borderRadius: 14,
		padding: '2%',
		minWidth: '30%',
	},
	dropdown: {
		marginTop: '6%',
		alignSelf: 'center',
		width: '90%',
		height: 50,
		borderColor: 'gray',
		borderWidth: 2,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	deleteModalHeadingText: {
		fontFamily: 'Montserrat-ExtraBold',
		fontSize: responsiveFontSize(2.1),
		color: '#544d4d',
		textAlign: 'center',
	},
	deleteModalView: {
		width: '100%',
		height: '34%',
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 2,
	},
	modalHeadingText: {
		fontSize: responsiveFontSize(2.3),
		fontFamily: 'Montserrat-Bold',
		color: 'rgb(157,115,57)',
		textAlign: 'center',
	},
	view: {
		marginVertical: '1%',
		backgroundColor: '#fbeff1',
		height: responsiveHeight(8),
		borderRadius: 12,
		alignSelf: 'center',
		width: '95%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	deleteCarNumberButtonText: {
		fontFamily: 'Montserrat-Bold',
		fontWeight: '500',
		color: '#544d4d',
		fontSize: 19,
		textAlign: 'left',
		marginLeft: '5%',
	},
	deleteCarNumberButton: {
		paddingRight: '7%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
});

export default DeleteCarNumberButtonText;
