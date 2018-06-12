import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';
import API from "../api";

export default class Good extends Component {

    constructor(props) {
        super(props);

        this.colors = ["white", "#b22222", "pink", "#ff8c00", "#9400d3", "black", "green", "#4169e1", "#ffd700", "grey"];

        this.state = {
            type: this.props.type || 0,
            isFav: this.props.isFav
        }
    }

    selectGood() {
        if (this.props.item.isUsable) this.props.onPress.bind(this.props.context, this.props.item._id).call();
    }

    getPeriodText() {
        return language_settings[global.lang].goods.period_before + ' ' + this.props.item.reusePeriod + ' ' + language_settings[global.lang].goods.period_after;
    }

    getDiscountText() {
        return this.props.item.initialPrice + '€ (-' + this.props.item.discount + '' + this.props.item.discountType + ')';
    }

    showGoodDetails() {
        this.props.navigation.navigate('detalls_good', {
            selectedGood: this.props.item,
            isFav: this.state.isFav,
            toggleFavourite: this.toggleFavourite.bind(this),
            isEntityDisplay: this.props.isEntityDisplay
        });
    }

    async toggleFavourite() {
        if(this.props.toggleFavourite) await this.props.toggleFavourite();

        let isFav = this.state.isFav;
        if (!isFav) await API.addGoodFav(this.props.item._id);
        else await API.deleteGoodFav(this.props.item._id);
        this.setState({isFav: !isFav});

        if(this.props.refreshLists) await this.props.refreshLists();

        return !isFav;
    }

    renderGood(type) {
        if (type === 1) {
            return this.renderBuyGood();
        } else if (type === 2) {
            return this.renderValidationGood();
        } else {
            return this.renderNormalGood();
        }
    }

    renderNormalGood() {
        let goodStyles = (this.props.item.isUsable) ? unsuedGoodStyles : usedGoodStyles;
        let {starColor} = (this.state.isFav) ? favoriteGoodStyles : unfavoriteGoodStyles;

        return (
            <TouchableHighlight style={goodCommonStyles.goodView} onPress={this.showGoodDetails.bind(this)}
                                underlayColor='white'>

                <View style={goodCommonStyles.goodSubView}>
                    <View
                        style={[goodCommonStyles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}/>
                    <View style={goodStyles.viewInfo}>

                        <View style={goodCommonStyles.small}>
                            <Text style={goodStyles.goodBasicText}>{this.getPeriodText()}</Text>
                            <Text
                                style={[goodStyles.goodBasicText, {textAlign: 'right'}]}>{this.getDiscountText()}</Text>
                        </View>

                        <Text style={goodStyles.entityName}>{this.props.item.productName}</Text>

                        <View style={goodCommonStyles.small}>
                            <Text style={goodStyles.goodNameText}>
                                {this.props.isEntityDisplay ?
                                    '' :
                                    this.props.item.owner.name
                                }
                            </Text>
                            <Icon style={[goodCommonStyles.favoriteStar, starColor]} name="star" size={25}
                                  onPress={this.toggleFavourite.bind(this)}/>
                        </View>

                    </View>
                </View>

            </TouchableHighlight>
        );
    }

    renderBuyGood() {
        let goodStyles = (this.props.item.isUsable) ? unsuedGoodStyles : usedGoodStyles;
        let {checkColor} = (this.props.isSelected) ? selectedGood : unselectedGood;

        return (
            <TouchableHighlight style={goodCommonStyles.goodView} onPress={this.selectGood.bind(this)}
                                underlayColor="transparent">
                <View
                    style={[goodCommonStyles.goodSubView, {
                        borderColor: this.props.isSelected ? '#98B353' : '#888888',
                        borderWidth: this.props.isSelected ? 2 : 1
                    }]}>
                    <View
                        style={[goodCommonStyles.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}/>
                    <View style={goodStyles.viewInfo}>

                        <View style={goodCommonStyles.small}>
                            <Text style={goodStyles.goodBasicText}>{this.getPeriodText()}</Text>
                            <Text
                                style={[goodStyles.goodBasicText, {textAlign: 'right'}]}>{this.getDiscountText()}</Text>
                        </View>

                        <View style={goodCommonStyles.small}>
                            <Text style={goodStyles.entityName}>{this.props.item.productName}</Text>
                            {
                                this.props.item.isUsable ?
                                    this.props.isSelected ?
                                        <Icon style={[goodCommonStyles.checkbox, checkColor]}
                                              name="checkbox-marked-circle-outline" size={30}/>
                                        :
                                        <Icon style={[goodCommonStyles.checkbox, checkColor]}
                                              name="checkbox-blank-circle-outline" size={30}/>
                                    : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderValidationGood() {
        return (
            <View key={this.props.item._id} style={validationGood.goodView}>
                <View style={[validationGood.viewBarra, {backgroundColor: this.colors[this.props.item.category]}]}/>
                <View style={validationGood.viewInfo}>
                    <Text style={validationGood.goodNameText}>{this.props.item.productName}</Text>
                    <Text style={[validationGood.goodBasicText, {textAlign: 'right'}]}>
                        {this.getDiscountText()}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return this.renderGood(this.state.type);
    }
}

const goodCommonStyles = StyleSheet.create({
    goodView: {
        flex: 1,
        alignSelf: 'center',
        marginBottom: 5,
        width: '97.5%'
    },
    goodSubView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#888888',
        borderRadius: 2,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderWidth: 1,
    },
    viewBarra: {
        width: 25,
    },
    viewInfo: {
        flex: 1,
        backgroundColor: 'white'
    },
    small: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    favoriteStar: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingRight: 5
    },
    checkbox: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right',
        color: '#f4eb49',
        paddingRight: 5,
        paddingTop: 5,
    },
});

const unfavoriteGoodStyles = StyleSheet.create({
    starColor: {
        color: '#CCC',
    }
});

const favoriteGoodStyles = StyleSheet.create({
    starColor: {
        color: '#f4eb49',
    }
});

const unselectedGood = StyleSheet.create({
    checkColor: {
        color: '#CCC',
    }
});

const selectedGood = StyleSheet.create({
    checkColor: {
        color: '#98B353',
    }
});

const unsuedGoodStyles = StyleSheet.create({
    viewInfo: {
        flex: 1,
        backgroundColor: 'white'
    },
    entityName: {
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 22,
        color: '#232323',
        fontWeight: 'bold',
        color: 'black'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1,
        color: 'black'
    },
    goodNameText: {
        fontSize: 15,
        paddingTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1,
        color: 'black'
    },
});

const usedGoodStyles = StyleSheet.create({
    viewInfo: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    entityName: {
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 22,
        color: '#232323',
        fontWeight: 'bold',
        color: 'gray'
    },
    goodBasicText: {
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1,
        color: 'gray'
    },
    goodNameText: {
        fontSize: 15,
        paddingTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1,
        color: 'gray'
    },
});

const validationGood = StyleSheet.create({
    goodView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'center',
        marginBottom: 5,
        width: '97.5%'
    },
    viewBarra: {
        width: 25,
    },
    viewInfo: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
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
    goodNameText: {
        fontSize: 15,
        paddingTop: 1,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#232323',
        flex: 1
    },
});