import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function StatsComponent(props:{func:any}) {
    return (
        <TouchableOpacity style={styles.StatsView} onPress={props.func}>
            <LinearGradient style={styles.GradientStyle} colors={['#FB8383','#FFE480']}>
                <Text style={styles.textStyle}>Ваша статистика</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    GradientStyle: {
        borderRadius:20,
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle: {
        fontSize:21,
        marginBottom:'5%',
        color:'white',
        fontWeight:'bold'
    },
    StatsView: {
        marginTop:'5%',
        alignSelf:'center',
        height:200,
        width:'90%',
        shadowColor: '#000000',
        shadowOpacity:0.15,
        elevation: 10,
        shadowOffset: {width: 7, height: 7},
    },
});
