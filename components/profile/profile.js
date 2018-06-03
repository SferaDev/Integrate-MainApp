import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from '../language_settings';

import Information from './information';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        let {height, width} = Dimensions.get('window');

        this.state = {
            tabActive: 0,
            Dwidth: width,
            Dheight: height
        }
    }

    openMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    setActiveTab(i){
        this.setState({tabActive: i});
        this.sv.scrollTo({x: (i*this.state.Dwidth), y: 0, animated: true});
    }

    activeTabStyles(i){
        if(this.state.tabActive === i){
            return {color: 'white', backgroundColor: '#094671'};
        }else{
            return {color: '#98B353', backgroundColor: '#F4F3F2'};
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.openMenu.bind(this)} style={styles.headerLeftIco} name="menu" size={30}/>
                </View>

                <View style={styles.body}>
                    <ScrollView ref={sv => this.sv = sv} style={{backgroundColor: 'blue',width: '100%'}} horizontal={true} scrollEnabled={false}>

                        <Information style={{width: this.state.Dwidth}} />

                        <View style={{width: this.state.Dwidth}} >
                            <Text>HELLO WORLD</Text>
                        </View>

                        <View style={{width: this.state.Dwidth}} >
                            <Text>HELLO WORLD</Text>
                        </View>

                        <View style={{width: this.state.Dwidth}} >
                            <Text>HELLO WORLD</Text>
                        </View>

                    </ScrollView>
                </View>

                <View style={styles.footer} >
                    <Icon onPress={this.setActiveTab.bind(this,0)} style={[styles.footerIcon,this.activeTabStyles(0)]} name="account" size={30}/>
                    <Icon onPress={this.setActiveTab.bind(this,1)} style={[styles.footerIcon,this.activeTabStyles(1)]} name="lock-reset" size={30}/>
                    <Icon onPress={this.setActiveTab.bind(this,2)} style={[styles.footerIcon,this.activeTabStyles(2)]} name="information-outline" size={30}/>
                    <Icon onPress={this.setActiveTab.bind(this,3)} style={[styles.footerIcon,this.activeTabStyles(3)]} name="help" size={30}/>
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
