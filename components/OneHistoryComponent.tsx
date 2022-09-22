import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function OneHistoryComponent(props:{name: string, price: string, date: string, func:any}) {
    return (
        <TouchableOpacity onPress={props.func} style={[{alignSelf:'center',marginBottom:'3%', marginTop:'2%', width:'95%',}]}>
        <View style={styles.parentsView}>
            <View style={[{width:'36%'}]}><Text style={styles.parentsViewText}>{props.name}</Text></View>
            <View style={[{width:'33%', alignItems:'center'}]}><Text style={styles.parentsViewText}>{props.price}</Text></View>
            <View style={[{alignItems:'center',width:'31%'}]}><Text style={styles.parentsViewText}>{props.date}</Text></View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    parentsViewText:{
        fontSize:20,
    },
    parentsView: {
        alignItems:'center',
        paddingHorizontal: '3%',
        paddingVertical:'4%',
        borderRadius:15,
        width:'100%',
        flexDirection:'row',
        flexWrap:'nowrap',
        backgroundColor:'white',
    },
})
