import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "../../screens/ProfileScreen";
import ChangeCardScreen from "../../screens/forProfileScreen/ChangeCardScreen";
import StatsScreen from "../../screens/forProfileScreen/StatsScreen";
import ChangeLanguageScreen from "../../screens/forProfileScreen/LanguageScreen";
import ChangeThemeScreen from "../../screens/forProfileScreen/ChangeThemeScreen";
import React from 'react';

const Stack = createStackNavigator();

export default function ProfileNavigations() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
        }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ChangeCard" component={ChangeCardScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
            <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
        </Stack.Navigator>
    );
}
