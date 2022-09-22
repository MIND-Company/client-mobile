import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AddCardComponent(props:{func:any, card: any, cardFunc: any}) {
    return (
        <View style={styles.View}>
            {props.card !== null?
                <View  style={[{alignItems:'center', justifyContent:'center'}]}>
                    <Text style={[{fontSize: 25, fontWeight: 'bold', color: '#886DEC'}]}>{props.card}</Text>
                </View>
                :
                <>
            <Image source={require('../../images/card.png')} style={[{alignSelf:'flex-start',resizeMode:'contain',height:'80%', width: '80%'}]}/>
            <TouchableOpacity  onPress={props.func}>
                <Text style={styles.TextStyle}>Добавьте способ оплаты</Text>
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
        justifyContent:'center',
        shadowOpacity:0.15,
        elevation: 10,
        shadowOffset: {width: 7, height: 7},
    },
});
