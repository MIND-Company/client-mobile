import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert, Button} from 'react-native';
import { useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../components/forAuth/useAuth";
import TextInputComponent from "../components/forAuthorizationAndRegistrationScreen/TextInputComponent";
import MainButton from "../components/forAuthorizationAndRegistrationScreen/MainButton";


export default function AuthorizationScreen({navigation}: {navigation: any}) {

    const { isAuth, setIsAuth } = useAuth();
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false);
    const [text, setText] = useState('');

    async function authRequest() {
        try {
            let url = '';
            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        phone: phone,
                        password: password
                    }
                })
            });
            return await res.json()
        }catch(e){
            Alert.alert("Ошибка", e.message, [
                {text: "OK"}])    }
    }

    const authFunction = async () => {
        if (phone === "" || password === "") {
            setError(true)
            setText("Не все поля заполнены")
        } else {
            if (phone == '1' && password == '1'){
            navigation.navigate("MainNavigation");
            setError(false)}
            // let a = await authRequest();
            // if (typeof a !== "undefined") {
            //     try {
            //         await AsyncStorage.setItem("token", a.access_token).then(() => {
            //             setIsAuth(true);
            //             navigation.navigate("AllCard");
            //             setError(false)
            //         });
            //         setPassword("");
            //         setPhone("");
            //     } catch (e) {
            //         setError(true)
            //         setText("Неправильный логин или пароль")
            //         setPassword('')
            //     }
            // }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.borderedView}>
                <View style={[{marginBottom:'13%',width:'80%',alignSelf:'center', marginTop:'15%'}]}>
                    <Text style={[{color:'gray', fontSize:15}]}>Ещё нет аккаунта?</Text>
                    <TouchableOpacity style={[{maxWidth:'65%'}]} onPress={()=> {navigation.navigate('Registration'), setPhone(''), setPassword(""), setError(false)}}>
                        <Text style={[{color:'#886DEC',fontSize:15, fontWeight:'bold'}]}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
                <TextInputComponent value={phone} func={setPhone} placeholder={'Номер телефона'} secure={false} />
                <TextInputComponent value={password} func={setPassword} placeholder={'Пароль'} secure={true} />
                <MainButton text={'Войти'} func={() => authFunction()} />
                {error && <Text style={[{marginTop:'5%',fontSize: 15,color: "#660066", fontWeight:'bold', alignSelf:'center'}]}>{text}</Text>}
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    borderedView: {
        marginTop:'-5%',
        height:'45%',
        width: '80%',
        borderRadius: 20,
        backgroundColor:'#EFF1FB',
    },
    container: {
        minHeight: Math.round(Dimensions.get('window').height)+100,
        flex: 1,
        backgroundColor: "#886DEC",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
