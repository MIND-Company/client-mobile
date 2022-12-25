import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const HelloScreenComponent = (props: {headingText: string; h2Text: string; image: string}) => (
	<View style={styles.slide}>
		<View style={{height: '70%', width: '90%', justifyContent: 'center', alignItems: 'center'}}>
			<Image source={require('../../images/hello-screen.png')} resizeMode={'center'} />
		</View>
		<View style={{width: '90%'}}>
			<Text style={styles.h2text}>{props.h2Text} </Text>
		</View>
	</View>
);
const styles = StyleSheet.create({
	slide: {
		height: '90%',
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	text: {
		fontFamily: 'Montserrat-Bold',
		color: '#230D21',
		fontSize: responsiveFontSize(3),
	},
	h2text: {
		color: '#18091f',
		fontSize: responsiveFontSize(2.5),
		fontFamily: 'Montserrat-Bold',
	},
});
