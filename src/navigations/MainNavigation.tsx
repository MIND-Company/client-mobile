import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParkingScreen from "../screens/ParkingScreen";
import FirstIcon from 'react-native-vector-icons/MaterialIcons';
import SecondIcon from 'react-native-vector-icons/AntDesign';
import ThirdIcon from 'react-native-vector-icons/Ionicons';
import HomeNavigations from "./ScreensNavigations/HomeNavigations";
import HistoryNavigations from "./ScreensNavigations/HistoryNavigations";
import ProfileNavigations from "./ScreensNavigations/ProfileNavigations";
import React from 'react';

const Tab = createBottomTabNavigator();
export default function MainNavigation() {
    return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false, // название экрана сверху
                    tabBarShowLabel: false, // подписи под иконками
                }}
                initialRouteName="HomeNavigations">
                <Tab.Screen name="HomeNavigations" component={HomeNavigations} options={{
                    tabBarIcon: ({focused}) => (
                        <ThirdIcon name="home" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="HistoryNavigations" component={HistoryNavigations} options={{
                    tabBarIcon: ({focused}) => (
                        <FirstIcon name="history" size={30} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="Parking" component={ParkingScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <FirstIcon name="local-parking" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="ProfileNavigations" component={ProfileNavigations} options={{
                    tabBarIcon: ({focused}) => (
                        <SecondIcon name="profile" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
            </Tab.Navigator>
    );
}
