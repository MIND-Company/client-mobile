import {Alert, Text, Keyboard, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function AddCarScreen({navigation, route}: {route: any; navigation: NavigationProp<any>}) {
	const goBackFunc = () => {
		Keyboard.dismiss();
		navigation.goBack();
	};

	const Qr: any = route.params;
	const code: string = 	Qr.split(':')[0];
	const number: string = Qr.split(':')[1];

	return (
		<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
			<BackComponent goBackFunc={goBackFunc}/>

			<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
				<Text style={[{alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.5), color: '#886DEC'}]}>Ваш код:</Text>
				<Text style={[{alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.5), color: 'black'}]}>{code}</Text>
			</View>
			<View style={[{alignSelf: 'center', marginTop: '5%'}]}>
				<Text style={[{alignSelf: 'center', fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2.5), color: '#886DEC'}]}>Ваш регистрационный номер:</Text>
				<View style={styles.numberView}>
					<View style={styles.numberCarView}>
						<Text style={styles.numberText}> {number.slice(0, 1)}<Text style={{fontSize: responsiveFontSize(3.3)}}>{number.slice(1, 4)}</Text>{number.slice(4, 6)} </Text>
					</View>
					<View style={ {height: '100%', width: '30%'}}>
						<Text style={styles.numberRegionText}> {number.slice(6, 9)} </Text>
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
			</View>
			<TouchableOpacity style={styles.buttonStyle}>
				<Text style={styles.buttonTextStyle}>Добавить</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
	mainTextStyle: {
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.4),
		color: '#886DEC',
	},
});
