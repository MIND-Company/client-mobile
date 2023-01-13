import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

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

const CurrentParkingComponent = (props: {screen: string; color: string; element: CurrentParkingComponentProps}) => {
	const [time, setTime] = useState<string>('0:00:00');
	const [load, setLoad] = useState<boolean>(true);
	const entry = props.element.entry_time_utc;

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
		const milliseconds = Math.abs(new Date() - Date.parse(entry));
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
							color: props.color,
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
					<Text style={{marginLeft: '2.5%', fontSize: responsiveFontSize(2.2), fontFamily: 'Montserrat-Medium', color: 'black'}}>Текущий паркинг:</Text>
					<View style={[styles.parentsView]}>
						<View style={[{width: '36%'}]}><Text style={[{fontSize: responsiveFontSize(2.4), fontFamily: 'Montserrat-Medium', color: 'black'}]}>{props.element.park.description}</Text></View>
						<View style={[{width: '33%', alignItems: 'center'}]}><Text style={[{fontSize: responsiveFontSize(2.4), fontFamily: 'Montserrat-Medium', color: 'black'}]}>{props.element.current_price}₽</Text></View>
						{load ? <ActivityIndicator style={{marginLeft: '14%'}} size={'small'} color={'#886DEC'} />
							:							<View style={[{alignItems: 'center', width: '31%'}]}><Text style={[{fontSize: responsiveFontSize(2.3), fontFamily: 'Montserrat-Medium', color: 'black'}]}>{time}</Text></View>}
					</View>
				</View>
			}
		</>
	);
};

const styles = StyleSheet.create({
	parentsView: {
		backgroundColor: 'white',
		borderColor: '#886DEC',
		borderStyle: 'solid',
		borderWidth: 1,
		alignItems: 'center',
		paddingHorizontal: '3%',
		paddingVertical: '4%',
		borderRadius: 15,
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
