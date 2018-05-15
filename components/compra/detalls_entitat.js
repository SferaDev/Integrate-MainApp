import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Linking, ScrollView} from 'react-native';
import NavigationActions from 'react-navigation';
import MapView, {Marker} from 'react-native-maps';
import MarkerImage from '../../Images/marker60.png';
import call from 'react-native-phone-call';

import API from '../api';
import Entity from '../buscador/entity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Good from '../llista_vals/good';

export default class DetallsEntitat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            entity: {
                _id: 0,
                name: '',
                description: '',
                addressName: '',
                email: '',
                phone: '',
                coordinates: [0, 0],
                goods: []
            }
        }
    }

    componentDidMount() {
        this.getEntity();
    }

    getEntity(){
        API.getEntity(this.props.navigation.state.params.selectedEntity._id).then(this.setEntity.bind(this))
    }

    setEntity(entity) {
        this.setState({entity: entity});
        this.map.animateToRegion({
            latitude: entity.coordinates[1],
            longitude: entity.coordinates[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        });
    }

    toggleFavourite(id, isFav) {
        /*if (!isFav) {
            API.addGoodFav(id).then(this.getGoods.bind(this));
        }
        else {
            API.deleteGoodFav(id).then(this.getGoods.bind(this));
        }*/
    }

    renderGood(item) {
        return (
            <Good
                key={item._id}
                id={item._id}
                item={item}
                onPress={this.toggleFavourite}
                context={this}
                isFav={false}
            />
        );
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
                    <Icon style={styles.headerRightIco} name="basket" size={30}/>
                </View>
                <ScrollView style={{
                    flex: 8,
                    backgroundColor: '#F5FCFF',
                    width: '100%',
                    height: '100%'
                }}>
                    <View key="alpha" >
                        <Entity item={this.state.entity}/>
                    </View>
                    <View key="beta" style={{height: 50,backgroundColor: '#e8eaf6',flexDirection: 'row'}} >
                        { this.state.entity.phone != undefined ?
                        <TouchableHighlight style={{flex: 1}} onPress={this.callTo.bind(this)} underlayColor='transparent' >
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}} >
                                <Icon style={styles.phoneIcon} name="phone" size={35}/>    
                                <Text style={{flex: 1,color: '#67ACB1'}} >{this.state.entity.phone}</Text>
                            </View>
                        </TouchableHighlight> : null }
                        { this.state.entity.email != undefined ?
                        <TouchableHighlight style={{flex: 1}} onPress={this.sendMail.bind(this)} underlayColor='transparent' >
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}} >
                                <Icon style={styles.phoneIcon} name="email-outline" size={35}/>
                                <Text style={{flex: 1,color: '#aaaaaa'}} >{this.state.entity.email}</Text>
                            </View>
                        </TouchableHighlight> : null }
                    </View>
                    <View key="delta" style={{height: 200,marginBottom: 5}} >
                        <MapView
                            ref={map => this.map = map}
                            initialRegion={{
                                latitude: this.state.entity.coordinates[1],
                                longitude: this.state.entity.coordinates[0],
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
                                image={MarkerImage}
                                coordinate={{
                                    latitude: this.state.entity.coordinates[1],
                                    longitude: this.state.entity.coordinates[0],
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                pinColor="red"
                            />
                        </MapView>
                    </View>
                    {this.state.entity.goods.map(this.renderGood.bind(this))}
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