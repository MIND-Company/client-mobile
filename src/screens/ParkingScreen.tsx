import YaMap, {Marker} from 'react-native-yamap';
import {
	ActivityIndicator,
	PermissionsAndroid,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
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
				buttonNegative: 'Отмена',
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
	} catch (err) {
		return false;
	}
};

export default function ParkingScreen() {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [location, setLocation] = useState(false);
	const [loading, setLoading] = useState(true);
	const [currentCoordinates, setCurrentCoordinates] = useState({lat: null, long: null});
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
		setLoading(false);
	};

	const theme = useContext(themeContext);
	const markerArray = [
		{lat: 56.8380620,
			long: 60.6601190,
			image: require('../images/mark.png')},
		{lat: 56.8256,
			long: 60.62609,
			image: require('../images/mark.png')},
		{lat: 56.83,
			long: 60.623,
			image: require('../images/mark.png')},
		{lat: 56.825,
			long: 60.65,
			image: require('../images/mark.png')},
		{lat: 56.845,
			long: 60.65,
			image: require('../images/mark.png')},
		{lat: 56.835,
			long: 60.62,
			image: require('../images/mark.png')},
	];

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<Modal isVisible={modalVisible} onSwipeComplete={() => setModalVisible(!modalVisible)} swipeDirection= 'left' statusBarTranslucent={true}>
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
			{loading ? <ActivityIndicator animating={true} size='large' color='#C5C5C5' />
				: <YaMap
					followUser={true}
					nightMode={theme.nightMapColor}
					userLocationIcon={require('../images/user.png')}
					userLocationIconScale={0.7}
					initialRegion={{
						lat: location ? location.coords.latitude : 56.8519,
						lon: location ? location.coords.longitude : 60.6122,
						zoom: 17,
						azimuth: 90,
						tilt: 30,
					}}
					style={{flex: 1}}>
					{markerArray.map((element, index) =>
						<Marker key={index} point={{lat: element.lat, lon: element.long}}
							source={require('../images/mark.png')} scale={0.8} onPress={() => {
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

