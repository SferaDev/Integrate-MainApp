import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Entity from './entity';

export default class EntityList extends Component {
    constructor(props) {
        super(props);
    }

    renderEntity({item}) {
        return (
            <Entity item={item} onDetailsShow={this.props.onDetailsShow} />
        );
    }

    render() {
        return (
            <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 60, backgroundColor: 'white'}]}>
                <FlatList
                    data={this.props.entities}
                    renderItem={this.renderEntity.bind(this)}
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
