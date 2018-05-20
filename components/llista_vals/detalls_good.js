import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Linking, ScrollView, Image} from 'react-native';
import NavigationActions from 'react-navigation';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DetallsGood extends Component{

    constructor(props) {
        super(props);
    }

    showEntity(){
        this.props.navigation.navigate('detalls_entitat',{selectedEntity: {_id: this.props.good.owner.id}});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.props.showGoodsList} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Icon   style={[styles.headerRightIco, {color: (this.props.isFav) ? '#f4eb49' : '#CCC'}]}
                            name="star" size={30}
                            id={this.props.good._id}
                            onPress={this.props.toggleFavourite.bind(this.props.context,this.props.good._id,this.props.isFav)}
                    />
                </View>
                <View style={styles.main}>
                    <View>
                        <Image
                            style={{width: '100%',height: '100%'}}
                            source={{uri: this.props.good.picture}}
                        />
                    </View>
                    <View style={{backgroundColor: 'rgba(255,255,255,0)',position: 'absolute',bottom: 0,width: '100%',height: 125}} >
                        <View style={styles.goodResume} >
                            <Text style={styles.productName}>{this.props.good.productName}</Text>
                            <View style={{flex: 1,display: 'flex',flexDirection: 'row'}} >
                                <Text style={styles.goodBasicText}>Cada {this.props.good.reusePeriod} dies</Text>
                                <Text style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.props.good.initialPrice + '€ (-' + this.props.good.discount + '' + this.props.good.discountType + ')'}</Text>
                            </View>
                        </View>
                        <TouchableHighlight style={styles.entityResume} onPress={this.showEntity.bind(this)} >
                            <Text style={styles.entityNameText}>{this.props.good.owner.name}</Text>
                        </TouchableHighlight>
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
