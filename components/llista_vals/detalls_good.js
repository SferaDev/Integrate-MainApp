import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Linking, ScrollView, Image} from 'react-native';
import NavigationActions from 'react-navigation';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DetallsGood extends Component{

    constructor(props) {
        super(props);
        this.state = {
            entity: {
                _id: 0,
                name: '',
                description: '',
                addressName: '',
                email: '',
                phone: '',
                coordinates: [0, 0],
                goods: []
            }
        }
    }

    async toggleFavourite(id, isFav) {

        if (!isFav) await API.addGoodFav(id);
        else  await API.deleteGoodFav(id);
    }

    isFav(id) {
        let goods = this.state.goods || [];

        for(let i = 0; i < goods.length; i++ ){
            let good = goods[i];
            if (good._id === id) return true;
        }
        return false;
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Icon   style={[styles.headerRightIco, {color: (this.isFav(this.props.navigation.state.params.selectedGood._id)) ? '#f4eb49' : '#CCC'}]}
                            name="star" size={30}
                            id={this.props.navigation.state.params.selectedGood._id}
                    />
                </View>
                <View style={styles.scrollView}>
                    <View>
                        <Image
                            style={{width: '100%',height: 400}}
                            source={{uri: this.props.navigation.state.params.selectedGood.picture}}
                        />
                    </View>
                    <View style={{backgroundColor: 'white',flex: 1}} >
                        <View key="beta" style={styles.contactArea} >
                            <Text style={styles.entityName}>{this.props.navigation.state.params.selectedGood.owner.name}</Text>
                            <Icon style={styles.entityIco} name="eye" size={35}/>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.goodBasicText}>Cada {this.props.navigation.state.params.selectedGood.reusePeriod} dies</Text>
                            <Text
                                style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.props.navigation.state.params.selectedGood.initialPrice + '€ (-' + this.props.navigation.state.params.selectedGood.discount + '' + this.props.navigation.state.params.selectedGood.discountType + ')'}</Text>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.goodNameText}>
                                {this.props.navigation.state.params.selectedGood.productName}
                            </Text>
                            
                        </View>
                    </View>
                </View>
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
    scrollView: {
        flex: 8,
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%'
    },
    contactArea: {
        height: 50,
        backgroundColor: '#e8eaf6',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5
    },
    viewInfo: {
        flex: 1
    },
    view1: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    entityName: {
        paddingLeft: 15,
        fontSize: 22,
        color: '#232323',
        fontWeight: 'bold',
        lineHeight: 40
    },
    entityIco: {
        flex: 1,
        alignSelf: 'center',
        paddingRight: 20,
        textAlign: 'right',
        color: 'white',
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
