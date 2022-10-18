import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../../config/ThemeContext';

export default function ThemeAndLanguageComponent(props: {func: any}) {
	const [mode, setMode] = useState(false);
	const theme = useContext(themeContext);

	return (
		<View style={styles.ThemeAndLanguageView}>
			<TouchableWithoutFeedback style={[{height: '100%'}]} onPress={props.func}>
				<LinearGradient style={[styles.ThemeAndLanguage, {backgroundColor: '#42275a'}]} colors={['#734b6d', '#00223E']}>
					<Text style={styles.textStyle}>Русский язык</Text>
				</LinearGradient>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback style={[{height: '100%'}]} onPress={() => {
				setMode(mode => !mode);
				EventRegister.emit('ChangeTheme', mode);
			}}>
				<LinearGradient style={[styles.ThemeAndLanguage, {backgroundColor: '#000000'}]} colors={theme.themeViewColor}>
					<Text style={styles.textStyle}>Включить {theme.text} тему</Text>
				</LinearGradient>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	ThemeAndLanguage: {
		justifyContent: 'center',
		alignItems: 'center',
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
		height: 180,
		width: '90%',
		marginBottom: '5%',
	},
});
