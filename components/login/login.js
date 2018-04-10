import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    ImageBackground,
} from 'react-native';

import Toast from './toast';

type Props = {};
export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifnie: "",
            password: "",
            error: true,
        };
    }

    login() {
        let nifnie = this.state.nifnie;
        let password = this.state.password;
            console.warn(nifnie);
            console.warn(password);
        this.setState({error: true})
    }

    updateNifNie(value) {
        this.setState({nifnie: value});
    }

    updatePassword(value) {
        this.setState({password: value});
    }

    updateError() {
        this.setState({error: false})
    }

    isEmpty() {
        return (this.state.nifnie.length == 0 || this.state.password.length == 0)
    }


    render() {
        
        return (
            <View style = {styles.container}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../Images/bg.jpg')}>
                    <Image style = {styles.ic_launcher}
                        source={require('../../Images/ic_launcher.png')}>
                    </Image>
                    <Image style = {styles.integrateHeader}
                        source={require('../../Images/integrateHeader1.png')}>
                    </Image>
                    <TextInput style = {[styles.basicInput,{top: 386}]}
                               value = {this.state.nifnie}
                               placeholder = {"Introduir nom NIF/NIE"}
                               onChangeText = {this.updateNifNie.bind(this)}>
                    </TextInput>
                    <TextInput style = {[styles.basicInput,{top: 428}]}
                               value = {this.state.password}
                               placeholder = {"Introduir contrasenya"}
                               onChangeText = {this.updatePassword.bind(this)}>
                    </TextInput>
                    <TouchableHighlight
                        style = {[styles.button, {backgroundColor: (this.isEmpty.bind(this)) ? '#CCC' : '#094671'}]}
                        onPress = {this.login.bind(this)}
                        disabled = {this.isEmpty.bind(this) ? true : false}>
                        <Text style = {{alignSelf: 'center', color: (this.isEmpty.bind(this)) ? '#666' : 'white', fontWeight: 'bold' }}>
                            Entra
                        </Text>
                    </TouchableHighlight>
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
    basicInput: {
        borderWidth:1,
        borderColor: '#0c59cf',
        backgroundColor:'white',
        width: 260,
        height: 30,
        position: 'absolute',
        borderRadius:2,
        justifyContent: 'center',
        margin: 10,
        paddingLeft:5,
    },
    button: {
        borderWidth:1,
        borderColor: '#0c59cf',
        width:260,
        height:30,
        position: 'absolute',
        top: 477,
        borderRadius:4,
        justifyContent: 'center',
        margin:10,
    },
    ic_launcher: {
        width:200,
        height:200,
        position: 'absolute',
        top: 63,
    },
    integrateHeader: {
        width:293,
        height:58,
        position: 'absolute',
        top: 276,
    }
});