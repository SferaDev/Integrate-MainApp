import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown';
import language_settings from '../language_settings';
import API from '../api';

export default class Information extends Component {

    constructor(props) {
        super(props);

        this.appLanguages = [{value: 'Català', iso: 'ca'}, {value: 'Castellano', iso: 'es'}, {value: 'English', iso: 'en'}];

        this.state = {
            appLanguage: 0,
            goodLanguage: 0,
            lang: 'ca',
            goodLang: 'ca',
            goodsLanguages: [],
            name:'',
            surname: '',
            nif: '',
            email: ''
        };
    }

    componentDidMount() {
        this.setUserInformation();
    }

    setAppLanguage(lang) {
        return this.appLanguages.map(function(e) { return e.iso; }).indexOf(lang);
    }

    async setUserInformation() {
        let user = JSON.parse(await AsyncStorage.getItem('user')) || {};
        this.setState({
            name: user.firstName,
            surname: user.lastName,
            nif: user.nif,
            email: user.email,
            lang: user.interfaceLanguage,
            goodLang: user.goodLanguage,
            appLanguage: this.setAppLanguage(user.interfaceLanguage)
        });
        this.getAllLanguages(user.goodLanguage);
        if (global.lang == user.interfaceLanguage) this.setState({lang: user.interfaceLanguage});
        else this.setState({lang: global.lang});
    }

    async getAllLanguages(iso) {
        let langs = await API.getLanguages();
        let index = 0;
        let goodsLanguages = langs.map( (lang, i) => {
            if (iso == lang.language) index = i;
            return {value: lang.name, iso: lang.language};
        } );
        this.setState({goodsLanguages: goodsLanguages, goodLanguage: index, goodLang: iso});
    }

    handleBackButton() {
        return true;
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    selectAppLanguage(value, index) {
        this.setState(
            {
                appLanguage: index, 
                lang: this.appLanguages[index].iso
            }, 
            () => global.updateAppLanguage( this.appLanguages[index].iso ) 
        );
    }

    selectGoodsLanguage(value, index) {
        let goodLang = this.state.goodsLanguages[index].iso;
        this.setState(
            {
                goodLanguage: index
            },
            () => global.updateContentLanguage( goodLang )
        );
    }

    goToChangePassword() {
        this.props.navigation.navigate('change_password');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Icon style={styles.favProps} name="account-circle" size={170}/>
                </View>

                <View style={styles.body}>
                    <Text style={styles.basicTitle}>
                        {this.state.name} {this.state.surname}
                    </Text>
                    <Text style={styles.basicText}>
                        {this.state.nif}
                    </Text>
                    <Text style={styles.basicText}>
                        {this.state.email}
                    </Text>
                </View>

                <View style={[styles.body, {paddingBottom: 150}]}>
                    <Text style={styles.basicTitle}>
                        {language_settings[this.state.lang].profile.configuration}
                    </Text>
                    <View style={styles.filterLanguage}>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label={language_settings[this.state.lang].profile.app_language}
                                data={this.appLanguages}
                                onChangeText={this.selectAppLanguage.bind(this)}
                                value = {this.appLanguages[this.state.appLanguage].value}
                            />
                        </View>
                    </View>
                    <View style={styles.filterLanguage}>
                        <View style={{flex: 1}}>
                            <Dropdown
                                label={language_settings[this.state.lang].profile.good_language}
                                data={this.state.goodsLanguages}
                                onChangeText={this.selectGoodsLanguage.bind(this)}
                                itemCount={4}
                                value = {(this.state.goodsLanguages[this.state.goodLanguage] ? this.state.goodsLanguages[this.state.goodLanguage].value : "")}
                            />
                        </View>
                    </View>
                    <TouchableHighlight
                        style={[styles.button, {margin: 40}]}
                        onPress={this.goToChangePassword.bind(this)}>
                        <Text style={{alignSelf: 'center', color: 'white'}}>
                            {language_settings[this.state.lang].profile.button_text}
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
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    basicText: {
        fontFamily: 'Helvetica',
        fontSize: 19,
        margin: 10,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    favProps: {
        color: '#444444',
        paddingTop: 20,
    },
    filterLanguage: {
        height: 60,
        width: 260,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5
    },
});
