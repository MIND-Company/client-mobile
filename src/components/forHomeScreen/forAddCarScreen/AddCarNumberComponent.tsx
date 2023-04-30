import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SuccessModal} from './SuccessModal';
import {WarningModal} from './WarningModal';
import AddIcon from 'react-native-vector-icons/FontAwesome';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

const AddCarNumberComponent = (props: {addCar: (value) => void; goQrScan: () => void}) => {
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);

	const checkNumber = async () => {
		const number = await AsyncStorage.getItem('number');
		if (number === null) {
			props.goQrScan();
		} else {
			setShowErrorModal(!showErrorModal);
		}
	};

	return (
		<View style={[styles.view, {marginBottom: '3%'}]}>
			<TouchableOpacity onPress={async () => checkNumber()} style={[styles.addCarNumberButton]}>
				<Text style={styles.addCarNumberButtonText}>Добавить номер т/с</Text>
				<AddIcon name='plus' size={28} color= 'black' />
			</TouchableOpacity>
			<WarningModal showFunc={showErrorModal} setShowFunc={setShowErrorModal} >
				<Text style={styles.modalHeadingText}>У вас уже есть машина!</Text>
			</WarningModal>
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
