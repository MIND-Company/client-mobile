import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AddCarComponent(props: {height: number; bg: string; func?: any; number: any; numberFunc?: any}) {
	return (
		<View style={[styles.view, {backgroundColor: props.bg, height: props.height}]}>
			{props.number !== null
				? 					<View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
					<Text style={styles.mainText}> Ваш номер :</Text>
					<View style={styles.numberView}>
						<Text style={styles.numberText}> {props.number}</Text>
					</View>
				</View>
				: <>
					<Image source={require('../../images/car.png')} style={[{marginBottom: '3%', resizeMode: 'contain', height: '70%', width: '60%'}]}/>
					<TouchableOpacity onPress={props.func}>
						<Text style={styles.textStyle}>Добавьте транспорт</Text>
					</TouchableOpacity>
				</>}
		</View>
	);
}

const styles = StyleSheet.create({
	numberText: {
		fontSize: 22,
		fontWeight: '400',
		color: 'black',
	},
	numberView: {
		paddingVertical: '1%',
		width: '30%',
		alignItems: 'center',
		backgroundColor: '#ECECEC',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#C5C5C5',
	},
	mainText: {
		fontSize: 18,
		fontWeight: '500',
		color: 'black',
		marginRight: '5%',
	},
	textStyle: {
		fontWeight: '500',
		color: '#886DEC',
		marginBottom: '5%',
		fontSize: 17,
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
