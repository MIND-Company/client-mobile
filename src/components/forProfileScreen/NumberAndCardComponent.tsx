import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import {screenHeight} from '../../utils/screenSize';

export default function NumberAndCardComponent(props: {func: any; secondFunc: any}) {
	return (
		<View style={styles.cardAndNumberView}>
			<TouchableOpacity style={styles.cardAndNumber} onPress={props.secondFunc}>
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
		height: screenHeight / 4.16,
		width: '90%',
	},
});
