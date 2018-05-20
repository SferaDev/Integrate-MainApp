import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Linking, ScrollView, Image} from 'react-native';
import NavigationActions from 'react-navigation';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DetallsGood extends Component{

    constructor(props) {
        super(props);
        this.state = {
            good: this.props.navigation.state.params.selectedGood,
            isFav: this.props.navigation.state.params.isFav,
        }
    }

    async toggleFavourite() {

        let id = this.state.good._id;

        if (!this.state.isFav){
            await API.addGoodFav(id);
            this.setState({isFav: true});
        }
        else{
            await API.deleteGoodFav(id);
            this.setState({isFav: false});
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Icon   style={[styles.headerRightIco, {color: (this.state.isFav) ? '#f4eb49' : '#CCC'}]}
                            name="star" size={30}
                            id={this.state.good._id}
                            onPress={this.toggleFavourite.bind(this)}
                    />
                </View>
                <View style={styles.main}>
                    <View>
                        <Image
                            style={{width: '100%',height: '100%'}}
                            source={{uri: this.state.good.picture}}
                        />
                    </View>
                    <View style={{backgroundColor: 'rgba(255,255,255,0)',position: 'absolute',bottom: 0,width: '100%',height: 125}} >
                        <View style={styles.goodResume} >
                            <Text style={styles.productName}>{this.state.good.productName}</Text>
                            <View style={{flex: 1,display: 'flex',flexDirection: 'row'}} >
                                <Text style={styles.goodBasicText}>Cada {this.state.good.reusePeriod} dies</Text>
                                <Text style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.state.good.initialPrice + '€ (-' + this.state.good.discount + '' + this.state.good.discountType + ')'}</Text>
                            </View>
                        </View>
                        <View style={styles.entityResume}>
                            <Text style={styles.entityNameText}>{this.state.good.owner.name}</Text>
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
    main: {
        flex: 8,
        backgroundColor: '#F5FCFF88',
        width: '100%',
        height: '100%'
    },
    goodResume: {
        height: 75,
        backgroundColor: '#e8eaf6AA',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5
    },
    entityResume: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        backgroundColor: '#F5FCFFAA'
    },
    productName: {
        paddingLeft: 15,
        fontSize: 22,
        color: '#232323',
        fontWeight: 'bold',
        lineHeight: 40
    },
    goodBasicText: {
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#232323',
        flex: 1
    },
    entityNameText: {
        fontSize: 20,
        paddingLeft: 15,
        color: '#232323',
        flex: 1
    },
});
