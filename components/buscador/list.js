import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Entity from './entity';

export default class EntityList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loc: null,
            entities: [],
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.sortEntities.bind(this), () => {});
    }

    renderEntity({item}) {
        return (
            <Entity item={item} />
        );
    }

    calcDistance(latitude,longitude){
        return Math.sqrt( Math.pow(this.coords.latitude-latitude,2)+Math.pow(this.coords.longitude-longitude,2) );
    }

    sortByCoords(a,b){

        return (this.calcDistance(a.addressLatitude,a.addressLongitude) > this.calcDistance(b.addressLatitude,b.addressLongitude)) ? 1 : -1;
    }

    sortEntities(loc){
        this.coords = loc.coords;

        let unsortedEntities = this.props.entities;
        let sortedEntities = unsortedEntities.sort(this.sortByCoords.bind(this));
        this.setState({entities: sortedEntities});
    }

    render() {
        return (
            <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 60, backgroundColor: 'white'}]}>
                <FlatList
                    data={this.state.entities}
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