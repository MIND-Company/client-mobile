import {
	Text,
	Keyboard,
	View,
	TouchableOpacity,
	PermissionsAndroid,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, CameraType} from 'react-native-camera-kit';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {TextInput} from 'react-native-paper';
import {WarningModal} from '../../components/forHomeScreen/forAddCarScreen/WarningModal';

export default function ScanQRcodeScreen({navigation}: {navigation: NavigationProp<any>}) {
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const [statusOk, setStatusOk] = useState<boolean>(false);
	const [oldStatusOk, setOldStatusOk] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(true);
	const [qrNumber, setQrNumber] = useState<string>('');

	const goBackFunc = () => {
		setQrNumber('');
		Keyboard.dismiss();
		navigation.goBack();
	};

	const requestCameraPermission = async () => {
		try {
			const granted = PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.CAMERA,
			).then(response => {
				if (response !== 'denied') {
					setStatusOk(true);
					setOldStatusOk(true);
				} else {
					setStatusOk(false);
					setOldStatusOk(false);
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			setLoad(false);
		}
	};

	useEffect(() => {
		void requestCameraPermission();
	}, []);

	const checkQr = code => {
		setLoad(true);
		try {
			if (code.length >= 20 && (/^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui.exec(code.split(':')[1]))) {
				setQrNumber('');
				navigation.navigate('AddCar', code);
			} else {
				setQrNumber('');
				setShowErrorModal(true);
			}
		} finally {
			setLoad(false);
		}
	};

	return (
		<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
			<BackComponent goBackFunc={goBackFunc}/>
			{load ? <ActivityIndicator size={'large'} color={'#886DEC'} />
				: <>
					{ !statusOk ? <View style={styles.textInputView}>
						<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
							<Text style={styles.mainTextStyle}>Введите номер с чека:</Text>
						</View>
						<TextInput
							value={qrNumber}
							onChangeText={value => {
								setQrNumber(value);
							}}
							maxLength={22}
							placeholderTextColor = {'gray'}
							placeholder = {'Введите номер с QR-кода'}
							outlineColor = {'#b2a9d6'}
							outlineStyle = {{borderRadius: 12, borderWidth: 2}}
							mode = {'outlined'}
							style = {{width: '90%', backgroundColor: '#fafbff', marginTop: '10%'}}
							label ={'Номер'}
						/>
						{oldStatusOk && <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'black', borderColor: 'white'}]} onPress={() => {
							void requestCameraPermission();
							setStatusOk(true);
						}}>
							<Text style={styles.buttonTextStyle}>Считать QR-код камерой</Text>
						</TouchableOpacity>
						}
						<TouchableOpacity onPress={(() => {
							checkQr(qrNumber);
						})} style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>Далее</Text>
						</TouchableOpacity>
					</View >
						: <>
							<View style={[{alignSelf: 'center', marginTop: '25%'}]}>
								<Text style={styles.mainTextStyle}>Поднесите QR-код к камере</Text>
							</View>
							<Camera
								style={{width: '90%', height: '45%', alignSelf: 'center', marginTop: '5%'}}
								cameraType={CameraType.Back}
								scanBarcode={true}
								onReadCode={(event: any) => {
									checkQr(event.nativeEvent.codeStringValue);
								}}
							/>
							<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
								<Text style={[styles.buttonTextStyle, {color: 'gray'}]}>Или</Text>
							</View>
							<TouchableOpacity style={styles.buttonStyle} onPress={() => {
								setStatusOk(false);
							}}>
								<Text style={styles.buttonTextStyle}>Ввести код вручную</Text>
							</TouchableOpacity>
						</>}

				</>}
			{showErrorModal && <WarningModal showFunc={showErrorModal} setShowFunc={setShowErrorModal}>
				<Text style={styles.modalHeadingText}>Неправильный код</Text>
			</WarningModal>}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	modalHeadingText: {
		fontSize: responsiveFontSize(2.2),
		fontFamily: 'Montserrat-Bold',
		color: 'rgb(157,115,57)',
		textAlign: 'center',
	},
	mainTextStyle: {
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.4),
		color: '#886DEC',
	},
	buttonTextStyle: {
		color: 'white',
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.3),
	},
	textInputView: {
		alignItems: 'center',
		marginTop: '3%',
		width: '90%',
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
});
