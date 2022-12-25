import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import SuccessIcon from 'react-native-vector-icons/Ionicons';
import CloseIcon from 'react-native-vector-icons/FontAwesome';

export const SuccessModal = (props: {showFunc: boolean; setShowFunc: (newShowFunc) => void; children}) => (
	<>
		<Modal isVisible={props.showFunc} style={styles.successModal} onBackdropPress={() => {
			props.setShowFunc(!props.showFunc);
		}} backdropOpacity={0} onSwipeComplete={() => {
			props.setShowFunc(!props.showFunc);
		}} swipeDirection= 'left' statusBarTranslucent={true}>
			<View style={styles.successModalView}>
				<View style={[{alignSelf: 'flex-start', marginLeft: '7%', position: 'absolute'}]}>
					<SuccessIcon name='md-checkmark-circle-sharp' size={33} color='rgb(88,113,84)'/>
				</View>
				<TouchableOpacity style={[{alignSelf: 'flex-end', marginRight: '7%', position: 'absolute'}]}
					onPress={() => {
						props.setShowFunc(!props.showFunc);
					}}>
					<CloseIcon name='close' size={28} color='rgb(88,113,84)' />
				</TouchableOpacity>
				{props.children}
			</View>
		</Modal>
	</>
);

const styles = StyleSheet.create({
	successModal: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	successModalView: {
		marginBottom: '-3%',
		borderRadius: 5,
		height: '10%',
		width: '110%',
		backgroundColor: 'rgb(222,242,214)',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
