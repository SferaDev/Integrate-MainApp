import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    Text
} from 'react-native';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            new_password1: "",
            new_password2: "",
        };
    }

    handleBackButton() {
        return true;
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    updatePassword(value) {
        this.setState({password: value});
    }

    updateNewPassword1(value) {
        this.setState({new_password1: value});
    }

    updateNewPassword2(value) {
        this.setState({new_password2: value});
    }

    isEmpty() {
        return (this.state.password.length == 0 || this.state.new_password1.length == 0 || this.state.new_password2.length == 0)
    }

    getButtonColor() {
        return (this.isEmpty() ? '#666' : 'white');
    }

    getButtonBackground() {
        return (this.isEmpty() ? '#CCC' : '#094671');
    }

    changePassword() {
        let password = this.state.password;
        let new_password1 = this.state.new_password1;
        let new_password2 = this.state.new_password2;

        //TO DO: Comprovar que new_password1 == new_password2. Si són iguals => crida a api, altrament mostrar missatge
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>
                <View style={styles.body}>
                    <Text style={styles.basicTitle}>
                        Canvi de contrasenya
                    </Text>
                    <Text style={styles.basicText}>
                        Contrasenya actual:
                    </Text>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.password}
                               secureTextEntry={true}
                               placeholder={"Introduïr contrasenya actual"}
                               onChangeText={this.updatePassword.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <Text style={styles.basicText}>
                        Nova contrasenya:
                    </Text>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.new_password1}
                               secureTextEntry={true}
                               placeholder={"Introduïr nova contrasenya"}
                               onChangeText={this.updateNewPassword1.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.new_password2}
                               secureTextEntry={true}
                               placeholder={"Confirmar la nova contrasenya"}
                               onChangeText={this.updateNewPassword2.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                        onPress={this.changePassword.bind(this)}
                        disabled = {this.isEmpty()}>
                        <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                            Guardar contrasenya
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        height: 60,
        backgroundColor: '#094671',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    headerLeftIco: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 20,
        textAlign: 'left',
        color: 'white'
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%'
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
    basicTitle: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        margin: 10,
        textAlign:'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 15,
        margin: 10,
        textAlign:'center',
        backgroundColor: 'transparent'
    },
});
