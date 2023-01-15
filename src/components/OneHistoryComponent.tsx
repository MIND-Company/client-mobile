import type {FC} from 'react';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import themeContext from '../../config/ThemeContext';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import YaMap from 'react-native-yamap';

type OneHistoryComponentProps = {
	date: string;
	price: string;
	time: string;
	keys: number;
	name: string;
	car: string;
	func: () => void;
};

const OneHistoryComponent: FC<OneHistoryComponentProps> = ({price, date, time, keys, name, car, func}) => {
	const theme = useContext(themeContext);

	return (
		<>
			<View style={{marginLeft: '4%', marginTop: (keys === 0) ? '3.5%' : 0, marginBottom: '3.5%'}}>
				<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.9), color: '#777778'}}>{date}</Text>
			</View>
			<TouchableOpacity onPress={func} style={[{alignSelf: 'center', marginBottom: '3.5%', width: '95%'}]}>
				<View style={[styles.parentsView, {backgroundColor: theme.backgroundComponent}]}>
					<View style={{marginLeft: '3%', width: '82%', height: '100%'}}>
						<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: responsiveFontSize(2.8), color: theme.textColor}}>Парковка на {time}</Text>
						<Text style={{fontFamily: 'Montserrat-Regular', fontSize: responsiveFontSize(2.1), color: theme.textColor}}>{car}, {name}, {price}₽</Text>
					</View>
					<View style={styles.imageView}>
						<Image source={require('../images/parking.png')} style={{width: responsiveWidth(11), height: responsiveHeight(6.1)}} />
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

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
	imageView: {
		width: '13%',
		height: '100%',
		borderTopRightRadius: 19,
		borderBottomRightRadius: 19,
		justifyContent: 'center',
		alignItems: 'center',
	},
	parentsView: {
		alignItems: 'center',
		height: responsiveHeight(8.9),
		paddingVertical: '1%',
		borderRadius: 19,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
});

export default OneHistoryComponent;
