import themeContext from '../../../config/ThemeContext';
import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {BackComponent} from '../../components/BackComponent';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

type ParkingDetailScreenElement = {
	calculated_price: string | undefined;
	car: string;
	checkout_time: string;
	entry_time: string;
	park: {
		description: string;
		id: number;
		web_address: string;};
};

export default function ParkingDetailsScreen({route, navigation}: {route: RouteProp<{params: {element: ParkingDetailScreenElement}}, 'params'>; navigation: NavigationProp<any>}) {
	const theme = useContext(themeContext);
	const parking = route.params.element;
	return (
		<View style={[{flex: 1, backgroundColor: theme.backgroundScreen}]}>
			<BackComponent goBackFunc={() => {
				navigation.goBack();
			}}/>
			<ScrollView>
				<Image source={require('../../images/grin.jpg')} style={styles.imageStyle} />
				<View style={[{alignItems: 'center'}]}>
					<View style={styles.numberAndPriceView}>
						<View style={styles.numberCarAndPriceTextView}>
							<Text style={styles.headingTextStyle}>НОМЕР Т/С</Text>
						</View>
						<View style={styles.numberTextView}>
							<Text style={styles.priceAndNumberText}>{parking.car.toUpperCase()}</Text>
						</View>
					</View>
					<View style={styles.dateView}>
						<View style={[styles.oneDateComponentView, {backgroundColor: theme.backgroundComponent, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
							<Text style={[{color: theme.color, fontSize: 21, fontWeight: '700', marginBottom: '10%'}]}>Дата заезда</Text>
							<Text style={styles.textStyle}>{parking.entry_time.slice(0, 10)}</Text>
							<Text style={styles.textStyle}>{parking.entry_time.slice(11, 19)}</Text>
						</View>
						<View style={[styles.oneDateComponentView, {backgroundColor: theme.backgroundComponent, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
							<Text style={[{color: theme.color, fontSize: 21, fontWeight: '700', marginBottom: '10%'}]}>Дата выезда</Text>
							<Text style={styles.textStyle}>{parking.checkout_time.slice(0, 10)}</Text>
							<Text style={styles.textStyle}>{parking.checkout_time.slice(11, 19)}</Text>
						</View>
					</View>
					<View style={[styles.numberAndPriceView, {marginBottom: '5%', marginTop: '4%'}]}>
						<View style={styles.numberCarAndPriceTextView}>
							<Text style={styles.headingTextStyle}>СТОИМОСТЬ</Text>
						</View>
						<View style={styles.numberTextView}>
							<Text style={styles.priceAndNumberText}>500Р</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	priceAndNumberText: {
		fontSize: 23,
		fontWeight: 'bold',
		color: '#45005E',
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
