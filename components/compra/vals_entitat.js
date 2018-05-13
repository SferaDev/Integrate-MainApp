import React, {Component} from 'react';
import {BackHandler, FlatList, StyleSheet, View} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Good from '../llista_vals/good';

export default class ValsEntitat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goods_shown: []
        }
    }

    componentDidMount() {
        this.getGoods();
    }

    getGoods(loc) {
        API.getGoods(0, 0, null).then(this.setGoods.bind(this));
    }

    setGoods(goods) {
        this.setState({goods: goods, goods_shown: goods});
    }

    toggleFavourite(id, isFav) {
        if (!isFav) {
            API.addGoodFav(id).then(this.getGoods.bind(this));
        }
        else {
            API.deleteGoodFav(id).then(this.getGoods.bind(this));
        }
    }

    renderGood({item}) {

        return (
            <Good
                id={item._id}
                item={item}
                onPress={this.toggleFavourite}
                context={this}
                isFav={false}
            />
        );
    }

    render() {
        return (
            <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 15, backgroundColor: 'white'}]}>
                <FlatList
                    data={this.state.goods_shown}
                    renderItem={this.renderGood.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        height: 60,
        backgroundColor: '#094671',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    headerLeftIco: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 20,
        textAlign: 'left',
        color: 'white'
    },
    headerRightIco: {
        flex: 1,
        alignSelf: 'center',
        paddingRight: 20,
        textAlign: 'right',
        color: 'white'
    },
    filterGoods: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%'
    }
});
