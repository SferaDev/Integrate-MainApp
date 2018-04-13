import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ImageBackground
} from 'react-native';

import Toast from './toast';
import API from "../api";

export default class RestoreCredentials extends Component {
    constructor(props){
        super(props);
        this.state = {
            nifnie: "",
            error: false,
        };
    }

    updateText(value){
        this.setState({nifnie: value})
    }

    buttonPressed() {
        let nifnie = this.state.nifnie;
        console.log(nifnie);
        this.setState({error: true})
        API.Function().then( (string) => {console.warn(string)} );
    }

    updateError() {
        this.setState({error: false})
    }

    isEmpty() {
        return (this.state.nifnie.length == 0)
    }

    goToLogIn() {
        console.warn("Anem a la vista anterior");
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../Images/bg.jpg')}>
                    <View style={{display:'flex',alignItems: 'center'}} >
                        <Text style={styles.basicTitle}>
                            Recuperar credencials:
                        </Text>

                        <TextInput style={styles.basicInput}
                                   placeholder="NIE/NIF"
                                   value={this.state.nifNie}
                                   onChangeText={this.updateText.bind(this)}>
                        </TextInput>

                        <TouchableHighlight style={[styles.buttonStyle, {backgroundColor: (this.state.nifnie.length == 0) ? '#CCC' : '#094671'}]}
                                            onPress={this.buttonPressed.bind(this)}
                                            disabled = {this.state.nifnie.length == 0 ? true : false}>

                            <Text style={{alignSelf: 'center', color: (this.state.nifnie.length == 0) ? '#666' : 'white', fontWeight: 'bold' }}>
                                Sol·licitar
                            </Text>
                        </TouchableHighlight>
                        <Text style = {styles.textGoToLogIn}
                                onPress = {this.goToLogIn.bind(this)}>
                                Enrera
                        </Text>
                    </View>
                    <Toast visible = {this.state.error}
                           onClose = {this.updateError.bind(this)}/>
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
    basicTitle: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        margin: 10,
        top: 230,
        backgroundColor:'transparent',
        textAlign:'center',
        fontWeight: 'bold',
        justifyContent: 'center',
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
        width: 260,
        height: 30,
        borderRadius:4,
        justifyContent: 'center',
        position: 'absolute',
        margin:10,
        alignItems: 'center',
        top: 340,
    },
    textGoToLogIn: {
        textDecorationLine: 'underline',
        backgroundColor: 'transparent',
        top: 360,
    }
});
