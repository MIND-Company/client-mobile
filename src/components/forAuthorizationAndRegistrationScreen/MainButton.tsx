import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

export default function MainButton(props:{text:string, func: any}) {
    return (
        <>
            <TouchableWithoutFeedback style={styles.buttonStyle} onPress={props.func}>
                <Text style={[{color:'white', fontSize: 16, fontWeight:'400',}]}>{props.text}</Text>
            </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderStyle: 'solid',
        borderRadius: 11,
        backgroundColor: '#886DEC',
        alignSelf:'center',
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
})
