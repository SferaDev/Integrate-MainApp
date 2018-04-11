import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ImageBackground
} from 'react-native';

export default class RestoreCredentials extends Component {
    constructor(props){
        super(props);
        this.state = {nifnie:""};
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
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../Images/bg.jpg')}>

                    <Text style={styles.basicText}>
                        Recuperar credencials:
                    </Text>

                    <TextInput style={styles.basicInput}
                               value={this.state.text}
                               placeholder="NIE/NIF"
                               onChangeText={this.updateText.bind(this)}>
                    </TextInput>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={this.buttonPressed.bind(this)}>
                        <Text style={{color:'white'}}>OK</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        margin: 10,
        top: 230,
        backgroundColor:'transparent',
        textAlign:'center',
        fontWeight: 'bold',
    },
    basicInput: {
        borderWidth:1,
        borderColor: '#0c59cf',
        backgroundColor:'white',
        width: 260,
        height: 30,
        borderRadius:2,
        justifyContent: 'center',
        position: 'absolute',
        margin: 10,
        alignItems:'center',
        paddingLeft:5,
        top: 290,
    },
    buttonStyle: {
        borderWidth:1,
        borderColor: '#0c59cf',
        backgroundColor: '#094671',
        width: 260,
        height: 30,
        borderRadius:4,
        justifyContent: 'center',
        position: 'absolute',
        margin:10,
        alignItems: 'center',
        top: 340,
    },
});
