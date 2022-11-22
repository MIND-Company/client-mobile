import themeContext from '../../../config/ThemeContext';
import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ParkingDetailsScreen({route, navigation}: {route: any;navigation: any}) {
	const theme = useContext(themeContext);
	const parking = route.params.element;
	// console.log(parking);
	return (
		<View style={[{backgroundColor: theme.backgroundScreen, flex: 1}]}>
			<TouchableOpacity style={[{marginBottom: '3%', maxWidth: '35%'}]} onPress={() => navigation.goBack()}>
				<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
					<Icon name='chevron-back' size={22} color='#886DEC' style={[{marginLeft: '3%'}]}/>
					<Text style={styles.backStyle}>Вернуться</Text>
				</View>
			</TouchableOpacity>
			<ScrollView>
				<View style={[{alignItems: 'center', justifyContent: 'center'}]}>
					<Text style={[{color: ' #282828', fontSize: 21, fontWeight: 'bold'}]}>Информация о парковке</Text>
					<Image source={require('../../images/grin.jpg')} style={styles.ImageStyle} />
					<View style={[{marginTop: '7%', width: '100%'}]}>
						<View style={[{paddingTop: '3%', height: 120, flexDirection: 'row', justifyContent: 'space-between'}]}>
							<View style={[{alignItems: 'center', height: '100%', width: '50%'}]}>
								<Text style={styles.TextStyle}>НАЗВАНИЕ</Text>
								<Text style={styles.TextStyle}>{parking.park.description}</Text>
							</View>
							<View style={[{alignItems: 'center', height: '100%', width: '50%'}]}>
								<Text style={styles.TextStyle}> САЙТ</Text>
								<Text style={styles.TextStyle}>{parking.park.webAddress}</Text>
							</View>
						</View>
						<View style={[{alignItems: 'center', paddingTop: '3%', height: 120}]}>
							<Text style={styles.TextStyle}>НОМЕР МАШИНЫ</Text>
							<Text style={styles.TextStyle}>{parking.car}</Text>
						</View>
						<View style={[{paddingTop: '3%', height: 120, flexDirection: 'row', justifyContent: 'space-between'}]}>
							<View style={[{alignItems: 'center', height: '100%', width: '50%'}]}>
								<Text style={styles.TextStyle}>ДАТА ЗАЕЗДА</Text>
								<Text style={styles.TextStyle}>{parking.entry_time.slice(0, 10)}</Text>
								<Text style={styles.TextStyle}>{parking.entry_time.slice(11, 19)}</Text>
							</View>
							<View style={[{alignItems: 'center', height: '100%', width: '50%'}]}>
								<Text style={styles.TextStyle}> ДАТА ВЫЕЗДА</Text>
								<Text style={styles.TextStyle}>{parking.checkout_time.slice(0, 10)}</Text>
								<Text style={styles.TextStyle}>{parking.checkout_time.slice(11, 19)}</Text>
							</View>
						</View>
						<View style={[{alignItems: 'center', paddingTop: '3%', height: 120}]}>
							<Text style={styles.TextStyle}>СТОИМОСТЬ</Text>
							<Text style={styles.TextStyle}>500Р</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	TextStyle: {
		color: '#886DEC',
		fontSize: 18,
		fontWeight: '500',
	},
	ImageStyle: {
		height: 150,
		width: 250,
		borderRadius: 20,
		marginTop: '5%',
	},
	backStyle: {
		color: '#886DEC',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
