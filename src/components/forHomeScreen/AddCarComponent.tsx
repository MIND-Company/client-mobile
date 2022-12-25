import type {FC} from 'react';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

type AddCarComponentProps = {
	color: string;
	height: number;
	bg: string;
	func?: () => void;
	number: string | undefined;
};

const AddCarComponent: FC<AddCarComponentProps> = ({color, height, bg, func, number}) => (
	<View style={[styles.view, {backgroundColor: bg, height: responsiveHeight(height)}]}>
		{/* eslint-disable-next-line no-negated-condition */}
		{number !== null
			? 					<View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[styles.mainText, {color: color}]}> Ваш номер :</Text>
				<View style={styles.numberView}>
					<View style={styles.numberCarView}>
						<Text style={styles.numberText}> {number.slice(0, 6)} </Text>
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
			: <>
				<Image source={require('../../images/car.png')} style={[{marginBottom: '3%', resizeMode: 'contain', height: '70%', width: '60%'}]}/>
				<TouchableOpacity onPress={func}>
					<Text style={styles.textStyle}>Добавьте транспорт</Text>
				</TouchableOpacity>
			</>}
	</View>
);

const styles = StyleSheet.create({
	regionView: {
		backgroundColor: 'red',
		width: '40%',
		marginRight: '5%',
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
		fontSize: 21,
		fontWeight: '400',
		color: 'black',
	},
	numberText: {
		letterSpacing: 2,
		fontFamily: 'Montserrat-ExtraBold',
		textAlign: 'center',
		fontSize: 23,
		fontWeight: '400',
		color: 'black',
	},
	numberView: {
		borderRadius: 5,
		height: 50,
		flexDirection: 'row',
		width: 180,
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: 'black',
	},
	mainText: {
		fontSize: responsiveFontSize(2.4),
		fontFamily: 'Montserrat-SemiBold',
		marginRight: '5%',
	},
	textStyle: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#886DEC',
		marginBottom: '5%',
		fontSize: responsiveFontSize(2.3),
	},
	view: {
		alignSelf: 'center',
		marginTop: '1.5%',
		width: '95%',
		borderRadius: 20,
		marginBottom: '3%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
});

export default AddCarComponent;
