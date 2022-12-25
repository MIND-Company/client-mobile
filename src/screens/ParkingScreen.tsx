import YaMap, {Marker} from 'react-native-yamap';
import {
	ActivityIndicator, Image,
	PermissionsAndroid,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import themeContext from '../../config/ThemeContext';
import Geolocation from 'react-native-geolocation-service';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

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
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [location, setLocation] = useState(false);
	const [loading, setLoading] = useState(true);
	const [currentCoordinates, setCurrentCoordinates] = useState({lat: null, long: null});
	const [mark, setMark] = useState(99);

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
		},
		{lat: 56.8256,
			long: 60.62609,
		},
		{lat: 56.834,
			long: 60.623},
		{
			lat: 56.825,
			long: 60.65,
		},
		{lat: 56.847,
			long: 60.65,
		},
		{lat: 56.841,
			long: 60.62,
		},
	];

	useEffect(() => {
		getLocation();
	}, []);
	return (
		<>
			<Modal isVisible={modalVisible} onSwipeComplete={() => {
				setModalVisible(!modalVisible);
			}} swipeDirection= 'left' statusBarTranslucent={true}>
				<View style={styles.modalView}>
					<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '4%', marginTop: '3%'}]}
						onPress={() => {
							setModalVisible(!modalVisible);
						}}>
						<CloseIcon name='close' size={28} color='#886DEC' />
					</TouchableOpacity>
					<Text style={styles.modalHeadingText}>{currentCoordinates.lat}</Text>
					<Text style={styles.modalHeadingText}>{currentCoordinates.long}</Text>
				</View>
			</Modal>
			{loading ? (
				<View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: theme.backgroundScreen}}>
					<ActivityIndicator animating={true} size={30} color='#C5C5C5' />
				</View>
			)
				: <YaMap
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
							setCurrentCoordinates({lat: element.lat, long: element.long});
							setModalVisible(true);
						}} />)}
				</YaMap>
			}
		</>
	);
}

const styles = StyleSheet.create({
	modalView: {
		alignSelf: 'center',
		height: '35%',
		width: '85%',
		backgroundColor: 'white',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		alignItems: 'center',
	},
	modalHeadingText: {
		marginTop: '2%',
		fontWeight: 'bold',
		fontSize: 18,
		color: '#886DEC',
		textAlign: 'center',
	},
});

