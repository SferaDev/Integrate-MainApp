import React, {Component} from 'react';
import {BackHandler, StyleSheet, Text, TextInput, View} from 'react-native';
import Maps from './maps';
import EntityList from './list';
import Entity from './entity';
import API from '../api';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isListView: false,
            entities: [],
            selectedEntity: null,
        };
    }

    static navigationOptions = {
        drawerLabel: 'Buscador',
        drawerIcon: () => (
          <Icon name="home" size={25} />
        ),
    };

    componentDidMount() {
        this.getEntities();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    getEntities() {
        let that = this;
        API.getEntities().then(this.setEntities.bind(this)).catch(() => {});
    }

    setEntities(entities){
        this.setState({entities: entities});
    }

    showEntityInfo(ent){
        let selEntity = this.state.entities[ent];
        this.setState({selectedEntity: selEntity});
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    switchView() {
        let isListView = this.state.isListView;
        isListView = !isListView;
        this.setState({isListView: isListView});
    }

    render() {
        const that = this;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30} />
                    <Icon onPress={this.switchView.bind(this)} style={styles.headerRightIco} name="format-list-bulleted" size={30} />
                </View>
                <View style={{
                    flex: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                    width: '100%',
                    height: '100%'
                }}>
                    {
                        this.state.isListView ?
                            <EntityList entities={this.state.entities}/>
                            :
                            <Maps entities={this.state.entities} onMarkerClick={this.showEntityInfo.bind(this)} />
                    }
                </View>
                <View style={{height: this.state.isListView ? 0 : 100,width: '100%'}}>
                    { this.state.selectedEntity != null ?
                        <Entity item={this.state.selectedEntity} />
                        :
                        null
                    }
                </View>

                <View style={styles.searchBox}>
                    <Text style={{flex: 2, textAlign: 'center', alignSelf: 'center'}}>Q</Text>
                    <TextInput style={{flex: 18}} placeholder="Search" editable={false}/>
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
