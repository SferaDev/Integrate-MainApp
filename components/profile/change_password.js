import React, {Component} from 'react';
import {AsyncStorage, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Toast from '../login/toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            new_password1: "",
            new_password2: "",
            isFieldFocused: false,
            error: false
        };
    }

    handleBackButton() {
        return true;
    }

    goBack() {
        this.props.navigation.goBack();
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

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    moveUp() {
        this.setState({isFieldFocused: true});
    }

    moveDown() {
        this.setState({isFieldFocused: false});
    }

    showError() {
        this.setState({error: true});
    }

    updateError() {
        this.setState({error: false});
    }

    changePassword() {
        let password = this.state.password;
        let new_password1 = this.state.new_password1;
        let new_password2 = this.state.new_password2;

        if (new_password1 != new_password2) this.showError();
        //TO DO: Canviar el text del toast fent que el text que es mostra sigui un paràmetre que se li passa

        //else {crida a la api passant password1 o password2 i el password antic}

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                </View>
                <View style={[styles.body, {marginBottom: this.state.isFieldFocused ? 260 : 0}]}>
                    <Text style={[styles.basicTitle, {paddingBottom: 25}]}>
                        {language_settings[global.lang].change_password.title}
                    </Text>
                    <Text style={styles.basicText}>
                        {language_settings[global.lang].change_password.actual_password_title}
                    </Text>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.password}
                               secureTextEntry={true}
                               placeholder={language_settings[global.lang].change_password.actual_password_placeHolder}
                               onChangeText={this.updatePassword.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <Text style={styles.basicText}>
                        {language_settings[global.lang].change_password.new_password_title}
                    </Text>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.new_password1}
                               secureTextEntry={true}
                               placeholder={language_settings[global.lang].change_password.new_password_placeHolder}
                               onChangeText={this.updateNewPassword1.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <TextInput style={[styles.basicInput]}
                               value={this.state.new_password2}
                               secureTextEntry={true}
                               placeholder={language_settings[global.lang].change_password.new_password2_placeHolder}
                               onChangeText={this.updateNewPassword2.bind(this)}
                               underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                        onPress={this.changePassword.bind(this)}
                        disabled={this.isEmpty()}>
                        <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold'}}>
                            {language_settings[global.lang].change_password.button_text}
                        </Text>
                    </TouchableHighlight>
                    <Toast
                        visible={this.state.error}
                        onClose={this.updateError.bind(this)}/>
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
        backgroundColor: '#F4F3F2',
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
        backgroundColor: '#F4F3F2',
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
        fontSize: 24,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 19,
        margin: 10,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
});
