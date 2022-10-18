import {createStackNavigator} from '@react-navigation/stack';
import AddCarScreen from '../../screens/forHomeScreen/AddCarScreen';
import AddCardScreen from '../../screens/forHomeScreen/AddCardScreen';
import HomeScreen from '../../screens/HomeScreen';
const Stack = createStackNavigator();
import React from 'react';

export default function HomeNavigations() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false,
			animationEnabled: false,
		}}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='AddCar' component={AddCarScreen} />
			<Stack.Screen name='AddCard' component={AddCardScreen} />
		</Stack.Navigator>
	);
}
