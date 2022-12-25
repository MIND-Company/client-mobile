import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ParkingScreen from '../screens/ParkingScreen';
import FirstIcon from 'react-native-vector-icons/MaterialIcons';
import SecondIcon from 'react-native-vector-icons/AntDesign';
import ThirdIcon from 'react-native-vector-icons/Octicons';
import FourthIcon from 'react-native-vector-icons/Feather';
import HomeNavigations from './ScreensNavigations/HomeNavigations';
import HistoryNavigations from './ScreensNavigations/HistoryNavigations';
import ProfileNavigations from './ScreensNavigations/ProfileNavigations';
import React, {useContext} from 'react';
import themeContext from '../../config/ThemeContext';

const Tab = createBottomTabNavigator();
export default function MainNavigation() {
	const theme = useContext(themeContext);
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false, // Название экрана сверху
				tabBarShowLabel: false, // Подписи под иконками
				tabBarStyle: {
					backgroundColor: theme.navigationColor,
				},
			}}
			initialRouteName='HomeNavigations'>
			<Tab.Screen name='HomeNavigations' component={HomeNavigations} options={{
				tabBarIcon: ({focused}) => (
					<ThirdIcon name='home' size={28} color = {!focused ? theme.color : '#886DEC'} />),
			}}/>
			<Tab.Screen name='HistoryNavigations' component={HistoryNavigations} options={{
				tabBarIcon: ({focused}) => (
					<FirstIcon name='history' size={30} color = {!focused ? theme.color : '#886DEC'} />),
			}}/>
			<Tab.Screen name='Parking' component={ParkingScreen} options={{
				tabBarIcon: ({focused}) => (
					<FirstIcon name='local-parking' size={28} color = {!focused ? theme.color : '#886DEC'} />),
			}}/>
			<Tab.Screen name='ProfileNavigations' component={ProfileNavigations} options={{
				tabBarIcon: ({focused}) => (
					<FourthIcon name='settings' size={28} color = {!focused ? theme.color : '#886DEC'} />),
			}}/>
		</Tab.Navigator>
	);
}
