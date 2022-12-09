import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const HelloScreenComponent = (props: {headingText: string; h2Text: string; image: string}) => (
	<View style={styles.slide}>
		<View style={{height: '70%', width: '90%', justifyContent: 'center', alignItems: 'center'}}>
			<Image source={require('../../images/helloScreenFirst.png')} resizeMode={'center'} />
		</View>
		<View style={{width: '90%'}}>
			<Text style={styles.text}> {props.headingText} </Text>
			<Text style={styles.h2text}> {props.h2Text} </Text>
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
		color: '#230D21',
		fontSize: 25,
		fontWeight: 'bold',
	},
	h2text: {
		color: 'gray',
		fontSize: 20,
		fontWeight: '400',
	},
});
