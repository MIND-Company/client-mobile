import {StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function StatsComponent(props: {func: any}) {
	return (
		<View style={styles.StatsView}>
			<TouchableWithoutFeedback style={[{height: '100%'}]} onPress={props.func}>
				<LinearGradient style={styles.GradientStyle} colors={['#9d50bb', '#6e48aa']}>
					<Text style={styles.textStyle}>Ваша статистика</Text>
				</LinearGradient>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	GradientStyle: {
		backgroundColor: '#FB8383',
		borderRadius: 20,
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		elevation: 10,
		shadowOffset: {width: 7, height: 7},
	},
	textStyle: {
		fontSize: 21,
		marginBottom: '5%',
		color: 'white',
		fontWeight: 'bold',
	},
	StatsView: {
		marginTop: '5%',
		alignSelf: 'center',
		height: 200,
		width: '90%',
	},
});
