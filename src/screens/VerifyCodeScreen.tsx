import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';
import {screenHeight} from '../utils/screenSize';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
	container: {
		minHeight: Math.round(screenHeight) + (screenHeight / 7.5),
		flex: 1,
		backgroundColor: '#886DEC',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: responsiveFontSize(3),
		fontFamily: 'Montserrat-Bold',
	},
	codeFieldRoot: {marginTop: 20},
	cell: {
		width: 50,
		height: 50,
		lineHeight: 48,
		color: 'white',
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(3),
		borderWidth: 3,
		borderColor: 'white',
		borderRadius: 10,
		marginHorizontal: '0.5%',
		textAlign: 'center',
	},
	focusCell: {
		borderColor: '#8b00ff',
	},
});

const CELL_COUNT = 5;

const VerifyCodeScreen = () => {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Подтверждение</Text>
			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				renderCell={({index, symbol, isFocused}) => (
					<Text
						key={index}
						style={[styles.cell, isFocused && styles.focusCell]}
						onLayout={getCellOnLayoutHandler(index)}>
						{symbol || (isFocused ? <Cursor /> : null)}
					</Text>
				)}
			/>
		</SafeAreaView>
	);
};

export default VerifyCodeScreen;
