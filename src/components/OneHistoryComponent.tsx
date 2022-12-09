import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function OneHistoryComponent(props: {textColor: string; bg: string; name: string; car: string; date: string; func: any}) {
	return (
		<TouchableOpacity onPress={props.func} style={[{alignSelf: 'center', marginBottom: '1%', marginTop: '2%', width: '95%'}]}>
			<View style={[styles.parentsView, {backgroundColor: props.bg}]}>
				<View style={[{width: '36%'}]}><Text style={[{fontSize: 20, color: props.textColor}]}>{props.name}</Text></View>
				<View style={[{width: '33%', alignItems: 'center'}]}><Text style={[{fontSize: 20, color: props.textColor}]}>{props.car}</Text></View>
				<View style={[{alignItems: 'center', width: '31%'}]}><Text style={[{fontSize: 20, color: props.textColor}]}>{props.date}</Text></View>
			</View>
		</TouchableOpacity>
	);
}

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
