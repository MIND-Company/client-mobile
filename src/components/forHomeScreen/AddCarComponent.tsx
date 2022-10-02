import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AddCarComponent(props:{func:any, number: any, numberFunc: any}) {
    return (
        <View style={styles.View}>
            {props.number !== null?
                <View  style={[{alignItems:'center', justifyContent:'center'}]}>
                     <Text style={[{fontSize: 25, fontWeight: 'bold', color: '#886DEC'}]}>{props.number}</Text>
                </View>
                :
                <>
                    <Image source={require('../../images/car.png')} style={[{marginBottom:'3%',resizeMode:'contain',height:'70%', width: '60%'}]}/>
                    <TouchableOpacity onPress={props.func}>
                        <Text style={styles.TextStyle}>Добавьте транспорт</Text>
                    </TouchableOpacity>
                </>}
        </View>
    );
}

const styles = StyleSheet.create({
    TextStyle: {
        fontWeight:'500',
        color:'#886DEC',
        marginBottom:'5%',
        fontSize:17,
    },
    View: {
        alignSelf:'center',
        marginTop:'3%',
        width: '95%',
        borderRadius: 20,
        marginBottom:'3%',
        height:220,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
        shadowOpacity:0.15,
        elevation: 10,
        shadowOffset: {width: 7, height: 7},
    },
});
