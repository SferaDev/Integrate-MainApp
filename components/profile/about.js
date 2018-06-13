import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View, ScrollView, Text, Dimensions, Keyboard, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>

                <View style={styles.body}>
                    
                    <Image style={{width: 150, height: 150}} source={require('../../Images/ic_launcher.png')}></Image>
                    <Image style={{width: 270, height: 53}} source={require('../../Images/integrateHeader1.png')}></Image>

                    <Text style={{width: 275,fontSize: 16,textAlign: 'center',paddingTop: 10,paddingBottom: 10}}>
                        {language_settings[global.lang].about.description}
                    </Text>

                    <Text style={{width: 275,fontSize: 16,textAlign: 'center',paddingTop: 10,paddingBottom: 10}}>
                        © 2018 Integrate Inc.
                    </Text>

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
    headerRightIco: {
        flex: 1,
        alignSelf: 'center',
        paddingRight: 20,
        textAlign: 'right',
        color: 'white'
    },
    body: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F3F2',
        width: '100%',
        height: '100%'
    }
});
