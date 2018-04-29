import React, {Component} from 'react';
import {BackHandler, StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LlistaVals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isListView: false,
            entities: [],
            entities_shown:[],
            searchText: ""
        };
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    render() {
        const that = this;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text onPress={this.openMenu.bind(this)} style={styles.headerLeftIco}>MENU</Text>
                </View>
                <View style={{
                    flex: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                    width: '100%',
                    height: '100%'
                }}>
                    <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 60, backgroundColor: 'white'}]}>
                        <FlatList
                            data={this.props.entities}
                            renderItem={this.renderEntity}
                        />
                    </View>
                </View>
                <View style={{height: 100}}>

                </View>

                <View style={styles.searchBox}>

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
