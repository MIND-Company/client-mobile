import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import EmailAndPhoneComponent from "../components/forProfileScreen/EmailAndPhoneComponent";
import NumberAndCardComponent from "../components/forProfileScreen/NumberAndCardComponent";
import StatsComponent from "../components/forProfileScreen/StatsComponent";
import ThemeAndLanguageComponent from "../components/forProfileScreen/ThemeAndLanguageComponent";

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
            <ScrollView style={[{ width:'100%',backgroundColor:'#EFF1FB'}]}>
                <EmailAndPhoneComponent />
                <NumberAndCardComponent func={goChangeCard}/>
                <StatsComponent func={goStats} />
                <ThemeAndLanguageComponent func={goChangeLanguage} secondFunc={goChangeTheme} />
                <StatusBar backgroundColor="#EFF1FB"
                           barStyle="dark-content" />
            </ScrollView>
    );
}
