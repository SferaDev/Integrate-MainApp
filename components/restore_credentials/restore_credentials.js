import React, {Component} from 'react';
import {ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Animated} from 'react-native';

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

    componentWillMount(){
        this.integrateTopPadding = new Animated.Value(258);
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    moveUp() {
        Animated.timing(this.integrateTopPadding,{
            toValue: 140,
            duration: 300
        }).start();
    }

    moveDown() {
        Animated.timing(this.integrateTopPadding,{
            toValue: 258,
            duration: 300
        }).start();
    }

    updateText(value) {
        this.setState({nifnie: value})
    }

    restoreCredentials() {
        Keyboard.dismiss();
        let nifnie = this.state.nifnie;
        API.restoreCredentials(nifnie).then(this.goToLogIn.bind(this)).catch(this.showError.bind(this));
    }

    showError() {
        this.setState({error: true});
    }

    updateError() {
        this.setState({error: false})
    }

    goToLogIn() {
        this.props.navigation.goBack();
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

        const integrateTopPaddingStyle = { paddingTop: this.integrateTopPadding };
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.imageBackground} source={require('../../Images/bg.jpg')}>

                    <Animated.View style={[styles.body,integrateTopPaddingStyle]}>
                        <Text style={styles.basicTitle}>
                            {language_settings[global.lang].restoreCredentials.title}
                        </Text>
                        <TextInput style={styles.basicInput}
                                   placeholder={language_settings[global.lang].restoreCredentials.nif_nie}
                                   value={this.state.nifNie}
                                   onChangeText={this.updateText.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'>
                        </TextInput>
                        <TouchableHighlight
                            style={[styles.buttonStyle, {backgroundColor: this.getButtonBackground()}]}
                            onPress={this.restoreCredentials.bind(this)}
                            underlayColor='#094671AA'
                            disabled={this.isEmpty()}
                        >
                            <Text
                                style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                                {language_settings[global.lang].restoreCredentials.button_text}
                            </Text>
                        </TouchableHighlight>
                        <Text style={styles.textGoToLogIn} onPress={this.goToLogIn.bind(this)}>
                            {language_settings[global.lang].restoreCredentials.go_back}
                        </Text>
                    </Animated.View>

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
        alignItems: 'center',
        paddingTop: 63
    },
    body: {
        display: 'flex', 
        alignItems: 'center', 
        width: '100%', 
        flex: 1
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
        justifyContent: 'center',
    },
    textGoToLogIn: {
        textDecorationLine: 'underline',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 16
    }
});
