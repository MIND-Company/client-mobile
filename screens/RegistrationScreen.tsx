import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import TextInputComponent from "../components/forAuthorizationAndRegistrationScreen/TextInputComponent";
import MainButton from "../components/forAuthorizationAndRegistrationScreen/MainButton";

export default function RegistrationScreen({navigation}: {navigation: any}) {
    const [phone, setPhone] = useState<string>('')
    const [firstPassword, setFirstPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')

    const RegistrationFunc = () => {
    }

    return (
        <View style={styles.container}>
            <View style={styles.borderedView}>
                <TouchableOpacity style={[{marginBottom:'7%',maxWidth:'35%'}]} onPress={()=>navigation.goBack()}>
                    <View style={[{flexDirection:'row', alignItems:'center'}]}>
                        <Ionicons name="chevron-back" size={22} color="#886DEC" style={[{marginLeft:'3%'}]} />
                    <Text style={styles.backStyle}>Вернуться</Text>
                    </View>
                </TouchableOpacity>
                <TextInputComponent value={phone} func={setPhone} placeholder={'Номер телефона'} secure={false}/>
                <TextInputComponent value={firstPassword} func={setFirstPassword} placeholder={'Пароль'} secure={true} />
                <TextInputComponent value={secondPassword} func={setSecondPassword} placeholder={'Повторите пароль'} secure={true}/>
                <MainButton text={'Зарегистрироваться'} func={()=> RegistrationFunc()} />
            </View>
            <StatusBar style="auto"/>
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
        height:'45%',
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
