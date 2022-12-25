import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ChangeIcon from 'react-native-vector-icons/Foundation';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const ChangeCarComponent = () => (
	<View style={[styles.view, {marginBottom: '3%'}]}>
		<TouchableOpacity onPress={() => null} style={[styles.changeCarNumberButton]}>
			<Text style={styles.changeCarNumberButtonText}>Редактировать т/с</Text>
			<ChangeIcon name='pencil' size={28} color= 'black' />
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	view: {
		marginVertical: '1%',
		backgroundColor: '#eff2fb',
		height: responsiveHeight(8),
		borderRadius: 12,
		alignSelf: 'center',
		width: '95%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	changeCarNumberButtonText: {
		fontFamily: 'Montserrat-Bold',
		color: '#544d4d',
		fontSize: 19,
		textAlign: 'left',
		marginLeft: '5%',
	},
	changeCarNumberButton: {
		paddingRight: '7%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
});

export default ChangeCarComponent;
