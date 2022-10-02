import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function ChangeCardScreen({navigation}: {navigation: any}) {
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
					<Text style={[{color: '#886DEC', fontSize: 18, fontWeight: 'bold'}]}>ChangeCard</Text>
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
