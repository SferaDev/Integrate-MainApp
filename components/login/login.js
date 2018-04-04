import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight, Image, ImageBackground
} from 'react-native';

type Props = {};
export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifnie: "",
            password: ""
        };
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
                               placeholder = {"Introduir nom NIF/NIE"}>
                    </TextInput>
                    <TextInput style = {[styles.basicInput,{top: 428}]}
                               value = {this.state.password}
                               placeholder = {"Introduir contrasenya"}>
                    </TextInput>
                    <TouchableHighlight style = {styles.button}>
                        <Text style = {{alignSelf: 'center', color: 'white'}}>
                            Entra
                        </Text>
                    </TouchableHighlight>
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
        backgroundColor: '#F5FCFF',
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
        backgroundColor:'#094671',
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