import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import React from 'react';

export default function NumberAndCardComponent(props:{func:any}) {
    return (
        <View style={styles.cardAndNumberView}>
            <TouchableOpacity style={[{width:'48%', height:'100%'}]} onPress={props.func}>
                <View style={[styles.cardAndNumber,{backgroundColor: '#EF81F8'}]}>
                    <Text style={styles.textStyle}>к510ат</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[{width:'48%', height:'100%'}]} onPress={props.func}>
                <View style={[styles.cardAndNumber,{backgroundColor: '#886DEC'}]}>
                    <Text style={styles.textStyle}>VISA 8840</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    cardAndNumber: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        width:'100%',
        height:'100%',
    },
    cardAndNumberView:{
        flexDirection:'row',
        marginTop:'5%',
        alignSelf:'center',
        justifyContent:'space-between',
        height:180,
        width:'90%',
    },
});
