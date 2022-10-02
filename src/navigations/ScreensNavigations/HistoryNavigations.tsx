import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from "../../screens/HistoryScreen";
import ParkingDetailsScreen from "../../screens/forHistoryScreen/ParkingDetailsScreen";
import React from 'react';

const Stack = createStackNavigator();

export default function HistoryNavigations() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
        }}>
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="ParkingDetails" component={ParkingDetailsScreen} />
        </Stack.Navigator>
    );
}

