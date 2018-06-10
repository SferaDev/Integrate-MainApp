import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

export default class Good extends Component {
    constructor(props) {
        super(props);
        this.colors = ["white", "#b22222", "pink", "#ff8c00", "#9400d3", "black", "green", "#4169e1", "#ffd700", "grey"];
    }

    render() {
        return (
            <TouchableHighlight key={this.props.item._id} style={styles.goodView}
                                onPress={this.props.onPress.bind(this.props.context, this.props.item)}
                                underlayColor='white'>
                <View style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
                    <View style={[styles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}/>
                    <View
                        style={[styles.viewInfo, {backgroundColor: (this.props.item.isUsable) ? 'white' : 'rgba(127,127,127,0.3)'}]}>
                        <View style={styles.view1}>
                            <Text
                                style={[styles.goodBasicText, {color: (this.props.item.isUsable) ? 'black' : 'rgb(127,127,127)'}]}>{language_settings[global.lang].goods.period_before + ' ' + this.props.item.reusePeriod + ' ' + language_settings[global.lang].goods.period_after}</Text>
                            <Text
                                style={[[styles.goodBasicText, {color: (this.props.item.isUsable) ? 'black' : 'rgb(127,127,127)'}], {textAlign: 'right'}]}>{this.props.item.initialPrice + '€ (-' + this.props.item.discount + '' + this.props.item.discountType + ')'}</Text>
                        </View>
                        <Text
                            style={[styles.entityName, {color: (this.props.item.isUsable) ? 'black' : 'rgb(127,127,127)'}]}>{this.props.item.productName}</Text>
                        <View style={styles.view1}>
                            <Text
                                style={[styles.goodNameText, {color: (this.props.item.isUsable) ? 'black' : 'rgb(127,127,127)'}]}>
                                {this.props.isEntityDisplay ?
                                    '' :
                                    this.props.item.owner.name
                                }
                            </Text>
                            <Icon style={[styles.favProps, {color: (this.props.isFav) ? '#f4eb49' : '#CCC'}]}
                                  name="star" size={25}
                                  onPress={this.props.onToggleFav.bind(this.props.context, this.props.item._id, this.props.isFav)}
                                  id={this.props.item._id}/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    favProps: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        color: '#f4eb49',
        paddingRight: 5
    },

    goodView: {
        flex: 1,
        borderColor: '#888888',
        borderRadius: 2,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginBottom: 5,
        width: '97.5%'
    },
    viewBarra: {
        width: 25,
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
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'gray'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        color: 'gray'
    },
    goodNameText: {
        fontSize: 15,
        paddingTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        color: 'gray'
    },
});
