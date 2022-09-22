import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, View,SafeAreaView} from 'react-native';
import EmailAndPhoneComponent from "../components/forProfileScreen/EmailAndPhoneComponent";
import NumberAndCardComponent from "../components/forProfileScreen/NumberAndCardComponent";
import StatsComponent from "../components/forProfileScreen/StatsComponent";
import ThemeAndLanguageComponent from "../components/forProfileScreen/ThemeAndLanguageComponent";
import SafeAreaViewAndroid from "../components/SafeAreaViewAndroid";

export default function ProfileScreen({navigation}: {navigation: any}) {
    const goChangeCard = () => {
        navigation.navigate('ChangeCard')
    }
    const goStats = () => {
        navigation.navigate('Stats')
    }
    const goChangeLanguage = () => {
        navigation.navigate('ChangeLanguage')
    }
    const goChangeTheme= () => {
        navigation.navigate('ChangeTheme')
    }
    return (
        <SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
            <ScrollView style={[{ width:'100%'}]}>
                <EmailAndPhoneComponent />
                <NumberAndCardComponent func={goChangeCard}/>
                <StatsComponent func={goStats} />
                <ThemeAndLanguageComponent func={goChangeLanguage} secondFunc={goChangeTheme} />
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
