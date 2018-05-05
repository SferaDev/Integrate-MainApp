import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../api";

export default class Good extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View key={this.props.item._id} style={styles.entityView}>
                <Text style={styles.goodBasicText}>Cada {this.props.item.reusePeriod} dies</Text>
                <Text style={styles.goodBasicText}>Preu inicial: {this.props.item.initialPrice} €</Text>
                <Text style={styles.goodBasicText}>-{this.props.item.discount} {this.props.item.discountType}</Text>
                <Text style={styles.entityName}>{this.props.item.owner.name}</Text>
                <Text style={styles.goodBasicText}>{this.props.item.productName}</Text>

                <Icon style={[styles.favProps, {color: (this.props.isFav) ? '#f4eb49' : '#CCC'}]}
                      name="star" size={25}
                      onPress={this.props.onPress.bind(this.props.context,this.props.item._id)}
                      id={this.props.item._id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    favProps: {
        flexDirection:'row',
        paddingTop: 10,
        alignSelf: 'flex-end',
        color: '#f4eb49',
    },
    entityView: {
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth:1,
        alignSelf: 'center',
        height: 166,
        width: 325,
    },
    entityName: {
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
        color: '#232323',
        fontWeight: 'bold'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 8,
        paddingLeft: 15,
        color: '#232323'
    },
});
