import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function StatsScreen({navigation}: {navigation: NavigationProp<any>}) {
	// Return (
	// 	<SafeAreaView style={[{backgroundColor: '#EFF1FB', flex: 1}]}>
	// 		<TouchableOpacity style={[{marginBottom: '7%', maxWidth: '35%'}]} onPress={() => {
	// 			navigation.goBack();
	// 		}}>
	// 			<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
	// 				<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
	// 				<Text style={styles.backStyle}>Вернуться</Text>
	// 			</View>
	// 		</TouchableOpacity>
	// 		<View style={[{alignItems: 'center', justifyContent: 'center'}]}>
	// 			<View>
	// 				<Text style={[{color: '#886DEC', fontSize: 18, fontWeight: 'bold'}]}>Stats</Text>
	// 			</View>
	// 		</View>
	// 	</SafeAreaView>
	// );
	const [hasPermission, setHasPermission] = useState<boolean | any>(false);
	const devices = useCameraDevices();
	const device: any = devices.back;

	const requestCameraPermission = async (): Promise<any> => {
		const status = await Camera.requestCameraPermission();
		setHasPermission(status === 'authorized');
	};

	useEffect(() => {
		void requestCameraPermission();
	}, []);

	if (!hasPermission) {
		<View>
			<Text >No Permission</Text>
		</View>;
	}

	if (device == null) {
		return <ActivityIndicator color={'black'} />;
	}

	return (
		<SafeAreaView>
			<Camera style={[{height: '100%', weight:'100%'}]} device={device} isActive={true} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	backStyle: {
		color: '#886DEC',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
