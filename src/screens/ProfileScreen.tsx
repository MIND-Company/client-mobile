import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import EmailAndPhoneComponent from '../components/forProfileScreen/EmailAndPhoneComponent';
import NumberAndCardComponent from '../components/forProfileScreen/NumberAndCardComponent';
import StatsComponent from '../components/forProfileScreen/StatsComponent';
import ThemeAndLanguageComponent from '../components/forProfileScreen/ThemeAndLanguageComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';

export default function ProfileScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);

	const goChangeCard = () => {
		navigation.navigate('ChangeCard');
	};

	const goStats = () => {
		navigation.navigate('Stats');
	};

	const goChangeLanguage = () => {
		navigation.navigate('ChangeLanguage');
	};

	return (
		<ScrollView style={[{width: '100%', backgroundColor: theme.backgroundScreen}]}>
			<EmailAndPhoneComponent bg = {theme.backgroundComponent} textColor = {theme.textColor}/>
			<NumberAndCardComponent func={goChangeCard}/>
			<StatsComponent func={goStats} />
			<ThemeAndLanguageComponent func={goChangeLanguage} />
		</ScrollView>
	);
}
