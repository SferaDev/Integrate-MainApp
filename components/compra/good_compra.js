import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class GoodCompra extends Component {
    constructor(props) {
        super(props);

        this.colors = ["white", "#b22222", "pink", "#ff8c00", "#9400d3", "black", "green", "#4169e1", "#ffd700", "grey"];
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.selection}
                key={this.props.item._id}
                onPress={this.props.onPress.bind(this.props.context, this.props.item._id)}
                underlayColor="transparent"
            >
                <View
                    style={[styles.container, {
                        borderColor: this.props.isSelected ? '#98B353' : '#888888',
                        borderWidth: this.props.isSelected ? 2 : 1
                    }]}>
                    <View style={[styles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}/>
                    <View style={styles.viewGoodContent}>
                        <View style={styles.view1}>
                            <Text style={styles.goodBasicText}>Cada {this.props.item.reusePeriod} dies</Text>
                            <Text
                                style={[styles.goodBasicText, {textAlign: 'right'}]}>{this.props.item.initialPrice + '€ (-' + this.props.item.discount + '' + this.props.item.discountType + ')'}</Text>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.goodName}>{this.props.item.productName}</Text>
                            {
                                this.props.isSelected ?
                                    <Icon style={[styles.CheckBoxProps, styles.selected]}
                                          name="checkbox-marked-circle-outline" size={30}/>
                                    :
                                    <Icon style={[styles.CheckBoxProps, styles.unselected]}
                                          name="checkbox-blank-circle-outline" size={30}/>
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    selection: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'center',
        marginBottom: 5,
        width: '95%'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        borderRadius: 2,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 5,
    },
    viewBarra: {
        width: 25,
    },
    viewGoodContent: {
        flex: 1,
        paddingBottom: 5,
    },
    view1: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1
    },
    goodName: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 22,
        color: '#232323',
        fontWeight: 'bold'
    },
    CheckBoxProps: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right',
        color: '#f4eb49',
        paddingRight: 5,
        paddingTop: 5,
    },
    selected: {
        color: '#98B353'
    },
    unselected: {
        color: '#CCC'
    }
});