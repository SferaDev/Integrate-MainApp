import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    ImageBackground,
    Keyboard
} from 'react-native';
import {AsyncStorage} from 'react-native';

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

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));

        let that = this;
        AsyncStorage.getItem('token').then( (token) => {
            if(token !== null || token !== undefined){
                that.navigateHome();
            }
        } );
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
        //console.warn('Recuperar Contrasenya')
    }

    render() {
        let ie = this.isEmpty();

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
                                   placeholder={"Introduir NIF/NIE"}
                                   onChangeText={this.updateNifNie.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
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
                            style={[styles.button, {backgroundColor: (ie) ? '#CCC' : '#094671'}]}
                            onPress={this.login.bind(this)}
                            disabled={ie}>
                            <Text style={{alignSelf: 'center', color: (ie) ? '#666' : 'white', fontWeight: 'bold'}}>
                                Entra
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <Toast
                        visible={this.state.error}
                        onClose={this.updateError.bind(this)}/>
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
        backgroundColor: 'white',
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