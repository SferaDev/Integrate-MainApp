import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenDisplayed: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        /*if (this.state.hasBeenDisplayed == false & this.props.visible) {

        }*/
    }

    render() {
        return (
            <View style = {[styles.toast, {display: (this.props.visible) ? 'block' : 'none'}]}>
                <Text>
                    Toaast
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    }
});