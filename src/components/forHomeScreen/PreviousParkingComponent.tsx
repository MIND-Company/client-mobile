import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

type PreviousParkingComponentProps = {
	calculated_price: string | undefined;
	car: string;
	checkout_time: string;
	entry_time: string;
	park: {
		description: string;
		id: number;
		web_address: string;};
};

const PreviousParkingComponent = (props: {color: string; navigationFunc: any; element: PreviousParkingComponentProps}) => (
	<View style={styles.viewStyle}>
		<View style={styles.topViewStyle}>
			<Text style={{fontSize: responsiveFontSize(2.2), color: props.color, fontWeight: '500', fontFamily: 'Montserrat-SemiBold'}}>{props.element.park.description}</Text>
			<Text style={{fontSize: responsiveFontSize(2), color: 'gray', fontWeight: '400', fontFamily: 'Montserrat-SemiBold'}}>{props.element.entry_time.slice(11, 16)}</Text>
			<Text style={{
				fontSize: responsiveFontSize(2),
				color: 'gray',
				fontFamily: 'Montserrat-SemiBold',
			}}>{props.element.entry_time.slice(0, 10)}</Text>
		</View>
		<Text style={{fontSize: responsiveFontSize(8), alignSelf: 'center', color: props.color, fontFamily: 'Montserrat-SemiBold'}}>385₽</Text>
		<TouchableOpacity style={styles.buttonStyle} onPress={() => props.navigationFunc()}>
			<Text style={{color: '#886DEC', fontWeight: '500', fontSize: responsiveFontSize(2.2), marginBottom: '2%', fontFamily: 'Montserrat-SemiBold'}}>Подробнее</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	buttonStyle: {
		alignSelf: 'center',
		paddingHorizontal: '5%',
		paddingVertical: '1%',
	},
	topViewStyle: {
		alignItems: 'center',
		alignSelf: 'center',
		width: '80%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	viewStyle: {
		height: '100%',
		width: '100%',
		borderRadius: 20,
		justifyContent: 'space-around',
	},
});

export default PreviousParkingComponent;
