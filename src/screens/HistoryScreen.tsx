import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import OneHistoryComponent from '../components/OneHistoryComponent';
import themeContext from '../../config/ThemeContext';
import type {NavigationProp} from '@react-navigation/native';

export default function HistoryScreen({navigation}: {navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const arrayObjects = [
		{name: 'Гринвич',
			price: '500Р',
			date: '10.07.2021',
		},
		{name: 'ИРИТ-РТФ',
			price: '400Р',
			date: '10.07.2021',
		},
		{name: 'Пассаж',
			price: '300Р',
			date: '10.07.2021',
		},
		{name: 'ТЦ Большой',
			price: '200Р',
			date: '10.07.2021',
		},
		{name: 'ТЦ Алатырь',
			price: '100Р',
			date: '10.07.2021',
		},
		{name: 'Гринвич',
			price: '500Р',
			date: '10.07.2021',
		},
		{name: 'ИРИТ-РТФ',
			price: '400Р',
			date: '10.07.2021',
		},
		{name: 'Пассаж',
			price: '300Р',
			date: '10.07.2021',
		},
		{name: 'ТЦ Большой',
			price: '200Р',
			date: '10.07.2021',
		},
		{name: 'ТЦ Алатырь',
			price: '100Р',
			date: '10.07.2021',
		},
	];

	const goParkingDetails = (element: Record<string, unknown>) => {
		navigation.navigate('ParkingDetails', {element});
	};

	return (
		<View style={[{backgroundColor: theme.backgroundScreen}]}>
			<View style={[{width: '95%', height: '7%', alignSelf: 'center', backgroundColor: theme.backgroundScreen}]}>
				<View style={[styles.upView, {backgroundColor: theme.backgroundComponent}]}>
					<View style={[styles.upViewContainer, {alignItems: 'stretch'}]}><Text style={[{fontSize: 19, color: theme.textColor}]}>Название</Text></View>
					<View style={styles.upViewContainer}><Text style={[{fontSize: 19, color: theme.textColor}]}>Стоимость</Text></View>
					<View style={[{paddingVertical: '0.5%', width: '30%', alignItems: 'center'}]}><Text style={[{fontSize: 19, color: theme.textColor}]}>Дата</Text></View>
				</View>
			</View>
			<ScrollView style={[{width: '100%'}]}>
				{arrayObjects.map((element, index) =>
					<OneHistoryComponent textColor = {theme.textColor} bg = {theme.backgroundComponent} key = {index} name = {element.name} price = {element.price} date = {element.date} func = {() => {
						goParkingDetails(element);
					}}/>,
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	upViewContainer: {
		paddingVertical: '0.5%',
		borderColor: '#886DEC',
		borderRightWidth: 2,
		width: '35%',
		alignItems: 'center',
	},
	upView: {
		borderColor: '#886DEC',
		borderRadius: 15,
		alignSelf: 'center',
		width: '100%',
		borderStyle: 'solid',
		borderWidth: 3,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		paddingHorizontal: '5%',
		marginTop: '3%',
	},
	container: {
		flex: 1,
		backgroundColor: '#EFF1FB',
		alignItems: 'center',
	},
});
