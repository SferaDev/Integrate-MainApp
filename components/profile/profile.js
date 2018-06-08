import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View, ScrollView, Text, Dimensions, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

import Information from './information';
import ChangePassword from './change_password';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        let {height, width} = Dimensions.get('window');

        this.state = {
            isFieldFocused: false,
            tabActive: 0,
            Dwidth: width,
            Dheight: height
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.moveUp.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.moveDown.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    moveUp() {
        this.setState({isFieldFocused: true});
    }

    moveDown() {
        this.setState({isFieldFocused: false});
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    setActiveTab(i){
        this.setState({tabActive: i});
        this.sv.scrollTo({x: (i*this.state.Dwidth), y: 0, animated: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    { this.state.tabActive == 0 ?
                        <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                        :
                        <Icon onPress={this.setActiveTab.bind(this,0)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    }
                </View>

                <View style={styles.body}>
                    <ScrollView ref={sv => this.sv = sv} style={{backgroundColor: 'blue',width: '100%'}} horizontal={true} scrollEnabled={false}>

                        <Information style={{width: this.state.Dwidth}} goToChangePassword={this.setActiveTab.bind(this,1)} />

                        <ChangePassword style={{width: this.state.Dwidth}} />

                        <View style={[styles.container,{width: this.state.Dwidth}]}>
                            
                            <Text style={{fontSize: 32}}>
                                Integrate SL
                            </Text>
                            <Text style={{width: 275,fontSize: 16,textAlign: 'center',paddingTop: 10,paddingBottom: 10}}>
                                {language_settings[global.lang].about.description}
                            </Text>
                            
                        </View>

                    </ScrollView>
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
        backgroundColor: '#F4F3F2',
        width: '100%',
        height: '100%'
    },
    footer:{
        height: 60,
        backgroundColor: '#F4F3F2',
        borderColor: '#67ACB1',
        borderTopWidth: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footerIcon: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 10
    }
});
