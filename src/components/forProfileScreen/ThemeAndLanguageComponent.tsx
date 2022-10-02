import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function ThemeAndLanguageComponent(props: {func: any; secondFunc: any}) {
	return (
		<View style={styles.ThemeAndLanguageView}>
			<TouchableOpacity style={[{width: '48%', height: '100%'}]} onPress={props.func}>
				<View style={[styles.ThemeAndLanguage, {backgroundColor: '#003AFF'}]}>
					<Text style={styles.textStyle}>Русский язык</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={[{width: '48%', height: '100%'}]} onPress={props.secondFunc}>
				<View style={[styles.ThemeAndLanguage, {backgroundColor: '#000000'}]}>
					<Text style={styles.textStyle}>Включить тёмную тему</Text>
				</View>
			</TouchableOpacity>
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
		width: '100%',
	},
	ThemeAndLanguageView: {
		flexDirection: 'row',
		marginTop: '5%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		height: 180,
		width: '90%',
		marginBottom: '5%',
		shadowOpacity: 0.15,
		elevation: 15,
		shadowOffset: {width: 7, height: 7},
		shadowColor: '#000000',
	},
});
