import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function NoPastParking() {
	return (
		<View style={styles.containerView}>
			<Text style={styles.TextStyle}>У вас пока нет парковок;(</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: responsiveFontSize(2.5),
		color: '#886DEC',
	},
	containerView: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
