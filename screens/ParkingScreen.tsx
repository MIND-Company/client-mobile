import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SafeAreaViewAndroid from "../components/SafeAreaViewAndroid";

export default function ParkingScreen() {
    return (
        <SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
            <View style={[{alignItems:'center',justifyContent:'center'}]}>
                <View>
                    <Text style={[{color:'#886DEC',fontSize:18, fontWeight:'bold'}]}>Вы не находитесь на парковке</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#EFF1FB',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
