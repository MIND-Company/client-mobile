import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import StatsScreen from '../../screens/forProfileScreen/StatsScreen';
import React from 'react';

const Stack = createStackNavigator();

export default function ProfileNavigations() {
	const TransitionScreenOptions = {
		...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
		headerShown: false,
	};
	return (
		<Stack.Navigator screenOptions={TransitionScreenOptions}>
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='Stats' component={StatsScreen} />
		</Stack.Navigator>
	);
}
