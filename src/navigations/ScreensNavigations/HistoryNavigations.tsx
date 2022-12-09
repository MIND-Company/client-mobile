import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import HistoryScreen from '../../screens/HistoryScreen';
import ParkingDetailsScreen from '../../screens/forHistoryScreen/ParkingDetailsScreen';
import React from 'react';

const Stack = createStackNavigator();

export default function HistoryNavigations() {
	const TransitionScreenOptions = {
		...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
		headerShown: false,
	};
	return (
		<Stack.Navigator screenOptions={TransitionScreenOptions}>
			<Stack.Screen name='History' component={HistoryScreen} />
			<Stack.Screen name='ParkingDetails' component={ParkingDetailsScreen} />
		</Stack.Navigator>
	);
}

