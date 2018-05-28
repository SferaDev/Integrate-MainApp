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
    View,
    Animated,
    SafeAreaView
} from 'react-native';

import Toast from './toast';
import API from '../api';

export default class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nifnie: "",
            password: "",
            error: false,
            isFieldFocused: false
        };
    }

    componentWillMount(){
        this.integrateLogoSize = new Animated.Value(200);
        this.integrateHeaderSize = new Animated.ValueXY({y: 58, x: 293});   
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

    login() {
        let nifnie = this.state.nifnie;
        let password = this.state.password;
        let that = this;
        API.login(nifnie, password).then(this.navigateHome.bind(this)).catch(this.showError.bind(this));
    }

    autologin(token) {
        if (token !== null) {
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
        Animated.timing(this.integrateLogoSize,{
            toValue: 100,
            duration: 300
        }).start();

        Animated.timing(this.integrateHeaderSize,{
            toValue: {y: 40, x: 202},
            duration: 300
        }).start();
    }

    moveDown() {
        Animated.timing(this.integrateLogoSize,{
            toValue: 200,
            duration: 300
        }).start();

        Animated.timing(this.integrateHeaderSize,{
            toValue: {y: 58, x: 293},
            duration: 300
        }).start();
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
        const integrateLogoStyle = { width: this.integrateLogoSize, height: this.integrateLogoSize };
        const integrateHeaderStyle = { width: this.integrateHeaderSize.x, height: this.integrateHeaderSize.y };

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../Images/bg.jpg')}
                >
                    <View style={{alignItems: 'center',width: '100%'}}>
                        <Animated.View style={integrateLogoStyle} >
                            <Image style={{width: '100%', height: '100%'}}
                                   source={require('../../Images/ic_launcher.png')}>
                            </Image>
                        </Animated.View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center',width: '100%'}}>
                        <Animated.View style={integrateHeaderStyle} >
                            <Image style={{width: '100%', height: '100%'}}
                                   source={require('../../Images/integrateHeader1.png')}>
                            </Image>
                        </Animated.View>
                        <TextInput style={[styles.basicInput]}
                                   value={this.state.nifnie}
                                   placeholder={"Introduir NIF/NIE"}
                                   onChangeText={this.updateNifNie.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   autoCorrect={false}
                                   keyboardType="numeric"
                        >
                        </TextInput>
                        <TextInput style={[styles.basicInput]}
                                   value={this.state.password}
                                   secureTextEntry={true}
                                   placeholder={"Introduir contrasenya"}
                                   onChangeText={this.updatePassword.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                        >
                        </TextInput>
                        <Text style={styles.recuperarContrasenyaText}
                              onPress={this.restorePassword.bind(this)}>
                            He oblidat la contrasenya?
                        </Text>
                        <TouchableHighlight
                            style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                            onPress={this.login.bind(this)}
                            underlayColor='#094671AA'
                            disabled={this.isEmpty()}>
                            <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                                Entra
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <Toast
                        visible={this.state.error}
                        onClose={this.updateError.bind(this)}>
                        <Text style={{textAlign: 'center'}}>El Nie / Nif o la contrasenya són incorrectes</Text>
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
    recuperarContrasenyaText: {
        textDecorationLine: 'underline',
        backgroundColor: 'transparent'
    }
});
