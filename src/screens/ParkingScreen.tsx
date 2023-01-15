import YaMap, {Marker} from 'react-native-yamap';
import {
	ActivityIndicator,
	Alert,
	PermissionsAndroid,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import themeContext from '../../config/ThemeContext';
import Geolocation from 'react-native-geolocation-service';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../utils/updateAccessTokenFunction';

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
	type DetailsParkingElement = {
		address: string | undefined;
		description: string;
		id: number;
		latitude: string;
		longitude: string;
		place_count: number;
		price_list: any;
		taken: 0;
		web_address: string | undefined;
	};

	const [location, setLocation] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(true);
	const [errorText, setErrorText] = useState(true);
	const [detailsParking, setDetailsParking] = useState({
		address: '',
		description: '',
		id: 0,
		latitude: '',
		longitude: '',
		place_count: 0,
		price_list: null,
		taken: 0,
		web_address: '',
	});
	const [allParks, setAllParks] = useState<DetailsParkingElement[]>([]);
	const [mark, setMark] = useState(99);
	const theme = useContext(themeContext);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const mapRef = useRef<YaMap>(null);
	const snapPoints = useMemo(() => ['30%', '40%'], []);

	const toggleBottomNavigationView = () => {
		bottomSheetRef.current.close();
	};

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
		});
		console.log(location);
	};

	const getAllParks = async () => {
		try {
			const token = await AsyncStorage.getItem('access_token');
			const request = await fetch('http://188.68.221.169/api/all-parks/', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await request.json();
			console.log(data);
			if (request.ok) {
				setAllParks(data);
			}

			if (request.status === 401) {
				await updateAccessToken(setError, getAllParks(), setErrorText);
			}

			if (request.status === 500) {
				Alert.alert('Ошибка', 'Ошибка сервера');
			}
		} catch (e: unknown) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// MapRef.current.setTrafficVisible(true)
		void getAllParks();
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
					onMapLongPress={() => {
						console.log(allParks);
					}}
					ref = {mapRef}
					onMapLoaded={() => {
						setMark(100);
					}
					}
					followUser={true}
					tiltGesturesEnabled={false}
					rotateGesturesEnabled={false}
					nightMode={theme.nightMapColor}
					userLocationAccuracyFillColor={'#d6dae2'}
					userLocationIcon={require('../images/user.png')}
					userLocationIconScale={0.4}
					initialRegion={{
						lat: location ? location.coords.latitude : 56.8519,
						lon: location ? location.coords.longitude : 60.6122,
						zoom: 17,
						tilt: 30,
					}}
					style={{flex: 1}}>
					{allParks.map((element, index) =>
						<Marker source={require('../images/mark.png')} zIndex={mark} key={index} point={{lat: parseFloat(element.latitude), lon: parseFloat(element.longitude)}} scale={0.2} onPress={() => {
							mapRef.current.setCenter({lon: parseFloat(element.longitude), lat: parseFloat(element.latitude)}, 17, 0, 30, 1);
							setDetailsParking(element);
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
						<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.9), color: '#886DEC'}}>{detailsParking.description}</Text>
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
						<Text style={styles.sheetDetailText}>Адрес: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsParking.address}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Количество мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsParking.place_count}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Свободных мест: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>{detailsParking.place_count - detailsParking.taken}</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Цена за час сегодня: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>200₽</Text></Text>
					</View>
					<View style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%'}}>
						<Text style={styles.sheetDetailText}>Бесплатная стоянка: <Text style={{color: '#886DEC', fontSize: responsiveFontSize(2.5)}}>2 часа</Text></Text>
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

