
import React from 'react';
import {TextInput} from 'react-native-paper';

type Props = {
	maxLength: number;
	placeholder: string;
	label: string;
	value: string;
	setValue: (value) => void;
	focus: () => void;
};
export const TextInputForAddCar = (props: Props) => (
	<>
		<TextInput
			value={props.value}
			onChangeText={value => {
				props.setValue(value);
			}}
			maxLength={props.maxLength}
			placeholderTextColor = {'gray'}
			placeholder = {props.placeholder}
			outlineColor = {'#b2a9d6'}
			outlineStyle = {{borderRadius: 12, borderWidth: 1.8}}
			mode = {'outlined'}
			style = {{width: '90%', backgroundColor: '#fafbff'}}
			label ={props.label}
			onFocus = {() => {
				props.focus();
			}}
		/>
	</>
);
