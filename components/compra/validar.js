import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Validar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
    }

    updateCode(value) {
        this.setState({code: value});
    }

    isEmpty() {
        return (this.state.code.length == 0)
    }

    getButtonBackground() {
        return (this.isEmpty() ? '#CCC' : '#094671');
    }

    getButtonColor() {
        return (this.isEmpty() ? '#666' : 'white');
    }

    isVisible() {
        return (true || this.props.visible) ? 'flex' : 'none';
    }

    render() {
        return (
            <View style={[styles.validarView, {display: this.isVisible()}]}>
                <View style={styles.toastcontent}>
                    <Icon   name="close"
                            size={25}
                            style={styles.closeIcon}
                            onPress={this.props.onClose}/>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>
                            Introduir codi de validació:
                        </Text>
                        <TextInput style={styles.basicInput}
                                   value={this.state.code}
                                   placeholder={"Introduir codi"}
                                   onChangeText={this.updateCode.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                        >
                        </TextInput>
                    </View>
                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                        onPress={()=>{}}
                        disabled={this.isEmpty()}>
                        <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold', fontSize: 17}}>
                            Validar
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    validarView: {
        position: 'absolute',
        flex:1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.30)',
        padding: 20,
        justifyContent: 'center',
    },
    toastcontent: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        paddingTop: 25,
        marginBottom: 100
    },
    text: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        width: 120,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center'
    },
    basicInput: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: 220,
        height: 35,
        borderRadius: 1,
        justifyContent: 'center',
        margin: 10,
        marginLeft: 0,
        padding: 0,
        paddingLeft: 5,
    },
    inputView: {
        alignSelf: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5
    }
});
