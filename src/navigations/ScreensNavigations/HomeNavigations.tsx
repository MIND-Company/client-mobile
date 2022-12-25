import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AddCarScreen from '../../screens/forHomeScreen/AddCarScreen';
import AddCardScreen from '../../screens/forHomeScreen/AddCardScreen';
import HomeScreen from '../../screens/HomeScreen';
const Stack = createStackNavigator();
import React from 'react';

export default function HomeNavigations() {
	const TransitionScreenOptions = {
		...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
		headerShown: false,
	};
	return (
		<Stack.Navigator screenOptions={TransitionScreenOptions}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='AddCar' component={AddCarScreen} />
			<Stack.Screen name='AddCard' component={AddCardScreen} />
		</Stack.Navigator>
	);
}
