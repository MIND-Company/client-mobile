import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

export default function TextInputComponent(props:{value:string,func:any, secure:boolean, placeholder:string}) {
    return (
        <View style={styles.inputView}>
            <TextInput style={styles.inputStyles}
                       value={props.value}
                       onChangeText={props.func}
                       placeholder={props.placeholder}
                       placeholderTextColor="#9A9A9A"
                       secureTextEntry={props.secure}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        alignItems:'center',
        height: '20%',
    },
    inputStyles: {
        height: Math.round(Dimensions.get('window').height)/16,
        borderStyle: 'solid',
        borderColor: '#886DEC',
        borderRadius: 14,
        paddingLeft:'5%',
        borderWidth: 2,
        width: '80%',
        color: '#151719',
        fontSize:16
    },
})
