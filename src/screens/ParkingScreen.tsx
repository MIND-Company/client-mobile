import YaMap, {Marker} from 'react-native-yamap';
import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import themeContext from '../../config/ThemeContext';

void YaMap.init('11ce9ef3-ae3c-4fbd-ac01-2df7ac5f8432');
export default function ParkingScreen() {
	const theme = useContext(themeContext);
	// Const ImageMarker = require('../images/mark.png');

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
	return (
		<>
			<YaMap
				nightMode={theme.nightMapColor}
				userLocationIcon={require('../images/mark.png')}
				initialRegion={{
					lat: 56.8380620,
					lon: 60.6601190,
					zoom: 17,
					azimuth: 80,
					tilt: 30,
				}}
				style={{flex: 1}}>
				{/* eslint-disable-next-line no-mixed-spaces-and-tabs */}
				 {markerArray.map((element, index) =>
					<Marker key={index} point={{lat: element.lat, lon: element.long}}
						source={element.image} scale={0.8} onPress={() => {
							console.log(element.lat);
						}}/>)}
			</YaMap>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},
});

