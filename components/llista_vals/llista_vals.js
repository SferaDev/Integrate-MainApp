import React, {Component} from 'react';
import {BackHandler, FlatList, StyleSheet, Text, View} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';
import Good from './good';
import SegmentControl from 'react-native-segment-controller';

export default class LlistaVals extends Component {

    static navigationOptions = {
        drawerLabel: 'Vals',
        drawerIcon: <Icon name="ticket-percent" size={25}/>,
    };

    constructor(props) {
        super(props);

        this.categories = [{value: "Totes"}, {value: "Alimentació"}, {value: "Cultura"}, {value: "Formació"}, {value: "Mobilitat"}, {value: "Tecnologia"}, {value: "Salut"}, {value: "Esports"}, {value: "Lleure"}, {value: "Altres"}];
        this.orders = [{value: "Recents"}, {value: "Popularitat"}, {value: "Proximitat"}];

        this.state = {
            goods: [],
            goodsFav: [],
            goods_shown:[],
            category: 0,
            order: 0,
            selectedIndex: 1,
            visible: false
        };
    }

    componentDidMount() {
        this.getAllGoods();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    getAllGoods(){
        this.getGoods();
        this.getGoodsFav();
    }

    getGoods(loc) {
        let category = this.state.category;
        let order = this.state.order;
        API.getGoods(category, order, loc).then(this.setGoods.bind(this));
    }

    getGoodsFav(loc) {
        let category = this.state.category;
        let order = this.state.order;
        API.getGoodsFav(category, order, loc).then(this.setGoodsFav.bind(this));
    }

    setGoods(goods) {
        this.setState({goods: goods});
        if(this.state.selectedIndex == 1)this.setState({goods_shown: goods});
    }

    setGoodsFav(goodsFav) {
        this.setState({goodsFav: goodsFav});
        if(this.state.selectedIndex == 0)this.setState({goods_shown: goodsFav});
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    selectFilter(value, index) {
        //Seleccio filtre per categoria
        this.setState({category: index});

        //Crida a la api
        this.getGoods();
    }

    selectOrder(value, index) {
        //Seleccio filtre per metode d'ordenacio
        this.setState({order: index});

        //Crida a la api
        if (index === 2) {
            navigator.geolocation.getCurrentPosition(this.getGoods.bind(this), () => {
            });
        }
        else {
            this.getGoods();
        }
    }

    toggleFavourite(id,isFav) {
        if(!isFav) {
            API.addGoodFav(id).then(this.getAllGoods.bind(this));
        }
        else {
            API.deleteGoodFav(id).then(this.getAllGoods.bind(this));
        }
    }

    isFav(id){
        for(let good of this.state.goodsFav){
            if(good._id === id)return true;
        }
        return false;
    }

    renderGood({item}) {

        return (
            <Good
                id={item._id}
                item={item}
                onPress={this.toggleFavourite}
                context={this}
                isFav={this.isFav(item._id)}
            />
        );
    }

    setIndexChange(index) {

        let goods_shown = (index == 1) ? this.state.goods : this.state.goodsFav;
        this.setState({selectedIndex: index,goods_shown: goods_shown})
    }

    canApplyFilters() {
        if (this.state.selectedIndex == 0) return true;
        else return false;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>
                  <SegmentControl
                    values={['Preferits', 'Tots']}
                    height={50}
                    borderRadius={1}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.setIndexChange.bind(this)}
                />

                <View style={[styles.filterGoods, {height: (this.canApplyFilters()) ? 1 : 60}]}>
                    <View style={{flex: 1}} >
                        <Dropdown
                            label='Categoria'
                            data={this.categories}
                            onChangeText={this.selectFilter.bind(this)}
                            itemCount={10}
                            dropdownPosition={0}
                            disabled={this.canApplyFilters()}
                          />
                    </View> 
                    <View style={{flex: 1}} >
                        <Dropdown
                            label='Filtre'
                            data={this.orders}
                            onChangeText={this.selectOrder.bind(this)}
                            itemCount={3}
                            dropdownPosition={0}
                            disabled={this.canApplyFilters()}
                          />
                    </View>    
                </View>
                <View style={styles.body}>
                    <View style={[{...StyleSheet.absoluteFillObject}, {paddingTop: 15, backgroundColor: 'white'}]}>
                        <FlatList style={{}}
                            data={this.state.goods_shown}
                            renderItem={this.renderGood.bind(this)}
                        />
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
    filterGoods: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%'
    }
});
