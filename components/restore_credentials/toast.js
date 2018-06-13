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
                    <Text style={styles.text}>
                        El Nie / Nif introduït no existeix
                    </Text>
                    <TouchableHighlight style={styles.closeButton}
                                        underlayColor='#094671AA'
                                        onPress={this.props.onClose}>
                        <Text style={[styles.text, {color: '#094671', fontWeight: 'bold'}]}>
                            Tancar
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
    closeButton: {
        borderWidth: 3,
        borderColor: '#094671',
        width: 100,
        height: 40,
        borderRadius: 4,
        alignSelf: 'center',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#67ACB1'
    }
});
