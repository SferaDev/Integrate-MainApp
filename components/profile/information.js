import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown';
import ChangePassword from "./change_password";

export default class Information extends Component {

    constructor(props) {
        super(props);

        this.appLanguages = [{value: "Catala"}, {value: "Castella"}, {value: "Angles"}];
            this.goodsLanguages = [{value: "Catala"}, {value: "Castella"}, {value: "Angles"}, {value: "Altres"}];

        this.state = {
            appLanguage: 0,
            goodLanguage: 0,
            selectedIndex: 1
        };
    }

    handleBackButton() {
        return true;
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    selectAppLanguage(value, index) {
        this.setState({appLanguage: index});
    }

    selectGoodsLanguage(value, index) {
        this.setState({goodLanguage: index});
    }

    goToChangePassword() {
        this.props.navigation.navigate('changePassword');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Icon style={styles.favProps} name="account-circle" size={200}/>
                </View>

                <View style={styles.body}>
                    <Text style={styles.basicTitle}>
                        Bacary Keita Douno
                    </Text>
                    <Text style={styles.basicText}>
                        44994912T
                    </Text>
                    <Text style={styles.basicText}>
                        bacary@gmail.com
                    </Text>
                </View>

                <View style={[styles.body, {paddingTop: 50}]}>
                    <Text style={styles.basicTitle}>
                        Configuració:
                    </Text>
                    <View style={styles.filterLanguage}>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label='Idioma aplicació'
                                data={this.appLanguages}
                                onChangeText={this.selectAppLanguage.bind(this)}
                                itemCount={3}
                                dropdownPosition={0}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label='Idioma vals'
                                data={this.goodsLanguages}
                                onChangeText={this.selectGoodsLanguage.bind(this)}
                                itemCount={this.goodsLanguages.size}
                                dropdownPosition={0}
                            />
                        </View>
                    </View>
                </View>

                <View style={[styles.body, {paddingTop: 25}]}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.goToChangePassword.bind(this)}>
                        <Text style={{alignSelf: 'center', color: 'white'}}>
                            Canviar contrasenya
                        </Text>
                    </TouchableHighlight>
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
        backgroundColor: '#F4F3F2',
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
    body: {
        flex: 8,
        alignItems: 'center',
        backgroundColor: '#F4F3F2',
        width: '100%',
        height: '100%'
    },
    button: {
        borderWidth: 1,
        borderColor: '#0c59cf',
        backgroundColor: '#094671',
        width: 260,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        margin: 10,
    },
    basicTitle: {
        fontFamily: 'Helvetica',
        fontSize: 24,
        margin: 10,
        textAlign:'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 19,
        margin: 10,
        textAlign:'center',
        backgroundColor: 'transparent'
    },
    favProps: {
        color: '#444444',
        paddingTop: 20,
    },
    filterLanguage: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5
    },
});
