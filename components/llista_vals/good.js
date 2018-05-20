import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Good extends Component {
    constructor(props) {
        super(props);

        this.colors = ["white", "#b22222", "pink", "#ff8c00", "#9400d3", "black", "green", "#4169e1", "#ffd700", "grey"];
    }

    render() {
        return (
            <TouchableHighlight key={this.props.item._id} style={styles.goodView} onPress={this.props.onPress.bind(this.props.context,this.props.item)} >
                <View style={{flex: 1,display: 'flex',flexDirection: 'row'}} >
                    <View style={[styles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}></View>
                    <View style={styles.viewInfo}>
                        <View style={styles.view1}>
                            <Text style={styles.goodBasicText}>Cada {this.props.item.reusePeriod} dies</Text>
                            <Text
                                style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.props.item.initialPrice + '€ (-' + this.props.item.discount + '' + this.props.item.discountType + ')'}</Text>
                        </View>
                        <Text style={styles.entityName}>
                            { this.props.isEntityDisplay ?
                                this.props.item.productName :
                                this.props.item.owner.name
                            }
                        </Text>
                        <View style={styles.view1}>
                            <Text style={styles.goodNameText}>
                                { this.props.isEntityDisplay ?
                                    '' :
                                    this.props.item.productName
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
        color: '#232323',
        fontWeight: 'bold'
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
