import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Linking} from 'react-native';
import { NavigationActions } from 'react-navigation';
import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entity from '../buscador/entity';
import MapView, {Marker} from 'react-native-maps';
import MarkerImage from '../../Images/marker60.png';
import call from 'react-native-phone-call';

export default class DetallsEntitat extends Component<{}> {

    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.navigation.goBack();
    }

    sendMail(){
        Linking.openURL('mailto:aleix.sanfeliu@gmail.com');
    }

    callTo(){
        const args = {
          number: '617167362', // String value with the number to call
          prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
        call(args);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                </View>
                <View style={{
                    flex: 8,
                    justifyContent: 'center',
                    backgroundColor: '#F5FCFF',
                    width: '100%',
                    height: '100%',
                    display: 'flex'
                }}>
                    <View style={{flex: 2}} >
                        <Entity item={this.props.navigation.state.params.selectedEntity}/>
                    </View>
                    <View style={{flex: 1,backgroundColor: '#e8eaf6',flexDirection: 'row'}} >
                        <TouchableHighlight style={{flex: 1}} onPress={this.callTo.bind(this)} underlayColor='transparent' >
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}} >
                                <Icon style={styles.phoneIcon} name="phone" size={35}/>    
                                <Text style={{flex: 1,color: '#67ACB1'}} >{this.props.navigation.state.params.selectedEntity.phone}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{flex: 1}} onPress={this.sendMail.bind(this)} underlayColor='transparent' >
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}} >
                                <Icon style={styles.phoneIcon} name="email-outline" size={35}/>
                                <Text style={{flex: 1,color: '#aaaaaa'}} >email</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 3,backgroundColor: 'green'}} >
                        <MapView
                            initialRegion={{
                                latitude: this.props.navigation.state.params.selectedEntity.coordinates[1],
                                longitude: this.props.navigation.state.params.selectedEntity.coordinates[0],
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.005,
                            }}
                            liteMode={true}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsPointsOfInterest={false}
                            showsMyLocationButton={false}
                            showsCompass={false}
                            toolbarEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            style={{...StyleSheet.absoluteFillObject}}
                        >
                            <Marker
                                key={this.props.navigation.state.params.selectedEntity._id}
                                identifier={'' + this.props.navigation.state.params.selectedEntity._id + ''}
                                image={MarkerImage}
                                coordinate={{
                                    latitude: this.props.navigation.state.params.selectedEntity.coordinates[1],
                                    longitude: this.props.navigation.state.params.selectedEntity.coordinates[0],
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                pinColor="red"
                                title=""
                                description=""
                            />
                        </MapView>
                    </View>
                    <View style={{flex: 4,backgroundColor: '#F4F3F2'}} >
                        <Text>{JSON.stringify(this.props.navigation.state.params.selectedEntity)}</Text>
                    </View>
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
    headerRightIco: {
        flex: 1,
        alignSelf: 'center',
        paddingRight: 20,
        textAlign: 'right',
        color: 'white'
    },
    phoneIcon:{
        color: '#094671',
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15
    }
});
