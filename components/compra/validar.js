import React, {Component} from 'react';
import {BackHandler, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../api";
import GoodValidar from "../compra/good_validar";

export default class Validar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            // TODO cridar api per calcular total.
            total: 0,
            goods_shown: [],
            isFieldFocused: false
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
        this.getAllGoods();
    }

    async getAllGoods(loc) {

        let goods = await API.getGoods();

        if( goods != null){
            this.setState({goods_shown: goods});
        }
    }

    updateCode(value) {
        this.setState({code: value});
    }

    isEmpty() {
        return (this.state.code.length == 0)
    }

    getButtonBackground() {
        return (this.isEmpty() ? '#CCC' : '#094671');
    }

    getButtonColor() {
        return (this.isEmpty() ? '#666' : 'white');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    moveUp() {
        this.setState({isFieldFocused: true});
    }

    moveDown() {
        this.setState({isFieldFocused: false});
    }

    renderGood({item}) {

        return (
            <GoodValidar
                item={item}
                key={item._id}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                </View>
                <View style={styles.resum}>
                    <Text style={styles.textResum}>
                        Resum compra:
                    </Text>
                    <View style={[styles.body, {display: this.state.isFieldFocused ? 'none' : 'flex'}]}>
                        <View style={[{...StyleSheet.absoluteFillObject},
                            {paddingTop: 15}]}>
                            <FlatList
                                data={this.state.goods_shown}
                                renderItem={this.renderGood.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.viewTotalEstalvi}>
                        <Text style={styles.textDescompte}>
                            Descompte total
                        </Text>
                        <Text style={[styles.textDescompte, {textAlign: 'right'}]}>
                            {this.state.total} €
                        </Text>
                    </View>
                    <View style={styles.validateView}>
                        <Text style={styles.textCodi}>
                            Introduir codi de validació:
                        </Text>
                        <TextInput style={styles.basicInput}
                                   value={this.state.code}
                                   placeholder={"Introduir codi"}
                                   onChangeText={this.updateCode.bind(this)}
                                   underlineColorAndroid='rgba(0,0,0,0)'>
                        </TextInput>
                        <TouchableHighlight
                            style={[styles.button, {backgroundColor: this.getButtonBackground()}]}
                            onPress={()=>{}}
                            disabled={this.isEmpty()}>
                            <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold', fontSize: 17}}>
                                Validar
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
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
    resum: {
        flex: 7,
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    },
    textResum: {
        fontWeight: 'bold',
        fontSize: 25,
        height: 35
    },
    textDescompte: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 17
    },
    viewTotalEstalvi: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        height: 30,
    },
    validateView: {
        flex: 5,
        padding: 5,
        width: '100%'
    },
    textCodi: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        width: 200,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center'
    },
    basicInput: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: '90%',
        height: 35,
        borderRadius: 1,
        margin: 10,
        marginLeft: 15,
        padding: 0,
        paddingLeft: 5,
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    body: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%',
    }
});
