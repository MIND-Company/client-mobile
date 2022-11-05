import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AddCardComponent(props: {height: number; bg: string; func?: any; card: any; cardFunc?: any}) {
	return (
		<View style={[styles.view, {backgroundColor: props.bg, height: props.height}]}>
			{props.card !== null
				? <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
					<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
						<Text style={styles.mainText}> Ваша карта :</Text>
						<View style={styles.cardView}>
							<Text style={styles.cardText}> {props.card}</Text>
						</View>
					</View>
				</View>
				: <>
					<Image source={require('../../images/card.png')} style={[{alignSelf: 'flex-start', resizeMode: 'contain', height: '80%', width: '80%'}]}/>
					<TouchableOpacity onPress={props.func}>
						<Text style={styles.textStyle}>Добавьте способ оплаты</Text>
					</TouchableOpacity>
				</>}
		</View>
	);
}

const styles = StyleSheet.create({
	cardText: {
		fontSize: 22,
		fontWeight: '400',
		color: 'white',
	},
	cardView: {
		paddingVertical: '1%',
		width: '30%',
		alignItems: 'center',
		backgroundColor: '#886DEC',
		borderRadius: 10,
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
		marginTop: '3%',
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
