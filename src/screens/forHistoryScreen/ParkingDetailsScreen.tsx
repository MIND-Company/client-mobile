import themeContext from '../../../config/ThemeContext';
import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';

type ParkingDetailScreenElement = {
	current_price: string | undefined;
	calculated_price: string | undefined;
	car: string;
	checkout_time_utc: string;
	checkout_time_local: string;
	entry_time_utc: string;
	entry_time_local: string;
	park: {
		description: string;
		id: number;
		web_address: string;
	};
};

export default function ParkingDetailsScreen({route, navigation}: {route: RouteProp<{params: {element: ParkingDetailScreenElement}}, 'params'>; navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const parking = route.params.element;
	return (
		<SafeAreaView style={[{flex: 1, backgroundColor: theme.backgroundScreen}]}>
			<TouchableOpacity style={[{marginTop: '13%', width: '25%', position: 'absolute', zIndex: 999}]} onPress={() => {
				navigation.goBack();
			}}>
				<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
					<Icon name='chevron-back' size={40} color='#886DEC' style={[{marginLeft: '3%'}]}/>
				</View>
			</TouchableOpacity>
			<ScrollView>
				<Image source={require('../../images/grin.jpg')} style={styles.imageStyle} />
				<View style={[{alignItems: 'center'}]}>
					<View style={styles.numberAndPriceView}>
						<View style={styles.numberCarAndPriceTextView}>
							<Text style={styles.headingTextStyle}>НОМЕР Т/С</Text>
						</View>
						<View style={styles.numberTextView}>
							<Text style={[styles.priceAndNumberText, {color: theme.parkingDetailsText}]}>{parking.car.toUpperCase()}</Text>
						</View>
					</View>
					<View style={styles.dateView}>
						<View style={[styles.oneDateComponentView, {backgroundColor: theme.backgroundComponent, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
							<Text style={[{color: theme.color, fontSize: 21, fontWeight: '700', marginBottom: '10%'}]}>Дата заезда</Text>
							<Text style={[styles.textStyle, {color: theme.parkingDetailsText}]}>{parking.entry_time_local.slice(0, 10)}</Text>
							<Text style={[styles.textStyle, {color: theme.parkingDetailsText}]}>{parking.entry_time_local.slice(11, 19)}</Text>
						</View>
						<View style={[styles.oneDateComponentView, {backgroundColor: theme.backgroundComponent, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
							<Text style={[{color: theme.color, fontSize: 21, fontWeight: '700', marginBottom: '10%'}]}>Дата выезда</Text>
							<Text style={[styles.textStyle, {color: theme.parkingDetailsText}]}>{parking.checkout_time_local.slice(0, 10)}</Text>
							<Text style={[styles.textStyle, {color: theme.parkingDetailsText}]}>{parking.checkout_time_local.slice(11, 19)}</Text>
						</View>
					</View>
					<View style={[styles.numberAndPriceView, {marginBottom: '5%', marginTop: '4%'}]}>
						<View style={styles.numberCarAndPriceTextView}>
							<Text style={styles.headingTextStyle}>СТОИМОСТЬ</Text>
						</View>
						<View style={styles.numberTextView}>
							<Text style={[styles.priceAndNumberText, {color: theme.parkingDetailsText}]}>{parking.calculated_price}₽</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	priceAndNumberText: {
		fontSize: 23,
		fontWeight: 'bold',
	},
	headingTextStyle: {
		fontFamily: 'Montserrat-Bold',
		fontSize: responsiveFontSize(2.3),
		fontWeight: '800',
		color: '#E6E6FA',
	},
	numberAndPriceView: {
		height: responsiveHeight(14),
		width: '80%',
		borderRadius: 20,
		marginTop: '6%',
		borderStyle: 'solid',
		borderWidth: 3,
		borderColor: '#886DEC',
	},
	numberTextView: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: '50%',
	},
	dateView: {
		marginTop: '5%',
		width: '100%',
		height: responsiveHeight(17),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	oneDateComponentView: {
		borderColor: '#886DEC',
		borderStyle: 'solid',
		borderWidth: 1,
		width: '45%',
		height: '95%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 6,
		shadowOffset: {width: 7, height: 7},
	},
	numberCarAndPriceTextView: {
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		width: '100%',
		backgroundColor: '#9966cc',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 7,
		shadowOffset: {width: 7, height: 7},
	},
	textStyle: {
		color: '#330643',
		fontSize: 20,
		fontWeight: 'bold',
	},
	imageStyle: {
		height: 190,
		width: '100%',
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
	},
	backStyle: {
		fontSize: 16,
		fontWeight: '700',
	},
});
