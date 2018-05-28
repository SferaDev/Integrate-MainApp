import React, {Component} from 'react';
import {ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';

import Toast from './toast';
import API from "../api";
import language_settings from '../language_settings';

export default class RestoreCredentials extends Component {
    constructor(props) {
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

    updateText(value) {
        this.setState({nifnie: value})
    }

    restoreCredentials() {
        let nifnie = this.state.nifnie;
        API.restoreCredentials(nifnie).catch(this.showError.bind(this));
        this.props.navigation.navigate('LoginStack');
    }

    showError() {
        this.setState({error: true});
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
                <ImageBackground style={styles.imageBackground} source={require('../../Images/bg.jpg')}>

                    <View style={{display: 'flex', justifyContent: 'center', height: '100%', width: '100%'}}>
                        <View style={{display: 'flex', alignItems: 'center', width: '100%', height: 300}}>
                            <View style={{flex: 40, justifyContent: 'flex-end'}}>
                                <Text style={styles.basicTitle}>
                                    {language_settings[global.lang].restoreCredentials.title}
                                </Text>
                            </View>
                            <View style={{flex: 20}}>
                                <TextInput style={styles.basicInput}
                                           placeholder={language_settings[global.lang].restoreCredentials.nif_nie}
                                           value={this.state.nifNie}
                                           onChangeText={this.updateText.bind(this)}
                                           underlineColorAndroid='rgba(0,0,0,0)'>
                                </TextInput>
                            </View>
                            <View style={{flex: 20}}>
                                <TouchableHighlight
                                    style={[styles.buttonStyle, {backgroundColor: this.getButtonBackground()}]}
                                    onPress={this.restoreCredentials.bind(this)}
                                    disabled={this.isEmpty()}
                                >
                                    <Text
                                        style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                                        {language_settings[global.lang].restoreCredentials.button_text}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{flex: 40}}>
                                <Text style={styles.textGoToLogIn} onPress={this.goToLogIn.bind(this)}>
                                    {language_settings[global.lang].restoreCredentials.go_back}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Toast visible={this.state.error} onClose={this.updateError.bind(this)}/>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    basicTitle: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    basicInput: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: 260,
        height: 35,
        borderRadius: 2,
        margin: 10,
        alignItems: 'center',
        padding: 0,
        paddingLeft: 5
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        width: 260,
        height: 30,
        borderRadius: 4,
        margin: 10,
        justifyContent: 'center'
    },
    textGoToLogIn: {
        textDecorationLine: 'underline',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 16
    }
});
