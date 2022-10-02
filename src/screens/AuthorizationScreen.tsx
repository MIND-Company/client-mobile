import {StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar} from 'react-native';
import { useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../components/forAuth/useAuth";
import TextInputComponent from "../components/forAuthorizationAndRegistrationScreen/TextInputComponent";
import MainButton from "../components/forAuthorizationAndRegistrationScreen/MainButton";
import React from 'react';

export default function AuthorizationScreen({navigation}: {navigation: any}) {
    const { isAuth, setIsAuth } = useAuth();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<boolean>(false);
    const [textError, setTextError] = useState<string>('');

    const authFunction = async () => {
        if (email !== '' && password !== '') {
            try {
                let url = '';
                let request = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            Email: email,
                            Password: password
                        }
                    })
                }).then(response => response.json());
                if (request.ok) {
                    await AsyncStorage.setItem('access_token', request.Access)
                    await AsyncStorage.setItem('refresh_token', request.Refresh)
                    setIsAuth();
                    navigation.navigate("MainNavigation");

                } else {
                    request.status === 500 ? errorFunc('Ошибка сервера') : errorFunc('Ошибка в переданных данных')
                }
            } catch (e) {
                errorFunc('Ошибка сети')
            }
        } else {
            errorFunc('Не все поля заполнены')
        }
    }

    const errorFunc = (text: string) => {
        setError(true)
        setTextError(text)
        setPassword('')
    }

    const authRequest = () => {
        if (email == '1' && password == '1') {
            navigation.navigate("MainNavigation")
        }
    };

    const clearError = () => {
        setError(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.borderedView}>
                <View style={[{marginBottom:'13%',width:'80%',alignSelf:'center', marginTop:'15%'}]}>
                    <Text style={[{color:'gray', fontSize:15}]}>Ещё нет аккаунта?</Text>
                    <TouchableOpacity style={[{maxWidth:'65%'}]} onPress={()=> {navigation.navigate('Registration'), setEmail(''), setPassword(""), setError(false)}}>
                        <Text style={[{color:'#886DEC',fontSize:15, fontWeight:'bold'}]}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
                <TextInputComponent clearError={clearError} value={email} func={setEmail} placeholder={'Электронная почта'} secure={false} />
                <TextInputComponent clearError={clearError} value={password} func={setPassword} placeholder={'Пароль'} secure={true} />
                {error && <Text style={[{marginBottom:'4%',fontSize: 15,color: "#963939", fontWeight:'bold', alignSelf:'center'}]}>{textError}</Text>}
                <MainButton text={'Войти'} func={() => authRequest()} />
            </View>
            <StatusBar backgroundColor="#886DEC"
                       barStyle="dark-content" translucent={false}/>
        </View>
    );
}

const styles = StyleSheet.create({
    borderedView: {
        marginTop: '-30%',
        height:'50%',
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
