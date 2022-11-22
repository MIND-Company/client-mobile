import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NoPastParking() {
	return (
		<View style={styles.containerView}>
			<Text style={styles.TextStyle}>У вас пока нет парковок;(</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		fontWeight: 'bold',
		fontSize: 19,
		color: '#886DEC',
	},
	containerView: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
