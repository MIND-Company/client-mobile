import type {FC} from 'react';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

type AddCardComponentProps = {
	color: string;
	height: number;
	bg: string;
	func?: () => void;
	card: string | undefined;
};

const AddCardComponent: FC<AddCardComponentProps> = ({color, height, bg, func, card}) => (
	<View style={[styles.view, {backgroundColor: bg, height: responsiveHeight(height)}]}>
		{/* eslint-disable-next-line no-negated-condition */}
		{card !== null
			?					<View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[styles.mainText, {color}]}> Ваша карта :</Text>
				<View style={styles.cardView}>
					<Text style={styles.cardText}> ****{card.slice(0, 4)}</Text>
				</View>
			</View>
			: <>
				<Image source={require('../../images/card.png')} style={[{alignSelf: 'flex-start', resizeMode: 'contain', height: '80%', width: '80%'}]}/>
				<TouchableOpacity onPress={func}>
					<Text style={styles.textStyle}>Добавьте способ оплаты</Text>
				</TouchableOpacity>
			</>}
	</View>
);

const styles = StyleSheet.create({
	cardText: {
		letterSpacing: 5,
		fontSize: responsiveFontSize(3),
		fontFamily: 'Montserrat-SemiBold',
		fontWeight: '400',
		color: 'white',
	},
	cardView: {
		paddingRight: '2%',
		paddingVertical: '1%',
		height: 50,
		width: 180,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#886DEC',
		borderRadius: 10,
	},
	mainText: {
		fontSize: responsiveFontSize(2.4),
		fontFamily: 'Montserrat-SemiBold',
		color: 'black',
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

export default AddCardComponent;
