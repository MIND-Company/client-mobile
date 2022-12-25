import type {FC} from 'react';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

type TextInputComponentProps = {
	length: number;
	type?: 'email-address' | 'numeric';
	clearError: () => void;
	value: string;
	func: (value: string) => void;
	secure: boolean;
	placeholder: string;
	label: string;
};

export const TextInputComponent: FC<TextInputComponentProps> = ({label, length, type, clearError, value, func, secure, placeholder}) => (
	<View style={{alignItems: 'center', height: '14%', marginBottom: '1%'}}>
		<TextInput
			value={value}
			onChangeText={func}
			secureTextEntry={secure}
			maxLength={length}
			placeholderTextColor = {'gray'}
			placeholder = {placeholder}
			outlineColor = {'#886DEC'}
			outlineStyle = {{borderRadius: 12, borderWidth: 2}}
			mode = {'outlined'}
			style = {{width: '80%', backgroundColor: '#EFF1FB'}}
			label ={label}
			onFocus = {clearError}
		/>
	</View>
);

export default TextInputComponent;
