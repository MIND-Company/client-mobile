import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function AddCarScreen({route, navigation}: {route: any; navigation: any}) {
	const [number, setNumber] = useState('');

	const changeNumber = async () => {
		await AsyncStorage.setItem('number', number);
		route.params.changeNumber(number);
	};

	const goBackFunc = () => {
		Keyboard.dismiss();
		navigation.goBack();
	};

	return (
		<View style={{backgroundColor: '#EFF1FB', flex: 1}}>
			<TouchableOpacity style={[{marginBottom: '7%', maxWidth: '35%'}]} onPress={goBackFunc}>
				<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
					<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
					<Text style={styles.backStyle}>Вернуться</Text>
				</View>
			</TouchableOpacity>
			<View style={[{alignItems: 'center', justifyContent: 'center'}]}>
				<View style={[{alignItems: 'center', flexDirection: 'row'}]}>
					<Text style={styles.textStyle}>Добавьте номер вашего тс</Text>
					<Icon name='car-sport-sharp' size={27} color='#886DEC'/>
				</View>

				<View style={styles.inputView}>
					<TextInput style={styles.inputStyles} value={number} onChangeText={setNumber} placeholder='Новый номер тс'
						placeholderTextColor='#9A9A9A'/>
				</View>

				<TouchableOpacity style={styles.buttonStyle} onPress={() => {
					void changeNumber();
				}}>
					<Text style={[{color: 'white', fontSize: 16}]}>Добавить номер</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonStyle: {
		marginTop: '5%',
		borderStyle: 'solid',
		borderRadius: 11,
		backgroundColor: '#886DEC',
		alignSelf: 'center',
		paddingHorizontal: 18,
		paddingVertical: 8,
	},

	inputView: {
		alignItems: 'center',
		minWidth: '80%',
		marginTop: '20%',
	},
	inputStyles: {
		width: '100%',
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderRadius: 14,
		borderWidth: 2,
		color: '#151719',
		fontSize: 16,
		paddingLeft: '5%',
		paddingRight: '50%',
	},
	textStyle: {
		color: '#886DEC',
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: '3%',
	},
	backStyle: {
		color: '#886DEC',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
