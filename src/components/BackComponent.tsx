import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const BackComponent = (props: {goBackFunc: () => void}) => (
	<TouchableOpacity style={[{width: '25%'}]} onPress={props.goBackFunc}>
		<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
			<Icon name='chevron-back' size={40} color='#886DEC' style={[{marginLeft: '3%'}]}/>
		</View>
	</TouchableOpacity>
);
