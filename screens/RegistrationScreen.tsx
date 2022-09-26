import {Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import TextInputComponent from "../components/forAuthorizationAndRegistrationScreen/TextInputComponent";
import MainButton from "../components/forAuthorizationAndRegistrationScreen/MainButton";

export default function RegistrationScreen({navigation}: {navigation: any}) {
    const [login, setLogin] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstPassword, setFirstPassword] = useState<string>('')
    const [secondPassword, setSecondPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [textError, setTextError] = useState<string>('')

    const registrationFunc = async () => {
        if (login !== '' && email !== '' && firstPassword !== '' && secondPassword !== '') {
            try {
                const url = "";
                const request = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Login: login,
                        Email: email,
                        password: firstPassword,
                        password_retype: secondPassword
                    })
                }).then(response => response.json());
                if (request.ok) {
                    navigation.goBack()
                } else {
                    request.status === 500 ? errorFunc('Ошибка сервера') : errorFunc(request.ErrorMesage)
                }
            } catch (e) {
                errorFunc('Ошибка сети')
            }
        } else {
            errorFunc('Не все поля заполнены')
        }
    };

    const errorFunc = (text: string) => {
        setError(true)
        setTextError(text)
        setFirstPassword('')
        setSecondPassword('')
    }

    const clearError = () => {
        setError(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.borderedView}>
                <TouchableOpacity style={[{marginBottom:'13%',maxWidth:'35%'}]} onPress={() => navigation.goBack()}>
                    <View style={[{flexDirection:'row', alignItems:'center'}]}>
                        <Ionicons name="chevron-back" size={22} color="#886DEC" style={[{marginLeft:'3%'}]} />
                        <Text style={styles.backStyle}>Вернуться</Text>
                    </View>
                </TouchableOpacity>
                <TextInputComponent clearError={clearError} value={login} func={setLogin} placeholder={'Логин'} secure={false}/>
                <TextInputComponent clearError={clearError} value={email} func={setEmail} placeholder={'Электронная почта'} secure={false}/>
                <TextInputComponent clearError={clearError} value={firstPassword} func={setFirstPassword} placeholder={'Пароль'} secure={true} />
                <TextInputComponent clearError={clearError} value={secondPassword} func={setSecondPassword} placeholder={'Повторите пароль'} secure={true}/>
                {error && <Text style={[{marginBottom:'4%',fontSize: 15,color: "#963939", fontWeight:'bold', alignSelf:'center'}]}>{textError}</Text>}
                <MainButton text={'Зарегистрироваться'} func={() => registrationFunc()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backStyle:{
        color:'#886DEC',
        fontSize:16,
        fontWeight:'bold',
    },
    borderedView: {
        marginTop:'-5%',
        height:'50%',
        width: '80%',
        borderRadius: 20,
        backgroundColor:'#EFF1FB',
        paddingTop:'5%',
    },
    container: {
        minHeight: Math.round(Dimensions.get('window').height)+100,
        flex: 1,
        backgroundColor: "#886DEC",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
