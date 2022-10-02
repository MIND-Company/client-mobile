import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainNavigation from './MainNavigation';
import React from 'react';

const Stack = createStackNavigator();

export default function AuthNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerShown: false,
				animationEnabled: false,
			}}>
				<Stack.Screen name='Authorization' component={AuthorizationScreen} />
				<Stack.Screen name='Registration' component={RegistrationScreen} />
				<Stack.Screen name='MainNavigation' component={MainNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
