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

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    selectFilterOrder(selection, row) {

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
                            data={this.props.goods}
                            renderItem={this.renderEntity}
                        />
                    </View>
                    <Text>{this.data[0][this.state.category]}</Text>
                    <Text>{this.data[1][this.state.order]}</Text>
                    <Text>{this.state.selection}</Text>
                    <Text>{this.state.row}</Text>
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
