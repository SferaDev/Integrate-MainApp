import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import language_settings from '../language_settings';

export default class GoodValidar extends Component {
    constructor(props) {
        super(props);

        this.colors = ["white", "#b22222", "pink", "#ff8c00", "#9400d3", "black", "green", "#4169e1", "#ffd700", "grey"];
    }

    render() {
        return (
            <View key={this.props.item._id} style={styles.goodView}>
                <View style={[styles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}></View>
                <View style={styles.viewInfo}>
                    <Text style={styles.goodNameText}>{this.props.item.productName}</Text>
                    <Text style={[styles.goodBasicText, {textAlign: 'right'}]}>
                        {this.props.item.initialPrice + '€ (-' + this.props.item.discount + '' + this.props.item.discountType + ')'}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    goodView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'center',
        marginBottom: 5,
        width: '97.5%'
    },
    viewBarra: {
        width: 25,
    },
    viewInfo: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1
    },
    goodNameText: {
        fontSize: 15,
        paddingTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1
    },
});
