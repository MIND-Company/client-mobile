import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function InfoComponent(props: {bg: string; textColor: string}) {
	return (
		<View style={[styles.View, {backgroundColor: props.bg}]}>
			<Text style={[styles.ViewText, {color: props.textColor}]}><Text style={styles.textNumberStyle}>1) </Text> Перед въездом проверьте, что задний регистрационный
                знак читаем</Text>
			<Text style={[styles.ViewText, {color: props.textColor}]}><Text style={styles.textNumberStyle}>2) </Text> При въезде на парковку наша камера считает номер
                вашего транспортного средства, от вас никаких
                действий не требуется</Text>
			<Text style={[styles.ViewText, {color: props.textColor}]}><Text style={styles.textNumberStyle}>3) </Text> При выезде камера считает номер транспортного
                средства и автоматически спишет с вашей карты
                нужную сумму, и откроет шлагбаум</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textNumberStyle: {
		fontWeight: 'bold',
		fontSize: 19,
		color: '#886DEC',
	},
	ViewText: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 20,
		marginLeft: '4%',
		marginRight: '2%',
		marginVertical: '1%',
	},
	View: {
		alignSelf: 'center',
		marginTop: '3%',
		width: '95%',
		borderRadius: 20,
		marginBottom: '1.5%',
		paddingVertical: '3%',
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		justifyContent: 'space-evenly',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
});
