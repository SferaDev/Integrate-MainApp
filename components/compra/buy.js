import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoodCompra from "./good_compra";
import Toast from "../login/toast";


export default class Buy extends Component{

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
            typeError: 2,
            selected_goods: []
        };
    }

    componentDidMount() {
        this.getEntity();
    }

    getEntity(){
        API.getEntity(this.props.navigation.state.params.selectedEntity._id).then(this.setEntity.bind(this))
    }

    setEntity(entity) {
        this.setState({entity: entity});
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goValidar() {
        //TODO crida API enviar selected_goods
        //this.props.navigation.navigate('validar');
    }

    onClose() {
        let typeError = this.state.typeError;
        switch (typeError) {
            case 2: //Error conflicte vals
                this.setState({toast: false});
                break;
            default:
                break;
        }
    }

     toggleSelected(id) {
        this.flatList.refreshing = true;
        let selected_goods = this.state.selected_goods;

        if(!this.state.selected_goods.includes(id)) selected_goods.push(id);
        else {
            for (let i = 0; i < selected_goods.length; ++i) {
                if (selected_goods[i] === id) selected_goods.splice(i, 1);
            }
        }
        this.setState({selected_goods: selected_goods});
        this.flatList.refreshing = false;
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

    displayToastContent(){
        let typeError = this.state.typeError;
        switch (typeError) {
            case 2: //Error conflicte vals
                return(<Text style={{textAlign: 'center'}}>Conflicte amb els vals: </Text>);
                //TODO afegir nom vals en els quals hi ha conflicte
            default:
                return(<Text style={{textAlign: 'center'}}>Error</Text>);
        }
    }

    extractKey(item) {
         return item._id
    }

    refreshfunction() {return false}

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Text onPress={this.goValidar.bind(this)} style={styles.headerRightIco}>
                        DONE
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
