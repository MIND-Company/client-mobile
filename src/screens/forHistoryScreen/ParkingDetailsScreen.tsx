import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ParkingDetailsScreen({route, navigation}: {route: any;navigation: any}) {
	return (
		<>
			<TouchableOpacity style={[{marginBottom: '7%', maxWidth: '35%'}]} onPress={() => navigation.goBack()}>
				<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
					<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
					<Text style={styles.backStyle}>Вернуться</Text>
				</View>
			</TouchableOpacity>
			<View style={[{alignItems: 'center', justifyContent: 'center'}]}>
				<View>
					<Text style={[{color: '#886DEC', fontSize: 18, fontWeight: 'bold'}]}>Название: {route.params.element.name}</Text>
					<Text style={[{color: '#886DEC', fontSize: 18, fontWeight: 'bold'}]}>Стоимость: {route.params.element.price}</Text>
					<Text style={[{color: '#886DEC', fontSize: 18, fontWeight: 'bold'}]}>Дата: {route.params.element.date}</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	backStyle: {
		color: '#886DEC',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
