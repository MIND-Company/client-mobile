import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import CarIcon from 'react-native-vector-icons/Ionicons';
import CardIcon from 'react-native-vector-icons/Ionicons';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../../config/ThemeContext';
import StatsIcon from 'react-native-vector-icons/Ionicons';
import LanguageIcon from 'react-native-vector-icons/MaterialIcons';
import ThemeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileButtonComponent(props: {cardFunc: () => void; numberFunc: () => void; statsFunc: () => void}) {
	const [mode, setMode] = useState(false);
	const theme = useContext(themeContext);

	const styles = StyleSheet.create({
		textStyle: {
			fontFamily: 'Montserrat-Bold',
			textAlign: 'left',
			marginLeft: '5%',
			fontSize: responsiveFontSize(2.4),
			color: theme.buttonProfileAndAddCar,
		},
		viewStyle: {
			paddingRight: '7%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginVertical: '2%',
			backgroundColor: theme.backgroundComponent,
			height: responsiveHeight(8),
			alignSelf: 'center',
			width: '95%',
			borderRadius: 12,
			elevation: 5,
		},
	});
	return (
		<>
			<TouchableOpacity style={styles.viewStyle} onPress={props.numberFunc}>
				<Text style={styles.textStyle}>Изменить номер т/с</Text>
				<CarIcon name='ios-car' size={28} color = {theme.buttonProfileAndAddCar}/>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.viewStyle]} onPress={props.cardFunc}>
				<Text style={styles.textStyle}>Добавить способ оплаты</Text>
				<CardIcon name='ios-card' size={28} color = {theme.buttonProfileAndAddCar}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.viewStyle} onPress={props.statsFunc}>
				<Text style={styles.textStyle}>Статистика по парковкам</Text>
				<StatsIcon name='ios-stats-chart' size={28} color = {theme.buttonProfileAndAddCar}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.viewStyle} onPress={() => null}>
				<Text style={styles.textStyle}>Сменить язык</Text>
				<LanguageIcon name='language' size={28} color = {theme.buttonProfileAndAddCar}/>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.viewStyle]} onPress={() => {
				setMode(!mode);
				EventRegister.emit('ChangeTheme', mode);
			}} >
				<Text style={styles.textStyle}>Включить {theme.text} тему</Text>
				<ThemeIcon name='theme-light-dark' size={28} color = {theme.buttonProfileAndAddCar}/>
			</TouchableOpacity>
		</>
	);
}
