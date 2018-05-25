import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isVisible() {
        if (this.props.visible) {
            return 'flex';
        } else {
            return 'none';
        }
    }

    render() {
        return (
            <View style={[styles.toastback, {display: this.isVisible()}]}>
                <View style={styles.toastcontent}>
                    <View>
                        {this.props.children}
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='none'
                        onPress={this.props.onClose}>
                        <Text style={styles.textButton}>
                            CLOSE
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toastback: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.40)',
        padding: 20,
        justifyContent: 'center'
    },
    toastcontent: {
        backgroundColor: 'white',
        padding: 10
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textButton: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    closeButton: {
        borderWidth: 3,
        //borderColor: '#67ACB1',
        borderColor: '#094671',
        width: 100,
        height: 40,
        borderRadius: 4,
        alignSelf: 'center',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //backgroundColor: '#094671'
        backgroundColor: '#67ACB1'

    },
    button: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        width: 120,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#094671',
    },
});