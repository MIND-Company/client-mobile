import {ScrollView, StyleSheet, Text, View,SafeAreaView } from 'react-native';
import OneHistoryComponent from "../components/OneHistoryComponent";
import SafeAreaViewAndroid from "../components/SafeAreaViewAndroid";

export default function HistoryScreen({navigation}: {navigation: any}) {

    const arrayObjects  = [
        {   name: 'Гринвич',
            price: '500Р',
            date: '10.07.2021'
        },
        {   name: 'ИРИТ-РТФ',
            price: '400Р',
            date: '10.07.2021'
        },
        {   name: 'Пассаж',
            price: '300Р',
            date: '10.07.2021'
        },
        {   name: 'ТЦ Большой',
            price: '200Р',
            date: '10.07.2021'
        },
        {   name: 'ТЦ Алатырь',
            price: '100Р',
            date: '10.07.2021'
        },
        {   name: 'Гринвич',
            price: '500Р',
            date: '10.07.2021'
        },
        {   name: 'ИРИТ-РТФ',
            price: '400Р',
            date: '10.07.2021'
        },
        {   name: 'Пассаж',
            price: '300Р',
            date: '10.07.2021'
        },
        {   name: 'ТЦ Большой',
            price: '200Р',
            date: '10.07.2021'
        },
        {   name: 'ТЦ Алатырь',
            price: '100Р',
            date: '10.07.2021'
        },
    ]

    const goParkingDetails = (element:object) => {
        navigation.navigate('ParkingDetails', {element})
    }

    return (
        <SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
            <View style={[{width:'95%',height:'7%',alignSelf:'center'}]}>
                <View style={styles.upView}>
                    <View style={[styles.upViewContainer,{alignItems: 'stretch'}]}><Text style={styles.upViewText}>Название</Text></View>
                    <View style={styles.upViewContainer}><Text style={styles.upViewText}>Стоимость</Text></View>
                    <View style={[{paddingVertical:'0.5%',width:'30%',alignItems:'center'}]}><Text style={styles.upViewText}>Дата</Text></View>
                </View>
            </View>
            <ScrollView style={[{width:'100%'}]}>
                {arrayObjects.map((element, index) =>
                    <OneHistoryComponent key = {index} name = {element.name} price = {element.price} date = {element.date} func = {() => goParkingDetails(element)}/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    upViewContainer: {
        paddingVertical:'0.5%',
        borderColor: '#886DEC',
        borderRightWidth: 2,
        width:'35%',
        alignItems:'center',
    },
    upViewText: {
        fontSize:19,
    },
    upView: {
        backgroundColor:'white',
        borderColor:'#886DEC',
        borderRadius:15,
        alignSelf:'center',
        width:'100%',
        borderStyle:'solid',
        borderWidth:3,
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-between',
        paddingHorizontal: '5%',
        marginTop:'3%'
    },
    container: {
        flex: 1,
        backgroundColor: '#EFF1FB',
        alignItems: 'center',
    },
});
