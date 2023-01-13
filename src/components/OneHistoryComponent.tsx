import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

type OneHistoryComponentProps = {
	keys: number;
	textColor: string;
	bg: string;
	name: string;
	car: string;
	date: string;
	func: () => void;
};

const OneHistoryComponent: FC<OneHistoryComponentProps> = ({keys, textColor, bg, name, car, date, func}) => (
	<TouchableOpacity onPress={func} style={[{alignSelf: 'center', marginTop: (keys === 0) ? '2%' : 0, marginBottom: '2%', width: '95%'}]}>
		<View style={[styles.parentsView, {backgroundColor: bg}]}>
			<View style={[{width: '36%'}]}><Text style={[{color: textColor, fontSize: responsiveFontSize(2.4), fontFamily: 'Montserrat-Medium'}]}>{name}</Text></View>
			<View style={[{width: '33%', alignItems: 'center'}]}><Text style={[{fontSize: responsiveFontSize(2.4), fontFamily: 'Montserrat-Medium', color: textColor}]}>{car.slice(0, 9)}</Text></View>
			<View style={[{alignItems: 'center', width: '31%'}]}><Text style={[{fontSize: responsiveFontSize(2.3), fontFamily: 'Montserrat-Medium', color: textColor}]}>{date}</Text></View>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	parentsView: {
		borderColor: '#886DEC',
		borderStyle: 'dotted',
		borderWidth: 1,
		alignItems: 'center',
		paddingHorizontal: '3%',
		paddingVertical: '4%',
		borderRadius: 15,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
});

export default OneHistoryComponent;
