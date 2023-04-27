import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AddCarScreen from '../../screens/forHomeScreen/AddCarScreen';
import AddCardScreen from '../../screens/forHomeScreen/AddCardScreen';
import HomeScreen from '../../screens/HomeScreen';
const Stack = createStackNavigator();
import React from 'react';
import ScanQRcodeScreen from '../../screens/forHomeScreen/ScanQRcodeScreen';
import RefactorCarScreen from '../../screens/forHomeScreen/RefactorCarScreen';

export default function HomeNavigations() {
	const TransitionScreenOptions = {
		...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
		headerShown: false,
	};
	return (
		<Stack.Navigator screenOptions={TransitionScreenOptions}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='RefactorCar' component={RefactorCarScreen} />
			<Stack.Screen name='AddCard' component={AddCardScreen} />
			<Stack.Screen name='ScanQRcode' component={ScanQRcodeScreen} />
			<Stack.Screen name='AddCar' component={AddCarScreen} />
		</Stack.Navigator>
	);
}
