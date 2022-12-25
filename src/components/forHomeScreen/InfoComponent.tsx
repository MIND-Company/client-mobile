import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

type InfoComponentProps = {
	bgColor: string;
	textColor: string;
};

const InfoComponent: FC<InfoComponentProps> = ({bgColor, textColor}) => (
	<View style={[styles.View, {backgroundColor: bgColor}]}>
		<Text style={[styles.ViewText, {color: textColor}]}><Text style={styles.textNumberStyle}>1) </Text> Перед въездом проверьте, что задний регистрационный
                знак читаем</Text>
		<Text style={[styles.ViewText, {color: textColor}]}><Text style={styles.textNumberStyle}>2) </Text> При въезде на парковку наша камера считает номер
                вашего транспортного средства, от вас никаких
                действий не требуется</Text>
		<Text style={[styles.ViewText, {color: textColor}]}><Text style={styles.textNumberStyle}>3) </Text> При выезде камера считает номер транспортного
                средства и автоматически спишет с вашей карты
                нужную сумму, и откроет шлагбаум</Text>
	</View>
);

const styles = StyleSheet.create({
	textNumberStyle: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: responsiveFontSize(2.5),
		color: '#886DEC',
	},
	ViewText: {
		letterSpacing: 0,
		fontFamily: 'Montserrat-SemiBold',
		fontSize: responsiveFontSize(2),
		lineHeight: 19,
		marginLeft: '4%',
		marginRight: '2%',
		marginVertical: '1%',
	},
	View: {
		alignSelf: 'center',
		marginTop: '2%',
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

export default InfoComponent;
