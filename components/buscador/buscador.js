import React, {Component} from 'react';
import {BackHandler, StyleSheet, TextInput, View, TouchableHighlight} from 'react-native';
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
            entities_shown: [],
            searchText: ""
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        navigator.geolocation.getCurrentPosition(this.getEntities.bind(this), () => {
        });
    }

    handleBackButton() {
        return true;
    }

    async getEntities(loc) {
        let entities = await API.getEntities(loc);
        if(entities != null){
            this.setState({entities: entities, entities_shown: entities});
        }
    }

    showEntityInfo(ent) {
        let selEntity = this.state.entities_shown[ent];
        this.setState({selectedEntity: selEntity});
    }

    showEntity(selEntity){
        this.props.navigation.navigate('detalls_entitat',{selectedEntity: selEntity});
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    switchView() {
        let isListView = this.state.isListView;
        isListView = !isListView;
        this.setState({isListView: isListView});
    }

    showListView() {
        this.setState({isListView: true});
    }

    updateSearchText(value) {
        this.setState({searchText: value});
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(this.filterEntities.bind(this), 250);
    }

    filterEntities() {
        let searchText = this.state.searchText;
        let entities = this.state.entities;
        let entities_shown = [];
        if (!searchText) entities_shown = entities;
        else {
            for (let i in entities) {
                if (entities[i].name.toLowerCase().includes(searchText.toLowerCase())) {
                    entities_shown.push(entities[i]);
                }
            }
        }
        this.setState({entities_shown: entities_shown});
    }

    isAnEntitySelected() {
        return this.state.selectedEntity !== null ? true : false;
    }

    isListView() {
        return this.state.isListView ? 0 : 100;
    }

    render() {
        const that = this;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                    <Icon onPress={this.switchView.bind(this)} style={styles.headerRightIco} name="format-list-bulleted"
                          size={30}/>
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
                            <EntityList entities={this.state.entities_shown} onDetailsShow={this.showEntity.bind(this)} />
                            :
                            <Maps entities={this.state.entities_shown} onMarkerClick={this.showEntityInfo.bind(this)}/>
                    }
                </View>
                {
                    this.isAnEntitySelected() ?
                        <TouchableHighlight style={{height: this.isListView(), width: '100%'}} onPress={this.showEntity.bind(this,this.state.selectedEntity)} underlayColor='transparent' >
                            <View>
                                <Entity item={this.state.selectedEntity}/>
                            </View>
                        </TouchableHighlight>
                        :
                        null
                }
                <View style={styles.searchBox}>
                    <Icon name="magnify" size={20} style={{flex: 2, textAlign: 'center', alignSelf: 'center'}}/>
                    <TextInput
                        style={{flex: 18, padding: 0, paddingLeft: 5}}
                        value={this.state.searchText}
                        placeholder="Search"
                        onFocus={this.showListView.bind(this)}
                        onChangeText={this.updateSearchText.bind(this)}
                        autoComplete={false}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
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
