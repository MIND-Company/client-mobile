import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainNavigation from './MainNavigation';
import React from 'react';
import {useAuth} from '../components/forAuth/useAuth';
import HelloScreen from '../screens/HelloScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';

const Stack = createStackNavigator();

export default function AuthNavigation() {
	const TransitionScreenOptions = {
		...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
		headerShown: false,
	};
	const auth = useAuth();
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={TransitionScreenOptions}>
				<Stack.Screen name = {auth.isAuth ? 'MainNavigation' : 'HelloScreen'} component={auth.isAuth ? MainNavigation : HelloScreen} />
				<Stack.Screen name = {auth.isAuth ? 'HelloScreen' : 'MainNavigation'} component={auth.isAuth ? HelloScreen : MainNavigation} />
				<Stack.Screen name='Authorization' component={AuthorizationScreen} />
				<Stack.Screen name='Registration' component={RegistrationScreen} />
				<Stack.Screen name='VerifyCodeScreen' component={VerifyCodeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
