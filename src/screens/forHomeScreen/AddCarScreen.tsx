import {Alert, Text, Keyboard, View, TouchableOpacity} from 'react-native';
import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AddCarScreen({navigation, route}: {route: any; navigation: NavigationProp<any>}) {
	const goBackFunc = () => {
		Keyboard.dismiss();
		navigation.goBack();
	};

	const Qr = route.params;

	return (
		<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
			<BackComponent goBackFunc={goBackFunc}/>
			<Text>{Qr}</Text>
		</SafeAreaView>
	);
}
