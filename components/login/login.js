import React, {Component} from 'react';
import {
    AsyncStorage,
    Image,
    ImageBackground,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

import Toast from './toast';
import API from '../api';
import language_settings from '../language_settings';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifnie: "",
            password: "",
            error: false,
            isFieldFocused: false,
            lang: ''
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
        AsyncStorage.getItem('token').then(this.autologin.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    async login() {
        let nifnie = this.state.nifnie;
        let password = this.state.password;
        let that = this;
        
        let token = await API.login(nifnie, password); //.then(this.navigateHome.bind(this)).catch(this.showError.bind(this));
        if( token === null ){
            this.navigateHome();
        }else{
            this.showError();
        }
    }

    async autologin(token) {
        if (token !== null) {
            let user = JSON.parse(await AsyncStorage.getItem('user')) || {interfaceLanguage: 'en'};
            global.lang = user.interfaceLanguage;
            this.navigateHome();
        }
    }

    updateNifNie(value) {
        this.setState({nifnie: value});
    }

    updatePassword(value) {
        this.setState({password: value});
    }

    showError() {
        this.setState({error: true});
    }

    updateError() {
        this.setState({error: false});
    }

    isEmpty() {
        return (this.state.nifnie.length == 0 || this.state.password.length == 0)
    }

    moveUp() {
        this.setState({isFieldFocused: true});
    }

    moveDown() {
        this.setState({isFieldFocused: false});
    }

    navigateHome() {
        this.props.navigation.navigate('DrawerNavigation');
    }

    restorePassword() {
        this.props.navigation.navigate('RestoreCredentials');
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
                    style={styles.imageBackground}
                    source={require('../../Images/bg.jpg')}>
                    <View style={{alignItems: 'center', display: this.state.isFieldFocused ? 'none' : 'flex'}}>
                        <Image style={styles.ic_launcher}
                               source={require('../../Images/ic_launcher.png')}>
                        </Image>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center'}}>
                        <Image style={[styles.integrateHeader, {
                            marginBottom: this.state.isFieldFocused ? 50 : 20,
                            marginTop: this.state.isFieldFocused ? 20 : 10
                        }]}
                               source={require('../../Images/integrateHeader1.png')}>
                        </Image>
                        <TextInput style={[styles.basicInput]}
                                   value={this.state.nifnie}
                                   placeholder={language_settings[global.lang].login.nifNie}
                                   onChangeText={this.updateNifNie.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                        >
                        </TextInput>
                        <TextInput style={[styles.basicInput]}
                                   value={this.state.password}
                                   secureTextEntry={true}
                                   placeholder={language_settings[global.lang].login.password}
                                   onChangeText={this.updatePassword.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                        >
                        </TextInput>
                        <Text style={styles.recuperarContrasenyaText}
                              onPress={this.restorePassword.bind(this)}>
                            {language_settings[global.lang].login.restore_password}
                        </Text>
                        <TouchableHighlight
                            style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                            onPress={this.login.bind(this)}
                            underlayColor='none'
                            disabled={this.isEmpty()}>
                            <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                                {language_settings[global.lang].login.button_text}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <Toast
                        visible={this.state.error}
                        onClose={this.updateError.bind(this)}>
                        <Text style={{textAlign: 'center'}}> {language_settings[global.lang].login.error} </Text>
                    </Toast>
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
        paddingTop: 63
    },
    basicInput: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: 260,
        height: 35,
        borderRadius: 2,
        justifyContent: 'center',
        margin: 10,
        padding: 0,
        paddingLeft: 5,
    },
    button: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        width: 260,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        margin: 10,
    },
    ic_launcher: {
        width: 200,
        height: 200,
    },
    integrateHeader: {
        width: 293,
        height: 58,
    },
    recuperarContrasenyaText: {
        textDecorationLine: 'underline',
        backgroundColor: 'transparent'
    }
});
