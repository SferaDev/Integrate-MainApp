import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
} from 'react-native';

export default class Vals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifnie: "",
            password: "",
            error: false,
            isFieldFocused: false
        };
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
                    </View>
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
});