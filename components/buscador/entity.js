import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showEntityInfo() {
        if( this.props.onDetailsShow ){
            this.props.onDetailsShow(this.props.item);
        }
    }

    render() {
        return (
            <TouchableHighlight key={this.props.item._id} style={styles.entityView} onPress={this.showEntityInfo.bind(this)} underlayColor='transparent' >
                <View>
                    <Text style={styles.entityName}>{this.props.item.name}</Text>
                    <Text style={styles.entityDescription}>{this.props.item.description}</Text>
                    <Text style={styles.entityAddress}>{this.props.item.addressName}</Text>
                    <View style={styles.entityLikes}>
                        <Text></Text>
                        <Text></Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    entityView: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderTopWidth: 1,
        padding: 15,
        paddingRight: 60
    },
    entityName: {
        fontSize: 24,
        color: '#094671',
    },
    entityDescription: {
        fontSize: 14,
        color: '#67acb1'
    },
    entityAddress: {
        fontSize: 14,
        color: '#606060'
    },
    entityLikes: {
        position: 'absolute',
        right: 15,
        top: 15,
        display: 'flex',
        flexDirection: 'row',
    }
});
