import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function NumberAndCardComponent(props: {func: any}) {
	return (
		<View style={styles.cardAndNumberView}>
			<TouchableWithoutFeedback style={[{width: '48%', height: '100%'}]} onPress={props.func}>
				<LinearGradient style={[styles.cardAndNumber, {backgroundColor: '#EF81F8'}]} colors={['#642b73', '#c642ce']}>
					<Text style={styles.textStyle}>Добавить номер т/с</Text>
				</LinearGradient>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback style={[{width: '48%', height: '100%'}]} onPress={props.func}>
				<LinearGradient style={[styles.cardAndNumber, {backgroundColor: '#886DEC'}]} colors={['#886DEC', '#56439E']}>
					<Text style={styles.textStyle}>Добавить способ оплаты</Text>
				</LinearGradient>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	cardAndNumber: {
		paddingHorizontal: '7%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		width: '48%',
		height: '100%',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	cardAndNumberView: {
		flexDirection: 'row',
		marginTop: '5%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		height: 180,
		width: '90%',
	},
});
