import {Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight} from '../../utils/screenSize';

export default function NumberAndCardComponent(props: {func: any}) {
	return (
		<View style={styles.cardAndNumberView}>
			<TouchableOpacity style={styles.cardAndNumber} onPress={props.func}>
				<Image source={require('../../images/imagesForProfile/carProfile.png')} resizeMode={'stretch'} style={[{borderRadius: 20, position: 'absolute'}]}/>
				<Text style={styles.textStyle}>Добавить номер т/с</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.cardAndNumber} onPress={props.func}>
				<Image source={require('../../images/imagesForProfile/cardProfile.png')} resizeMode={'stretch'} style={[{borderRadius: 20, position: 'absolute'}]}/>
				<Text style={styles.textStyle}>Добавить способ оплаты</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		marginLeft: '5%',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	cardAndNumber: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderRadius: 20,
		width: '48%',
		height: '100%',
	},
	cardAndNumberView: {
		flexDirection: 'row',
		marginTop: '5%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		height: screenHeight / 4.16,
		width: '90%',
	},
});
