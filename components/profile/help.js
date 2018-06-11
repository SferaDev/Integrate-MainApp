import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View, ScrollView, Text, Dimensions, Keyboard, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

export default class Help extends Component {

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
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>
                        {language_settings[global.lang].help.title1}
                    </Text>
                    <Text style={styles.text}>
                        {language_settings[global.lang].help.text1}
                    </Text>

                    <Text style={[styles.text, {fontWeight: 'bold'}]}>
                        {language_settings[global.lang].help.title2}
                    </Text>
                    <Text style={styles.text}>
                        {language_settings[global.lang].help.text2}
                    </Text>

                    <Text style={[styles.text, {fontWeight: 'bold'}]}>
                        {language_settings[global.lang].help.title3}
                    </Text>
                    <Text style={styles.text}>
                        {language_settings[global.lang].help.text3}
                    </Text>

                    <Text style={[styles.text, {fontWeight: 'bold'}]}>
                        {language_settings[global.lang].help.title4}
                    </Text>
                    <Text style={styles.text}>
                        {language_settings[global.lang].help.text4}
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
    },
    text:  {
        width: 275,
        fontSize: 16,
        textAlign: 'justify',
        paddingTop: 8,
        paddingBottom: 8
    },
});
