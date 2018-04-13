import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

export default class EntityList extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderEntity({item}) {
        return (
            <View key={item.id} style={styles.entityView}>
                <Text style={styles.entityName}>{item.name}</Text>
                <Text style={styles.entityDescription}>{item.description}</Text>
                <Text style={styles.entityAddress}>{item.addressName}</Text>
                <View style={styles.entityLikes}>
                    <Text>0</Text>
                    <Text>TH</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 60, backgroundColor: 'white'}]}>
                <FlatList
                    data={this.props.entities}
                    renderItem={this.renderEntity}
                />
            </View>
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