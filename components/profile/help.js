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
            <View>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>
                <ScrollView style={{backgroundColor: '#F4F3F2'}}>
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <Text style={styles.category}>{language_settings[global.lang].help.category1}</Text>
                                <Text style={styles.question}>{language_settings[global.lang].help.question1}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer1}</Text>

                                <Text style={styles.question}>{language_settings[global.lang].help.question2}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer2}</Text>

                            <Text style={styles.category}>{language_settings[global.lang].help.category2}</Text>
                                <Text style={styles.question}>{language_settings[global.lang].help.question3}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer3}</Text>

                                <Text style={styles.question}>{language_settings[global.lang].help.question4}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer4}</Text>

                                <Text style={styles.question}>{language_settings[global.lang].help.question5}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer5}</Text>

                                <Text style={styles.question}>{language_settings[global.lang].help.question6}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer6}</Text>

                            <Text style={styles.category}>{language_settings[global.lang].help.category3}</Text>
                                <Text style={styles.question}>{language_settings[global.lang].help.question7}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer7}</Text>

                                <Text style={styles.question}>{language_settings[global.lang].help.question8}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer8}</Text>
                                
                                <Text style={styles.question}>{language_settings[global.lang].help.question9}</Text>
                                <Text style={styles.answer}>{language_settings[global.lang].help.answer9}</Text>
                            <Text style={styles.answer}> </Text>
                            <Text style={styles.answer}> </Text>
                        </View>
                    </View>
                </ScrollView>
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
        color: 'white',
    },
    headerRightIco: {
        flex: 1,
        alignSelf: 'center',
        paddingRight: 20,
        textAlign: 'right',
        color: 'white',
    },
    body: {
        flex: 8,
        alignItems: 'center',
        backgroundColor: '#F4F3F2',
        width: '100%',
        height: '100%',
    },
    category:  {
        width: '100%',
        fontSize: 26,
        textAlign: 'justify',
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 8,
        paddingLeft: 35,
        paddingRight: 35,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#AAA',
    },
    question:  {
        width: '100%',
        fontSize: 20,
        textAlign: 'justify',
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 35,
        paddingRight: 35,
        backgroundColor: '#AAAAAA2F',
    },
    answer:  {
        width: '100%',
        fontSize: 16,
        textAlign: 'justify',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 50,
        paddingRight: 50,
    },
});
