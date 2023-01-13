import YaMap, {Marker} from 'react-native-yamap';
import {
	ActivityIndicator,
	PermissionsAndroid, StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import themeContext from '../../config/ThemeContext';
import Geolocation from 'react-native-geolocation-service';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

void YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');
void YaMap.setLocale('ru_RU');
const requestLocationPermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Запрос геолокации',
				message: 'Хотите разрешить получение геолокации?',
				buttonNeutral: 'Позже',
				buttonPositive: 'Ок',
			},
		);
		console.log('granted', granted);
		if (granted === 'granted') {
			console.log('You can use Geolocation');
			return true;
		}

		console.log('You cannot use Geolocation');
		return false;
	} catch (err: unknown) {
		return false;
	}
};

export default function ParkingScreen() {
	const [location, setLocation] = useState(false);
	const [loading, setLoading] = useState(true);
	const [detailsPerking, setDetailsPerking] = useState({lat: null,
		long: null,
		details: {
			description: '',
			address: '',
			places: null,
			freePlaces: null,
			pricePerHour: null,
			freeParking: '',
		},
	});
	const [mark, setMark] = useState(99);

	const toggleBottomNavigationView = () => {
		bottomSheetRef.current.close();
	};

	const bottomSheetRef = useRef<BottomSheet>(null);
	const mapRef = useRef<YaMap>(null);
	const snapPoints = useMemo(() => ['30%', '40%'], []);

	const getLocation = () => {
		const result = requestLocationPermission();
		result.then(res => {
			console.log('res is:', res);
			if (res) {
				Geolocation.getCurrentPosition(
					position => {
						console.log(position);
						setLocation(position);
					},
					error => {
						// See error code charts below.
						console.log(error.code, error.message);
						setLocation(false);
					},
					{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
				);
			}
		}).then(() => {
			setLoading(false);
		});
		console.log(location);
	};

	const theme = useContext(themeContext);
	const markerArray = [
		{lat: 56.8500620,
			long: 60.6701190,
			details: {
				description: 'ТЦ Гринвич',
				address: 'ул. 8 Марта, 46',
				places: 250,
				freePlaces: 233,
				pricePerHour: 200,
				freeParking: '2 часа',
			},
		},
		{lat: 56.8256,
			long: 60.62609,
			details: {
				description: 'ТЦ Пассаж',
				address: 'ул. Вайнера, 9',
				places: 200,
				freePlaces: 149,
				pricePerHour: 300,
				freeParking: '2 часа',
			},
		},
		{lat: 56.834,
			long: 60.623,
			details: {
				description: 'ТЦ Алатырь',
				address: 'ул. Малышева, 5',
				places: 360,
				freePlaces: 223,
				pricePerHour: 250,
				freeParking: '3 часа',
			},
		},
		{
			lat: 56.825,
			long: 60.65,
			details: {
				description: 'ТЦ Парк-Хаус',
				address: 'ул. Сулимова, 50',
				places: 200,
				freePlaces: 149,
				pricePerHour: 300,
				freeParking: '2 часа',
			},
		},
		{lat: 56.847,
			long: 60.65,
			details: {
				description: 'Универмаг Bolshoy',
				address: 'ул. Малышева, 71',
				places: 400,
				freePlaces: 341,
				pricePerHour: 200,
				freeParking: '2 часа',
			},
		},
		{lat: 56.841,
			long: 60.62,
			details: {
				description: 'БЦ Высоцкий',
				address: 'ул. Малышева, 51',
				places: 200,
				freePlaces: 154,
				pricePerHour: 400,
				freeParking: '2 часа',
			},
		},
	];

	useEffect(() => {
		getLocation();
	}, []);

	const renderBackdrop = useCallback(
		props => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
			/>
		),
		[],
	);

	return (
		<>
			{loading ? (
				<View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: theme.backgroundScreen}}>
					<ActivityIndicator animating={true} size={30} color='#C5C5C5' />
				</View>
			)
				: <YaMap
					ref = {mapRef}
					onMapLoaded={() => {
						setMark(100);
					}
					}
					followUser={true}
					nightMode={theme.nightMapColor}
					userLocationAccuracyFillColor={'#d6dae2'}
					userLocationIcon={require('../images/user.png')}
					userLocationIconScale={0.4}
					initialRegion={{
						lat: location ? location.coords.latitude : 56.8519,
						lon: location ? location.coords.longitude : 60.6122,
						zoom: 17,
						azimuth: 90,
						tilt: 30,
					}}
					style={{flex: 1}}>
					{markerArray.map((element, index) =>
						<Marker source={require('../images/mark.png')} zIndex={mark} key={index} point={{lat: element.lat, lon: element.long}} scale={0.2} onPress={() => {
							setDetailsPerking(element);
							// MapRef.current.findRoutes([{lat: 56.841, lon: 60.62}, {lat: location.coords.latitude, lon: location.coords.longitude}], ['car'], () => console.log('a'));
							bottomSheetRef.current.snapToIndex(0);
						}} />)}
				</YaMap>
			}
			<BottomSheet
				backdropComponent={renderBackdrop}
				index={-1}
				ref={bottomSheetRef}
				snapPoints={snapPoints}
			>
				{/* Bottom Sheet inner View */}
				<View style={styles.bottomNavigationView}>
					<View>
						<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.9), color: '#886DEC'}}>{detailsPerking.details.description}</Text>
					</View>
					<View
						style={{
							height: 10,
							width: '100%',
							borderBottomColor: 'gray',
							borderBottomWidth: 2.5,
						}}
					/>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Адрес: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsPerking.details.address}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Количество мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsPerking.details.places}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Свободных мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsPerking.details.freePlaces}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Цена за час сегодня: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsPerking.details.pricePerHour}₽</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Бесплатная стоянка: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsPerking.details.freeParking}</Text></Text>
					</View>
				</View>
			</BottomSheet>
		</>
	);
}

const styles = StyleSheet.create({
	sheetDetailText: {
		fontSize: responsiveFontSize(2.2),
		fontFamily: 'Montserrat-Regular',
	},
	bottomNavigationView: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
	},
});

