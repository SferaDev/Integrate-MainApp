import React, {Component} from 'react';
import {BackHandler, FlatList, StyleSheet, View} from 'react-native';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown';
import Good from '../compra/good';
import DetallsGood from './detalls_good';
import SegmentControl from 'react-native-segment-controller';
import language_settings from '../language_settings';

export default class LlistaVals extends Component {

    constructor(props) {
        super(props);

        this.categories = [{value: language_settings[global.lang].goods.all}, {value: language_settings[global.lang].goods.feeding}, {value: language_settings[global.lang].goods.culture},
            {value: language_settings[global.lang].goods.education}, {value: language_settings[global.lang].goods.mobility}, {value: language_settings[global.lang].goods.technology}, {value: language_settings[global.lang].goods.health},
            {value: language_settings[global.lang].goods.sports}, {value: language_settings[global.lang].goods.leisure}, {value: language_settings[global.lang].goods.others}];
        this.orders = [{value: language_settings[global.lang].goods.recent}, {value: language_settings[global.lang].goods.popularity}, {value: language_settings[global.lang].goods.proximity}];

        this.state = {
            goods: [],
            goodsFav: [],
            category: 0,
            order: 0,
            selectedIndex: 1,
            visible: false,
        };
    }

    componentDidMount() {
        this.getAllGoods();
    }

    async getAllGoods(loc) {

        let category = this.state.category;
        let order = this.state.order;

        let goods = await API.getGoods(category, order, loc);
        let goodsFav = await API.getGoodsFav(category, order, loc);

        let mergedGoods = [];
        for(let good of goods){
            let isFav = false;

            for(let Fgood of goodsFav){
                if(Fgood._id === good._id)isFav = true;
            }

            good.isFav = isFav;
            mergedGoods.push(good);
        }

        this.setState({goods: mergedGoods});
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

        if (index === 2) navigator.geolocation.getCurrentPosition(this.getAllGoods.bind(this), () => {
        });
        else this.getAllGoods();
    }

    renderGood({item}) {

        if( (this.state.selectedIndex === 0 && item.isFav) || this.state.selectedIndex === 1 ){
            return (
                <Good
                    item={item}
                    context={this}
                    isFav={item.isFav}
                    navigation={this.props.navigation}
                    refreshLists={this.getAllGoods.bind(this)}
                />
            );
        }
    }

    extractKey(item) {
        return item._id
    }

    setIndexChange(index) {
        this.setState({selectedIndex: index});
    }

    canApplyFilters() {
        return this.state.selectedIndex === 0;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                    </View>
                    <SegmentControl
                        values={[language_settings[global.lang].goods.favourites, language_settings[global.lang].goods.show_all]}
                        height={50}
                        borderRadius={1}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.setIndexChange.bind(this)}
                    />
                    <View style={[styles.filterGoods, {height: (this.canApplyFilters()) ? 1 : 60}]}>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label={language_settings[global.lang].goods.category}
                                data={this.categories}
                                onChangeText={this.selectFilter.bind(this)}
                                itemCount={10}
                                dropdownPosition={0}
                                disabled={this.canApplyFilters()}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label={language_settings[global.lang].goods.filter}
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
                                data={this.state.goods}
                                renderItem={this.renderGood.bind(this)}
                                keyExtractor={this.extractKey.bind(this)}
                                refreshing={false}
                                onRefresh={this.getAllGoods.bind(this)}
                            />
                        </View>
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
