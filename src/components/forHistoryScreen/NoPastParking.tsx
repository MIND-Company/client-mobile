import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function NoPastParking(props: {func: () => void}) {
	return (
		<View style={styles.containerView}>
			<Text style={styles.TextStyle}>У вас пока нет законченных парковок;(</Text>
			<TouchableOpacity style={{marginTop: '3%'}} onPress={props.func}>
				<Text style={{fontFamily: 'Montserrat-Medium', fontSize: responsiveFontSize(2.1), color: '#886DEC'}}>Искать парковку</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: responsiveFontSize(2.5),
		textAlign: 'center',
	},
	containerView: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
