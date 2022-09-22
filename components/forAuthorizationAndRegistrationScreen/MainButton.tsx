import {Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function MainButton(props:{text:string, func: any}) {
    return (
        <>
            <TouchableOpacity style={styles.buttonStyle} onPress={props.func}>
                <Text style={[{color:'white', fontSize: 16, fontWeight:'400',}]}>{props.text}</Text>
            </TouchableOpacity>
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
