import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../api";

export default class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: this.props.item.isLiked,
            numberLikes: this.props.item.numberLikes
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.numberLikes === undefined && this.props.item.numberLikes !== undefined) {
            this.setState({numberLikes: this.props.item.numberLikes})
        }
        if (prevState.isLiked === undefined && this.props.item.isLiked !== undefined) {
            this.setState({isLiked: this.props.item.isLiked})
        }
    }

    showEntityInfo() {
        if (this.props.onDetailsShow) {
            this.props.onDetailsShow(this.props.item);
        }
    }

    async likeEntity() {
        let response = await API.likeEntity(this.props.item._id);
        if (response)
            this.setState({isLiked: true, numberLikes: response.numberLikes});
    }

    async dislikeEntity() {
        let response = await API.dislikeEntity(this.props.item._id);
        console.log(response);
        if (response)
            this.setState({isLiked: false, numberLikes: response.numberLikes});
    }

    render() {
        return (
            <TouchableHighlight key={this.props.item._id} style={styles.entityView}
                                onPress={this.showEntityInfo.bind(this)} underlayColor='transparent'>
                <View>
                    <Text style={styles.entityName}>{this.props.item.name}</Text>
                    <Text style={styles.entityDescription}>{this.props.item.description}</Text>
                    <Text style={styles.entityAddress}>{this.props.item.addressName}</Text>
                    {
                        this.props.item.isDetails ?
                            <View style={styles.entityLikes}>
                                <Text style={styles.numberLikesStyle}>{this.state.numberLikes}</Text>
                                {
                                    this.state.isLiked ?
                                        <Icon onPress={this.dislikeEntity.bind(this)} style={styles.voteIcon}
                                              name="thumb-up"
                                              size={22}/>
                                        :
                                        <Icon onPress={this.likeEntity.bind(this)} style={styles.voteIcon}
                                              name="thumb-up-outline"
                                              size={22}/>
                                }
                            </View>
                            :
                            null
                    }
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    entityView: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderTopWidth: 1,
        padding: 15,
    },
    entityName: {
        fontSize: 24,
        color: '#094671',
    },
    entityDescription: {
        fontSize: 14,
        color: '#67acb1'
    },
    entityAddress: {
        fontSize: 14,
        color: '#606060',
        paddingRight: 60
    },
    entityLikes: {
        position: 'absolute',
        right: 8,
        top: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    numberLikesStyle: {
        fontSize: 22,
        color: '#094671',
    },
    voteIcon: {
        marginLeft: 10,
        color: '#094671',
    }
});
