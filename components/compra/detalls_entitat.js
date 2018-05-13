import React, {Component} from 'react';
import {BackHandler, StyleSheet, TextInput, View, Text} from 'react-native';
import { NavigationActions } from 'react-navigation';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entity from '../buscador/entity';

export default class DetallsEntitat extends Component {

    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                </View>
                <View style={{
                    flex: 8,
                    justifyContent: 'center',
                    backgroundColor: '#F5FCFF',
                    width: '100%',
                    height: '100%',
                    display: 'flex'
                }}>
                    <View style={{flex: 2}} >
                        <Entity item={this.props.navigation.state.params.selectedEntity}/>
                    </View>
                    <View style={{flex: 1,backgroundColor: '#e8eaf6'}} >
                        
                    </View>
                    <View style={{flex: 3,backgroundColor: 'green'}} >
                        
                    </View>
                    <View style={{flex: 4,backgroundColor: '#F4F3F2'}} >
                        
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
    searchBox: {
        position: 'absolute',
        top: 75,
        alignSelf: 'center',
        width: 345,
        height: 37,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#ccc',
        borderStyle: "solid",
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
    }
});
