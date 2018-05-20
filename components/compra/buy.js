import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import NavigationActions from 'react-navigation';

import API from '../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoodCompra from "./good_compra";


export default class Buy extends Component{

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
    }

    goBack() {
        this.props.navigation.goBack();
    }

    renderGood({item}) {
        return (
            <GoodCompra
                item={item}
                key={item._id}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon onPress={this.goBack.bind(this)} style={styles.headerLeftIco} name="chevron-left" size={35}/>
                    <Text style={styles.headerRightIco}>
                        DONE
                    </Text>
                </View>
                <Text style={styles.entityName}>
                    {this.state.entity.name}
                </Text>
                <View style={styles.body}>
                    <View style={[{...StyleSheet.absoluteFillObject},
                        {paddingTop: 15}]}>
                        <FlatList
                            data={this.state.entity.goods}
                            renderItem={this.renderGood.bind(this)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
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
        color: 'white',
        fontWeight: 'bold'
    },
    entityName: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#094671',
        padding: 10,
        alignSelf: 'flex-start'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%',
    }
});
