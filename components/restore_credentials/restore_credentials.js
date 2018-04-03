import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableHighlight
} from 'react-native';

export default class RestoreCredentials extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.basicText}>
                    Recuperar credencials:
                </Text>

                <TextInput style={styles.basicInput}
                           placeholder="NIE/NIF"
                           onChangeText={(text) => this.setState({text})}>
                </TextInput>

                <TouchableHighlight style={styles.button}
                                    onPress={()=>{console.log('Ive been pressed')}}>
                    <Text style={{color:'white'}}>OK</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F3F2',
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        margin: 10,
    },
    basicInput: {
        borderWidth:1,
        borderColor: '#0c59cf',
        backgroundColor:'white',
        height: 30,
        width: 260,
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    button: {
        borderWidth:1,
        borderColor: '#0c59cf',
        backgroundColor:'#094671',
        color:'white',
        width:260,
        height:30,
        borderRadius:4,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    }
});
