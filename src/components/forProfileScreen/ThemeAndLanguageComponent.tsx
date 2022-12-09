import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../../config/ThemeContext';
import {screenHeight} from '../../utils/screenSize';

export default function ThemeAndLanguageComponent() {
	const [mode, setMode] = useState(false);
	const theme = useContext(themeContext);

	return (
		<View style={styles.ThemeAndLanguageView}>
			<TouchableOpacity style={styles.ThemeAndLanguage} onPress={() => {}}>
				<Image source={require('../../images/imagesForProfile/languageProfile.png')} resizeMode={'stretch'} style={[{borderRadius: 20, position: 'absolute'}]}/>
				<Text style={styles.textStyle}>Русский язык</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.ThemeAndLanguage} onPress={() => {
				setMode(!mode);
				EventRegister.emit('ChangeTheme', mode);
			}} >
				{theme.text === 'тёмную' ? <Image source={require('../../images/imagesForProfile/darkThemeProfile.png')} resizeMode={'stretch'} style={[{borderRadius: 20, position: 'absolute'}]}/>
					:<Image source={require('../../images/imagesForProfile/lightThemeProfile.png')} resizeMode={'stretch'} style={[{borderRadius: 20, position: 'absolute'}]}/>}
				<Text style={styles.textStyle}>Включить {theme.text} тему</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	ThemeAndLanguage: {
		justifyContent: 'center',
		borderRadius: 20,
		height: '100%',
		width: '48%',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	ThemeAndLanguageView: {
		flexDirection: 'row',
		marginTop: '5%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		height: screenHeight / 4.16,
		width: '90%',
		marginBottom: '5%',
	},
});
