import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {screenHeight} from '../../utils/screenSize';

export default function StatsComponent(props: {func: any}) {
	return (
		<TouchableOpacity style={styles.StatsView} onPress={props.func}>
			<Image source={require('../../images/imagesForProfile/statsProfile.png')} resizeMode={'stretch'} style={[{height: '100%', width: '100%', borderRadius: 20, position: 'absolute'}]}/>
			<Text style={styles.textStyle}>Ваша статистика</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		marginLeft: '5%',
		fontSize: 25,
		marginBottom: '5%',
		color: 'white',
		fontWeight: '700',
	},
	StatsView: {
		borderRadius: 20,
		marginTop: '5%',
		alignSelf: 'center',
		height: screenHeight / 3.75,
		width: '90%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		// ShadowColor: '#000000',
		// shadowOpacity: 0.15,
		// elevation: 10,
		// shadowOffset: {width: 7, height: 7},
	},
});
