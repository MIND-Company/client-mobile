import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainNavigation from './MainNavigation';
import React from 'react';
import {useAuth} from '../components/forAuth/useAuth';

const Stack = createStackNavigator();

export default function AuthNavigation() {
	const auth = useAuth();
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerShown: false,
				animationEnabled: false,
			}}>
				<Stack.Screen name = {auth.isAuth ? 'MainNavigation' : 'Authorization'} component={auth.isAuth ? MainNavigation : AuthorizationScreen} />
				<Stack.Screen name = {auth.isAuth ? 'Authorization' : 'MainNavigation'} component={auth.isAuth ? AuthorizationScreen : MainNavigation} />
				<Stack.Screen name='Registration' component={RegistrationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
