import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

export default class DetallsGood extends Component {

    constructor(props) {
        super(props);
    }

    showEntity() {
        this.props.navigation.navigate('detalls_entitat', {selectedEntity: {_id: this.props.good.owner.id}});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.props.showGoodsList} style={styles.headerLeftIco} name="chevron-left"
                          size={35}/>
                    <Icon style={[styles.headerRightIco, {color: (this.props.isFav) ? '#f4eb49' : '#CCC'}]}
                          name="star" size={30}
                          id={this.props.good._id}
                          onPress={this.props.toggleFavourite.bind(this.props.context, this.props.good._id, this.props.isFav)}
                    />
                </View>
                <View style={styles.main}>
                    <View>
                        <Image
                            style={{width: '100%', height: '100%'}}
                            source={{uri: this.props.good.picture}}
                        />
                    </View>
                    <TouchableHighlight style={{
                        backgroundColor: 'rgba(255,255,255,0)',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}
                        onPress={this.showEntity.bind(this)} 
                        underlayColor='transparent'
                    >
                        <View style={styles.goodResume} >
                            <View style={{display: 'flex',flexDirection: 'column'}} >
                                <Text style={[styles.productName,{flex: 1}]}>{this.props.good.productName}</Text>
                                <Text style={[styles.entityNameText,{flex: 1}]}>{this.props.good.owner.name}</Text>
                            </View>
                            <View style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.goodBasicText}>{language_settings[global.lang].goods.period_before + ' ' + this.props.good.reusePeriod + ' ' + language_settings[global.lang].goods.period_after}</Text>
                                <Text
                                    style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.props.good.initialPrice + '€ (-' + this.props.good.discount + '' + this.props.good.discountType + ')'}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
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
        flex: 1,
        backgroundColor: '#e8eaf6AA',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 15
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
        fontWeight: 'bold'
    },
    goodBasicText: {
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#232323',
        flex: 1
    },
    entityNameText: {
        paddingLeft: 15,
        fontSize: 20,
        color: '#232323'
    },
});
