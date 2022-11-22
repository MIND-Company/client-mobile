import React from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

export default function TextInputComponent(props: {length: number; type?: 'email-address' | 'numeric'; focus?: any; clearError: any; value: string;func: any; secure: boolean; placeholder: string}) {
	return (
		<View style={styles.inputView}>
			<TextInput style={styles.inputStyles}
				value={props.value}
				onChangeText={props.func}
				placeholder={props.placeholder}
				placeholderTextColor='#9A9A9A'
				secureTextEntry={props.secure}
				onFocus={props.focus ? (props.clearError, props.focus) : props.clearError}
				keyboardType={props.type ? props.type : 'default'}
				maxLength={props.length}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputView: {
		alignItems: 'center',
		height: '14%',
	},
	inputStyles: {
		height: Math.round(Dimensions.get('window').height) / 16,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderRadius: 14,
		paddingLeft: '5%',
		borderWidth: 2,
		width: '80%',
		color: '#151719',
		fontSize: 16,
	},
});
