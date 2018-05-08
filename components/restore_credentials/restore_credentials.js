import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ImageBackground, Keyboard, AsyncStorage
} from 'react-native';

import Toast from './toast';
import API from "../api";

export default class RestoreCredentials extends Component {
    constructor(props){
        super(props);
        this.state = {
            nifnie: "",
            error: false,
            isFieldFocused: false
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
    }

    moveUp() {
        this.setState({isFieldFocused: true});
    }

    moveDown() {
        this.setState({isFieldFocused: false});
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    updateText(value){
        this.setState({nifnie: value})
    }

    restoreCredentials() {
        let nifnie = this.state.nifnie;
        //this.setState({error: true})
        //API.Function().then( (string) => {console.warn(string)} );
    }

    updateError() {
        this.setState({error: false})
    }

    goToLogIn() {
        this.props.navigation.navigate('LoginStack');
    }

    isEmpty() {
        return (this.state.nifnie.length == 0);
    }

    getButtonBackground() {
        return (this.isEmpty() ? '#CCC' : '#094671');
    }

    getButtonColor() {
        return (this.isEmpty() ? '#666' : 'white');
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={[styles.imageBackground, {
                        marginBottom: this.state.isFieldFocused ? 145 : 100,
                        marginTop: this.state.isFieldFocused ? 20 : 100
                    }]}
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

                        <TouchableHighlight style={[styles.buttonStyle, {backgroundColor: this.getButtonBackground()}]}
                                            onPress={this.restoreCredentials.bind(this)}
                                            disabled = {this.isEmpty()}>

                            <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold' }}>
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
