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
        this.state = {value:""};
    }

    updateText(value){
        this.setState({text: value})
    }

    buttonPressed() {
        console.log("Ive been pressed")

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.basicText}>
                    Recuperar credencials:
                </Text>

                <TextInput style={styles.basicInput}
                           value={this.state.text}
                           placeholder="NIE/NIF"
                           onChangeText={this.updateText.bind(this)}>
                </TextInput>

                <TouchableHighlight style={styles.button}
                                    onPress={this.buttonPressed.bind(this)}
                                     >
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
        width:260,
        height:30,
        borderRadius:4,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    }
});
