import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoodCompra from "./good_compra";
import Toast from "../login/toast";
import language_settings from '../language_settings';


export default class Buy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entity: {
                _id: 0,
                name: '',
                description: '',
                addressName: '',
                email: '',
                phone: '',
                coordinates: [0, 0],
                goods: []
            },
            toast: false,
            typeError: null,
            selected_goods: [],
            soldOutGoods: [],
            nonUsableGoods: []
        };
    }

    componentDidMount() {
        this.getEntity();
    }

    getEntity() {
        API.getEntity(this.props.navigation.state.params.selectedEntity._id).then(this.setEntity.bind(this))
    }

    setEntity(entity) {
        this.setState({entity: entity});
    }

    goBack() {
        this.props.navigation.goBack();
    }

    updateToast() {
        this.setState({toast: true});
    }

    updateErrorState(body) {
        this.setState({soldOutGoods: body.soldOutGoods, nonUsableGoods: body.nonUsableGoods});
    }

    async goValidar() {
        if (this.state.selected_goods.length === 0) return;

        let response = await API.checkOrder(this.state.selected_goods);
        this.setState({typeError: response.status});

        switch (response.status) {
            case 200: //Navegar a validar
                this.props.navigation.navigate('validar', {
                    entity: this.state.entity,
                    selected_goods: this.state.selected_goods,
                    total_discount: response.body.totalDiscount,
                    forceRefresh: this.forceRefresh.bind(this),
                    getEntity: this.props.navigation.state.params.getEntity
                });
                break;
            case 409: //Error conflicte vals
                this.updateToast();
                this.updateErrorState(response.body);
                break;
        }
    }

    onClose() {
        let typeError = this.state.typeError;

        this.forceRefresh();

        switch (typeError) {
            case 409: //Error conflicte vals retornar a la mateixa vista
                this.setState({toast: false});
                break;
            default:
                this.setState({toast: false});
                break;
        }
    }

    toggleSelected(id) {
        this.block_get_Entity = true;
        this.flatList.refreshing = true;
        let selected_goods = this.state.selected_goods;

        if (!this.state.selected_goods.includes(id)) selected_goods.push(id);
        else {
            for (let i = 0; i < selected_goods.length; ++i) {
                if (selected_goods[i] === id) selected_goods.splice(i, 1);
            }
        }
        this.setState({selected_goods: selected_goods});
        this.flatList.refreshing = false;
        this.block_get_Entity = false;
    }

    renderGood({item}) {
        return (
            <GoodCompra
                key={item._id}
                item={item}
                onPress={this.toggleSelected}
                context={this}
                isSelected={this.state.selected_goods.includes(item._id)}
            />
        );
    }

    renderConflictGood(item) {
        let good = null;
        for (let g of this.state.entity.goods) {
            if (g._id === item) good = g;
        }
        if (good != null) {
            return (
                <Text key={item} style={{paddingLeft: 10}}>
                    - {good.productName}
                </Text>
            )
        }
    }

    displayToastContent() {
        let typeError = this.state.typeError;
        switch (typeError) {
            case 409: //Error conflicte vals
                let soldOutGoods = this.state.soldOutGoods;
                let nonUsableGoods = this.state.nonUsableGoods;
                let conflictGoods = soldOutGoods.concat(nonUsableGoods);
                let conflictList = conflictGoods.map(this.renderConflictGood.bind(this));
                return (
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}> {language_settings[global.lang].validate.conflict} </Text>
                        {conflictList}
                    </View>
                );
            default:
                return (<Text style={{textAlign: 'center'}}>Error</Text>);
        }
    }

    extractKey(item) {
        return item._id
    }

    refreshfunction() {
        if (!this.block_get_Entity) this.getEntity();
        return false
    }

    forceRefresh(){
        this.flatList.refreshing = true;
        this.refreshfunction();
        let selected_goods = this.state.selected_goods;
        for(let sgoodi in selected_goods){
            let sgood = selected_goods[sgoodi];
            if(this.state.nonUsableGoods.includes(sgood) || this.state.soldOutGoods.includes(sgood) ||
                !this.state.entity.goods.includes(sgood)) {
                selected_goods.splice(sgoodi,1);
            }
        }
        this.flatList.refreshing = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Text onPress={this.goValidar.bind(this)} style={styles.headerRightIco}>
                        {language_settings[global.lang].validate.done}
                    </Text>
                </View>
                <Text style={styles.entityName}>
                    {this.state.entity.name}
                </Text>
                <View style={styles.body}>
                    <View style={[{...StyleSheet.absoluteFillObject},
                        {paddingTop: 15}]}>
                        <FlatList
                            ref={flatList => this.flatList = flatList}
                            data={this.state.entity.goods}
                            renderItem={this.renderGood.bind(this)}
                            keyExtractor={this.extractKey.bind(this)}
                            refreshing={false}
                            onRefresh={this.refreshfunction.bind(this)}
                        />
                    </View>
                </View>
                <Toast
                    visible={this.state.toast}
                    onClose={this.onClose.bind(this)}>
                    {this.displayToastContent()}
                </Toast>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
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
        color: 'white',
        fontWeight: 'bold'
    },
    entityName: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#094671',
        padding: 10,
        alignSelf: 'flex-start'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%',
    }
});
