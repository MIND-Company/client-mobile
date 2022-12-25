import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import WarningIcon from 'react-native-vector-icons/Ionicons';
import CloseIcon from 'react-native-vector-icons/FontAwesome';

export const WarningModal = (props: {showFunc: boolean; setShowFunc: (newShowFunc) => void; children}) => (
	<>
		<Modal isVisible={props.showFunc} style={styles.warningModal} onBackdropPress={() => {
			props.setShowFunc(!props.showFunc);
		}} backdropOpacity={0} onSwipeComplete={() => {
			props.setShowFunc(!props.showFunc);
		}} swipeDirection= 'left' statusBarTranslucent={true}>
			<View style={styles.warningModalView}>
				<View style={[{alignSelf: 'flex-start', marginLeft: '7%', position: 'absolute'}]}>
					<WarningIcon name='ios-warning' size={33} color='rgb(149, 114, 46)'/>
				</View>
				<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '7%', position: 'absolute'}]}
					onPress={() => {
						props.setShowFunc(!props.showFunc);
					}}>
					<CloseIcon name='close' size={28} color='rgb(155,120,54)' />
				</TouchableOpacity>
				{props.children}
			</View>
		</Modal>
	</>
);

const styles = StyleSheet.create({
	warningModal: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	warningModalView: {
		marginBottom: '-3%',
		borderRadius: 5,
		height: '10%',
		width: '110%',
		backgroundColor: 'rgb(248,243,214)',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
