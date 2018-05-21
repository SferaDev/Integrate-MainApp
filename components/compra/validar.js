import React, {Component} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../api";
import GoodValidar from "../compra/good_validar";
import Toast from "../login/toast";

export default class Validar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
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
            goods_shown: [],
            total_discount: 0,
            isFieldFocused: false,
            toast: false,
            typeError: null,
            soldOutGoods: [],
            nonUsableGoods: []
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
        this.setStateVariables();
    }

    setStateVariables() {
        this.setState({
            entity: this.props.navigation.state.params.entity,
            goods_shown: this.props.navigation.state.params.selected_goods,
            total_discount: this.props.navigation.state.params.total_discount
        });
    }

    updateCode(value) {
        this.setState({code: value});
    }

    isEmpty() {
        return (this.state.code.length === 0)
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

    updateToast() {
        this.setState({toast: true});
    }

    updateErrorState(body) {
        this.setState({soldOutGoods: body.soldOutGoods, nonUsableGoods: body.nonUsableGoods});
    }

    async validar() {

        let response = await API.newOrder(this.props.navigation.state.params.selected_goods, this.state.entity._id, this.state.code);
        this.setState({typeError: response.status});
        switch (response.status) {
            case 201: //Mostrar toast
                this.updateToast();
                break;
            case 403:
                this.updateToast();
                break;
            case 409: //Error conflicte vals
                this.updateToast();
                this.updateErrorState(response.body);
                break;
        }
    }

    onClose() {
        let typeError = this.state.typeError;
        switch (typeError) {
            case 201: //Descompte aplicat correctament
                this.props.navigation.goBack('detalls_entitat')
                break;
            case 403: //Error Codi Incorrecte
                this.setState({toast: false});
                break;
            case 409: //Error conflicte vals
                this.goBack();
                break;
            default:
                break;
        }
    }

    renderGood({item}) {
        for (let g of this.state.entity.goods) {
            if (g._id === item) {
                return (
                    <GoodValidar
                        item={g}
                    />
                );
            }
        }
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

    displayToastContent(){
        let typeError = this.state.typeError;
        switch (typeError) {
            case 201: //Descompte aplicat correctament
                return(<Text style={{textAlign: 'center'}}>Descompte aplicat correctament</Text>);
            case 403: //Error Codi Incorrecte
                return(<Text style={{textAlign: 'center'}}>Codi incorrecte</Text>);
            case 409: //Error conflicte vals
                let soldOutGoods = this.state.soldOutGoods || [];
                let nonUsableGoods = this.state.nonUsableGoods || [];
                let conflictGoods = soldOutGoods.concat(nonUsableGoods);
                let conflictList = conflictGoods.map(this.renderConflictGood.bind(this));
                return(
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 18}}>Conflicte amb els vals: </Text>
                        {conflictList}
                    </View>
                );
            default:
                return(<Text style={{textAlign: 'center'}}>Error</Text>);
        }
    }

    extractKey(item) {
        return item
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
                                keyExtractor={this.extractKey.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.viewTotalEstalvi}>
                        <Text style={styles.textDescompte}>
                            Descompte total
                        </Text>
                        <Text style={[styles.textDescompte, {textAlign: 'right'}]}>
                            -{this.state.total_discount} €
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
                            onPress={this.validar.bind(this)}
                            disabled={this.isEmpty()}>
                            <Text style={{alignSelf: 'center', color: this.getButtonColor(), fontWeight: 'bold', fontSize: 17}}>
                                Validar
                            </Text>
                        </TouchableHighlight>
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
        paddingBottom: 15,
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
