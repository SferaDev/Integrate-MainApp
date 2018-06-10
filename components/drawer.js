import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Image, ImageBackground, TouchableHighlight, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from './api';
import language_settings from './language_settings';

class Drawer extends Component {

    constructor(props){
        super(props);

        this.state = {
            appLanguage: global.lang
        }

        global.updateAppLanguage = this.updateAppLanguage.bind(this);
        global.updateContentLanguage = this.updateContentLanguage.bind(this);
    }

    async updateAppLanguage(iso){
        this.setState({appLanguage: iso});

        API.setAppLanguage(iso);

        global.lang = iso;
        AsyncStorage.setItem('lang', iso);

        let user = JSON.parse(await AsyncStorage.getItem('user')) || {};
        user.interfaceLanguage = iso;
        AsyncStorage.setItem('user', JSON.stringify(user));
    }

    async updateContentLanguage(iso){

        API.setGoodLanguage(iso);

        let user = JSON.parse(await AsyncStorage.getItem('user')) || {};
        user.goodLanguage = iso;
        AsyncStorage.setItem('user', JSON.stringify(user));
    }
    
    navigateToScreen(route){
        this.props.navigation.navigate(route);
    }

    logOut(){
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        global.logOut();
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'rgba(255,0,0,0.3)'}} >
                    <ImageBackground source={require('../Images/bg.jpg')} style={{width: '100%',height: 140}} >
                        <Image source={require('../Images/ic_launcher.png')} style={{height: 100, width: 100,alignSelf: 'center',marginBottom: 20,marginTop: 20}} />
                    </ImageBackground>
                </View>
                <ScrollView>

                    <TouchableHighlight style={styles.navSection} onPress={this.navigateToScreen.bind(this,"Buscador")} underlayColor="white">
                        <View style={styles.navItem} >
                            <Icon style={styles.navItemLogo} name="home" size={25}/>
                            <Text style={styles.navItemLabel}>{language_settings[ this.state.appLanguage ].home.searcher}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.navSection} onPress={this.navigateToScreen.bind(this,"Vals")} underlayColor="white">
                        <View style={styles.navItem} >
                            <Icon style={styles.navItemLogo} name="ticket-percent" size={25}/>
                            <Text style={styles.navItemLabel}>{language_settings[ this.state.appLanguage ].home.goods}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.navSection} onPress={this.navigateToScreen.bind(this,"Profile")} underlayColor="white">
                        <View style={styles.navItem} >
                            <Icon style={styles.navItemLogo} name="settings" size={25}/>
                            <Text style={styles.navItemLabel}>{language_settings[ this.state.appLanguage ].home.settings}</Text>
                        </View>
                    </TouchableHighlight>

                </ScrollView>

                <TouchableHighlight style={[styles.navSection,{backgroundColor: '#8882'}]} onPress={this.logOut.bind(this)} underlayColor="white">
                    <View style={[styles.navItem,{height: 75}]} >
                        <Icon style={styles.navItemLogo} name="logout-variant" size={25}/>
                        <Text style={styles.navItemLabel}>{language_settings[ this.state.appLanguage ].home.log_out}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navSection: {
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5
    },
    navItem: {
        display: 'flex',
        flexDirection: 'row', 
        alignContent: 'center'
    },
    navItemLabel: {
        padding: 10,
        fontSize: 18,
        alignSelf: 'center'
    },
    navItemLogo:{
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15
    },
        footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
});

Drawer.propTypes = {
    navigation: PropTypes.object
};

export default Drawer;