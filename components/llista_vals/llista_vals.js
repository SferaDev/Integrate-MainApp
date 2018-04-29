import React, {Component} from 'react';
import {BackHandler, StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownMenu from "react-native-dropdown-menu";

export default class LlistaVals extends Component {

    constructor(props) {
        super(props);
        this.data = [["Totes", "Alimentació", "Cultura", "Formació", "Mobilitat", "Tecnologia", "Salut", "Esports", "Lleure", "Altres"], ["Recents", "Popularitat", "Proximitat"]];
        this.state = {
            isListView: false,
            goods: [],
            goods_shown:[],
            category: 0,
            order: 0
        };
    }

    componentDidMount() {
        this.getGoods();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    getGoods(loc) {
        let category = this.state.category;
        let order = this.state.order;
        API.getGoods(category, order, loc).then(this.setGoods.bind(this));
    }

    setGoods(goods) {
        this.setState({goods: goods, goods_shown: goods});
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    selectFilterOrder(selection, row) {
        //Seleccio filtre per categoria i metode d'ordenacio
        if(selection == 0){
            this.setState({
                category: row,
                selection: selection,
                row: row
            });
        }
        else if (selection == 1) {
            this.setState({
                order: row,
                selection: selection,
                row: row
            });
        }
        //Crida a la api
        if (selection == 1 && row == 2) {
            navigator.geolocation.getCurrentPosition(this.getGoods.bind(this), () => {});
        }
        else {
            this.getGoods();
        }
    }

    renderGood({item}) {
        return (
            <Text>{JSON.stringify(item)}</Text>
        );
    }

    render() {

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
                            data={this.state.goods}
                            renderItem={this.renderGood}
                        />
                    </View>
                </View>
                <View style={{height: 100}}>

                </View>

                <View style={styles.filterGoods}>
                    <Text>{"Categoria: "}</Text>
                    <Text>{"Ordenació: "}</Text>
                    <DropdownMenu
                        style={{flex: 1}}
                        bgColor={'#F5FCFF'}
                        tintColor={'#666666'}
                        activityTintColor={'orange'}
                        // arrowImg={}
                        // checkImage={}
                        // optionTextStyle={{color: '#333333'}}
                        // titleStyle={{color: '#333333'}}
                        // maxHeight={300}
                        handler={this.selectFilterOrder.bind(this)}
                        data={this.data}
                    >
                    </DropdownMenu>
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
    filterGoods: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#F5FCFF',
        borderRadius: 5,
        borderColor: '#ccc',
        borderStyle: "solid",
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
    }
});
