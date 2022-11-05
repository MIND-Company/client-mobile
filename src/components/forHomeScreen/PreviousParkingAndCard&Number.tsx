import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddCarComponent from './AddCarComponent';
import AddCardComponent from './AddCardComponent';

export default function PreviousParkingAndCardNumber(props: {height: number, number: string; bg: string; card: string}) {
	return (
		<View style={[{marginBottom: '3%'}]}>
			<View style={styles.View}>
				<Text>Прошлый паркинг</Text>
			</View>
			<View>
				<View style={[{height: 110, marginBottom: '3%', marginTop: '3%'}]}>
					<AddCarComponent bg={props.bg} number = {props.number} height={props.height}/>
				</View>
				<View style={[{height: 110, marginBottom: '3%', marginTop: '3%'}]}>
					<AddCardComponent bg ={props.bg} card = {props.card} height={props.height}/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		fontWeight: '500',
		color: '#886DEC',
		marginBottom: '5%',
		fontSize: 17,
	},
	View: {
		backgroundColor: '#FFFFFF',
		alignSelf: 'center',
		marginTop: '3%',
		width: '95%',
		borderRadius: 20,
		height: 220,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
});
