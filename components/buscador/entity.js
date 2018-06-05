import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showEntityInfo() {
        if (this.props.onDetailsShow) {
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
                        <Text style={styles.numberLikesStyle}>{this.props.item.numberLikes}</Text>
                        <Icon style={styles.voteIcon} name="thumb-up" size={22}/>
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
        color: '#606060',
        paddingRight: 60
    },
    entityLikes: {
        position: 'absolute',
        right: 5,
        top: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    numberLikesStyle: {
        fontSize: 22,
        color: '#094671',
    },
    voteIcon: {
        marginLeft: 10
    }
});
