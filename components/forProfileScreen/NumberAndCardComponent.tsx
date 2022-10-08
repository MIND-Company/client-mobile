import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function NumberAndCardComponent(props:{func:any}) {
    return (
        <View style={styles.cardAndNumberView}>
            <TouchableOpacity style={[{width:'48%', height:'100%'}]} onPress={props.func}>
                <LinearGradient style={[styles.cardAndNumber]} colors={['#EAB496','#EF81F8']}>
                    <Text style={styles.textStyle}>к510ат</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[{width:'48%', height:'100%'}]} onPress={props.func}>
                <LinearGradient style={[styles.cardAndNumber]} colors={['#886DEC','#56439E']}>
                    <Text style={styles.textStyle}>VISA 8840</Text>
                </LinearGradient>
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
