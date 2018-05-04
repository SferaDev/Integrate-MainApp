import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../api";

export default class Good extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favourite: false,
            id: this.props.item['_id'],
        };
    }

    showError() {
        console.warn("ERRORACO")
    }

    addFavourites() {
        if (this.state.favourite == false) {
            this.setState({favourite: true});
            API.addGoodFav(this.props.item['_id']).catch(this.showError.bind(this));
            ;
        }
        else this.setState({favourite: false});
        console.warn("me/goods/favourites/" + this.props.item['_id'])
    }

    render() {
        return (
            <View key={this.props.item['_id']} style={styles.entityView}>
                <Text style={styles.goodBasic}>Cada {this.props.item.reusePeriod} dies</Text>
                <Text style={styles.goodBasic}>Preu inicial: {this.props.item.initialPrice} €</Text>
                <Text style={styles.goodBasic}>-{this.props.item.discount} {this.props.item.discountType}</Text>
                <Text style={styles.entityName}>{this.props.item.productName}</Text>
                <Text style={styles.goodSubText}>{this.props.item.category}</Text>

                <Icon style={styles.favProps}
                      name="star" size={25}
                      onPress={this.addFavourites.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    favProps: {
        flexDirection:'row',
        paddingTop: 10,
    },
    entityView: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth:1,
        padding: 15,
        paddingRight: 60,
    },
    entityName: {
        paddingTop: 5,
        fontSize: 20,
        color: '#094671',
    },
    goodBasic: {
        fontSize: 10,
        paddingTop: 5,
        color: '#67acb1'
    },
    goodSubText: {
        paddingTop: 5,
        fontSize: 9,
        color: '#606060'
    },
    entityLikes: {
        paddingTop: 3,
        position: 'absolute',
        right: 15,
        top: 15,
        display: 'flex',
        flexDirection: 'row',
    }
});
