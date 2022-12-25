import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

type CurrentParkingComponentProps = {
	calculated_price: string | undefined;
	car: string;
	checkout_time: string;
	entry_time: string;
	park: {
		description: string;
		id: number;
		web_address: string;};
};
const CurrentParkingComponent = (props: {color: string; element: CurrentParkingComponentProps}) => (
	<View style={styles.viewStyle}>
		<View style={styles.topViewStyle}>
			<Text style={{fontSize: responsiveFontSize(2.2), color: 'gray', fontWeight: '500', marginTop: '3%', fontFamily: 'Montserrat-SemiBold'}}>Вы сейчас на парковке</Text>
			<Text style={{fontSize: responsiveFontSize(2.2), color: '#886DEC', fontWeight: '500', marginTop: '1%', fontFamily: 'Montserrat-SemiBold'}}>{props.element.park.description}</Text>
		</View>
		<View style={{justifyContent: 'center', marginTop: '5%'}}>
			<Text style={{fontSize: responsiveFontSize(8), alignSelf: 'center', color: props.color, fontFamily: 'Montserrat-SemiBold'}}>385₽</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	buttonStyle: {
		alignSelf: 'center',
		paddingHorizontal: '5%',
		paddingVertical: '1%',
	},
	topViewStyle: {
		alignSelf: 'center',
		width: '100%',
		alignItems: 'center',
	},
	viewStyle: {
		height: '100%',
		width: '100%',
		borderRadius: 20,
	},
});

export default CurrentParkingComponent;
