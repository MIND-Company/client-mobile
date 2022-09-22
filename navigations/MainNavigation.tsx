import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParkingScreen from "../screens/ParkingScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeNavigations from "./ScreensNavigations/HomeNavigations";
import HistoryNavigations from "./ScreensNavigations/HistoryNavigations";
import ProfileNavigations from "./ScreensNavigations/ProfileNavigations";

const Tab = createBottomTabNavigator();
export default function MainNavigation() {
    return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false, // название экрана сверху
                    tabBarShowLabel: false, // подписи под иконками
                    // tabBarStyle: [
                    //     {display: "flex", height: '6%'},
                    //     null
                    // ],
                    // tabBarOptions: [{showLabel: false}]
                }}
                initialRouteName="HomeNavigations">
                <Tab.Screen name="HomeNavigations" component={HomeNavigations} options={{
                    tabBarIcon: ({focused}) => (
                            <Ionicons name="home" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="HistoryNavigations" component={HistoryNavigations} options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialIcons name="history" size={30} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="Parking" component={ParkingScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialIcons name="local-parking" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
                <Tab.Screen name="ProfileNavigations" component={ProfileNavigations} options={{
                    tabBarIcon: ({focused}) => (
                        <AntDesign name="profile" size={28} color = {!focused ? "black": "#886DEC"} />)
                }}/>
            </Tab.Navigator>
    );
}
