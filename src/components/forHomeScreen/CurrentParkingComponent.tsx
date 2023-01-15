import {StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import ThemeContext from '../../../config/ThemeContext';

type CurrentParkingComponentProps = {
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
		web_address: string;};
};

const CurrentParkingComponent = (props: {screen: string; element: CurrentParkingComponentProps}) => {
	const [time, setTime] = useState<string>('0:00:00');
	const [load, setLoad] = useState<boolean>(true);
	const entry = props.element.entry_time_utc;
	const theme = useContext(ThemeContext);

	useEffect(() => {
		const setTimer
			= setInterval(() => {
				timer();
			}, 1000);
		return () => {
			clearInterval(setTimer);
		};
	}, []);

	const timer = () => {
		const milliseconds: number = Math.abs(new Date() - Date.parse(entry));
		const seconds = Math.floor((milliseconds / 1000) % 60);
		let finalSeconds = '';
		if (seconds < 10) {
			finalSeconds = '0' + seconds.toString();
		} else {
			finalSeconds = seconds.toString();
		}

		const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
		let finalMinutes = '';
		if (minutes < 10) {
			finalMinutes = '0' + minutes.toString();
		} else {
			finalMinutes = minutes.toString();
		}

		const hours = Math.floor((milliseconds / 1000 / 60 / 60));
		let finalHours = '';
		if (hours < 10) {
			finalHours = '0' + hours.toString();
		} else {
			finalHours = hours.toString();
		}

		setTime(finalHours + ':' + finalMinutes + ':' + finalSeconds);
		setLoad(false);
	};

	return (
		<>
			{props.screen === 'home'
				? <View style={styles.viewStyle}>
					<View style={styles.topViewStyle}>
						<Text style={{
							fontSize: responsiveFontSize(2.2),
							color: 'gray',
							fontWeight: '500',
							marginTop: '3%',
							fontFamily: 'Montserrat-SemiBold',
						}}>Вы сейчас на парковке</Text>
						<Text style={{
							fontSize: responsiveFontSize(2.2),
							color: '#886DEC',
							fontWeight: '500',
							marginTop: '1%',
							fontFamily: 'Montserrat-SemiBold',
						}}>{props.element.park.description}</Text>
					</View>
					<View style={{justifyContent: 'center', marginTop: '5%'}}>
						<Text style={{
							fontSize: responsiveFontSize(6.8),
							alignSelf: 'center',
							color: theme.textColor,
							fontFamily: 'Montserrat-SemiBold',
						}}>{props.element.current_price}₽</Text>
					</View>
					{load ? <ActivityIndicator style={{marginTop: '7%'}} size={'small'} color={'#886DEC'} />
						: <View style={{
							justifyContent: 'center',
							marginTop: '5%',
							alignItems: 'center',
							flexDirection: 'row',
							flexWrap: 'nowrap',
						}}>
							<Text style={{fontSize: responsiveFontSize(2), color: 'gray', fontFamily: 'Montserrat-Medium'}}>Вы на
								парковке:</Text>
							<Text style={{
								marginLeft: '2%',
								fontSize: responsiveFontSize(2.8),
								color: '#886DEC',
								fontFamily: 'Montserrat-SemiBold',
							}}>{time}</Text>
						</View>
					}
				</View>
				: <View>
					<Text style={{fontSize: responsiveFontSize(2.6), fontFamily: 'Montserrat-SemiBold', color: theme.textColor, textAlign: 'center'}}>Текущий паркинг:</Text>
					<View style={[styles.parentsView, {backgroundColor: theme.backgroundComponent}]}>
						<View style={{marginLeft: '3%', width: '82%', height: '100%'}}>
							<View style={{flexDirection: 'row'}}>
								<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.8), color: theme.textColor}}>Парковка на</Text>
								{load ? <ActivityIndicator size={'small'} color = {'#886DEC'} style={{marginLeft: '14.5%'}} /> : <Text style={{marginLeft: '2.5%', fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.8), color: theme.textColor}}>{time}</Text>}
							</View>
							<Text style={{fontFamily: 'Montserrat-Regular', fontSize: responsiveFontSize(2.2), color: theme.textColor}}>{props.element.park.description}, {props.element.current_price}₽</Text>
						</View>
						<View style={styles.imageView}>
							<Image source={require('../../images/parking.png')} style={{width: responsiveWidth(11), height: responsiveHeight(6.1)}} />
						</View>
					</View>
				</View>
			}
		</>
	);
};

const styles = StyleSheet.create({
	imageView: {
		width: '13%',
		height: '100%',
		borderTopRightRadius: 19,
		borderBottomRightRadius: 19,
		justifyContent: 'center',
		alignItems: 'center',
	},
	parentsView: {
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 2,
		alignItems: 'center',
		height: responsiveHeight(8.9),
		paddingVertical: '1%',
		borderRadius: 19,
		alignSelf: 'center',
		marginTop: '2%',
		width: '95%',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	buttonStyle: {
		alignSelf: 'center',
		paddingHorizontal: '5%',
		paddingVertical: '1%',
	},
	topViewStyle: {
		alignSelf: 'center',
		width: '100%',
		alignItems: 'center',
	},
	viewStyle: {
		height: '100%',
		width: '100%',
		borderRadius: 20,
	},
});

export default CurrentParkingComponent;
