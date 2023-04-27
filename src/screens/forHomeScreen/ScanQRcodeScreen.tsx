import {Alert, Text, Keyboard, View, TouchableOpacity} from 'react-native';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, CameraType} from 'react-native-camera-kit';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function ScanQRcodeScreen({navigation}: {navigation: NavigationProp<any>}) {
	const goBackFunc = () => {
		Keyboard.dismiss();
		navigation.goBack();
	};

	return (
		<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
			<BackComponent goBackFunc={goBackFunc}/>
			<View style={[{alignSelf: 'center', marginTop: '25%'}]}>
				<Text style={[{fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.4), color: '#886DEC'}]}>Поднесите QR-код к камере</Text>
			</View>
			<Camera
				style={{width: '90%', height: '45%', alignSelf: 'center', marginTop: '5%'}}
				cameraType={CameraType.Back}
				scanBarcode={true}
				onReadCode={(event: any) => {
					navigation.navigate('AddCar', event.nativeEvent.codeStringValue);
				}}
			/>
			<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
				<Text style={[{fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.2)}]}>Или</Text>
			</View>
			<TouchableOpacity style={[{alignSelf: 'center', backgroundColor: '#886DEC', marginTop: '5%', borderColor: '#8000ff', borderWidth: 1, borderRadius: 8, paddingHorizontal: '3%', paddingVertical: '1%'}]}>
				<Text style={[{color: 'white', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.3)}]}>Ввести код вручную</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
