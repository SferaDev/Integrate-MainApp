import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Good extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View key={this.props.item['_id']} style={styles.entityView}>
                <Text>
                    Cada {this.props.item.reusePeriod} dies
                </Text>
                <Text>
                    -{this.props.item.discount} {this.props.item.discountType}
                </Text>
                <Text>
                    {this.props.item.productName}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    entityView: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth:1,
        padding: 15,
        paddingRight: 60,
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
