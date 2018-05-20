import React, {Component} from 'react';
import {BackHandler, FlatList, StyleSheet, View} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown';
import Good from './good';
import SegmentControl from 'react-native-segment-controller';

export default class LlistaVals extends Component {

    constructor(props) {
        super(props);

        this.categories = [{value: "Totes"}, {value: "Alimentació"}, {value: "Cultura"}, {value: "Formació"}, {value: "Mobilitat"}, {value: "Tecnologia"}, {value: "Salut"}, {value: "Esports"}, {value: "Lleure"}, {value: "Altres"}];
        this.orders = [{value: "Recents"}, {value: "Popularitat"}, {value: "Proximitat"}];

        this.state = {
            goods: [],
            goodsFav: [],
            goods_shown: [],
            category: 0,
            order: 0,
            selectedIndex: 1,
            visible: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        this.props.navigation.addListener('didFocus', this.getAllGoods.bind(this,undefined));
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('didFocus', this.getAllGoods.bind(this,undefined));
    }

    handleBackButton() {
        return true;
    }

    async getAllGoods(loc) {

        let category = this.state.category;
        let order = this.state.order;

        let goods = await API.getGoods(category, order, loc);
        let goodsFav = await API.getGoodsFav(category, order, loc);

        if( goods != null && goodsFav != null ){
            if (this.state.selectedIndex == 1){
                this.setState({goods_shown: goods,goods: goods, goodsFav: goodsFav});
            } else{
                this.setState({goods_shown: goodsFav,goods: goods, goodsFav: goodsFav});
            }
        }
    }

    openMenu() {

        this.props.navigation.navigate('DrawerOpen');
    }

    selectFilter(value, index) {

        this.setState({category: index});
        this.getAllGoods();
    }

    selectOrder(value, index) {

        this.setState({order: index});

        if (index === 2) navigator.geolocation.getCurrentPosition(this.getAllGoods.bind(this), () => {});
        else this.getAllGoods();
    }

    async toggleFavourite(id, isFav) {

        if (!isFav) await API.addGoodFav(id);
        else  await API.deleteGoodFav(id);
        this.getAllGoods();
    }

    isFav(id) {
        for (let good of this.state.goodsFav) {
            if (good._id === id) return true;
        }
        return false;
    }

    showGoodDetails(good){
        this.props.navigation.navigate('detalls_good',{selectedGood: good,isFav: this.isFav(good._id)});
    }

    renderGood({item}) {

        return (
            <Good
                id={item._id}
                item={item}
                onPress={this.showGoodDetails}
                onToggleFav={this.toggleFavourite}
                context={this}
                isFav={this.isFav(item._id)}
            />
        );
    }

    setIndexChange(index) {

        let goods_shown = (index == 1) ? this.state.goods : this.state.goodsFav;
        this.setState({selectedIndex: index, goods_shown: goods_shown})
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
                    <View style={{flex: 1}}>
                        <Dropdown
                            label='Categoria'
                            data={this.categories}
                            onChangeText={this.selectFilter.bind(this)}
                            itemCount={10}
                            dropdownPosition={0}
                            disabled={this.canApplyFilters()}
                        />
                    </View>
                    <View style={{flex: 1}}>
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
                        <FlatList
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
