import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, BackHandler, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import InfoComponent from "../components/forHomeScreen/InfoComponent";
import AddCarComponent from "../components/forHomeScreen/AddCarComponent";
import AddCardComponent from "../components/forHomeScreen/AddCardComponent";
import SafeAreaViewAndroid from "../components/SafeAreaViewAndroid";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({navigation}: {navigation: any}) {

    const [number, setNumber] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [card, setCard] = useState<string | null>(null)

    useEffect(() => {
        checkCar()
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
        return () => backHandler.remove();
    }, []);

    const goAddCar = () => {
        navigation.navigate('AddCar', {setNumber})
    }
    const goAddCard = () => {
        navigation.navigate('AddCard', {setCard})
    }

    const checkCar = async () => {
        try {
            const number = await AsyncStorage.getItem('number')
            const card = await AsyncStorage.getItem('card')
            setNumber(number)
            setCard(card)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
            <ScrollView style={[{ width:'100%'}]}>
                <InfoComponent />
                {
                    loading?
                        <>
                            <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                            <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                        </> :
                        <>
                            <AddCarComponent func = {goAddCar} number = {number} numberFunc = {setNumber}/>
                            <AddCardComponent func = {goAddCard} card = {card} cardFunc = {setCard}/>
                        </>
                }
            </ScrollView>
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}
