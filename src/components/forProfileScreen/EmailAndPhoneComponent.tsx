import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function EmailAndPhoneComponent() {
    return (
        <View style={styles.emailAndPhoneView}>
            <Text style={styles.textStyle}><Text style={[{color:'#000000'}]}>Номер телефона:</Text> +79223811755</Text>
            <Text style={styles.textStyle}><Text style={[{color:'#000000'}]}>Электронная почта:</Text> agadfsdfdsfdsgda.gdagad@inbox.ru</Text>
            <TouchableOpacity style={[{width:'35%',alignSelf:'center'}]}>
                <View style={styles.changeView}>
                    <Text style={[{color:'#886DEC', fontWeight:'500', fontSize:16}]}>Изменить</Text>
                    <Icon name="edit" size={22} color='#886DEC' style={[{marginLeft:'4%'}]}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontWeight:'400',
        color: '#7d746d',
        fontSize:18,
        marginLeft:'8%',
        marginRight:'2%'
    },
    changeView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
    },
    emailAndPhoneView: {
        marginTop:'3%',
        alignSelf:'center',
        justifyContent:'space-evenly',
        height:200,
        width:'90%',
        backgroundColor:'white',
        borderRadius:20,
        shadowColor: '#000000',
        shadowOpacity:0.15,
        elevation: 10,
        shadowOffset: {width: 7, height: 7},
    },
});
