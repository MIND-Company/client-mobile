import type {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function ModalForRegistration(props: {modal: boolean; setFunc: any; back?: any}) {
	return (
		<Modal
			statusBarTranslucent={true}
			animationType='none'
			transparent={true}
			visible={props.modal}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalHeadingText}>Успешно!</Text>
					<Text style={styles.modalText}>Вы успешно зарегистрировались!</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							props.setFunc(!props.modal);
							// props.back;
						}}
					>
						<Text style={[{color: 'white', fontSize: 15, fontWeight: '500'}]}>Окей</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		height: '30%',
		width: '75%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		borderStyle: 'solid',
		borderColor: '#886DEC',
		borderWidth: 3,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		marginTop: '13%',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		paddingHorizontal: 30,
		backgroundColor: '#886DEC',
	},
	modalHeadingText: {
		marginTop: '6%',
		fontWeight: 'bold',
		fontSize: 22,
		color: '#886DEC',
		textAlign: 'center',
	},
	modalText: {
		marginTop: '11%',
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 20,
		textAlign: 'center',
	},
});
