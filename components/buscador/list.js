import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList
} from 'react-native';

export default class EntityList extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  renderEntity(e){
    e = e.item;
    return(
      <View key={e.id} style={styles.entityView} >
        <Text style={styles.entityName} >Forn de Pa el Fornet</Text>
        <Text style={styles.entityDescription} >Pastisseria Les Corts</Text>
        <Text style={styles.entityAddress} >C/ Joan Güell, 25</Text>
        <View style={styles.entityLikes} >
          <Text>100</Text>
          <Text>TH</Text>
        </View>
      </View>
    );
  }

  render() {

    //const entityList = this.props.entities.map(this.renderEntity);

    return (
      <View style={[{...StyleSheet.absoluteFillObject},{paddingTop: 60,backgroundColor: 'white'}]} >
        <FlatList  
          data={this.props.entities}
          renderItem={this.renderEntity}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  entityView:{
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 15,
    paddingRight: 60
  },
  entityName:{
    fontSize: 24,
    color: '#094671',
  },
  entityDescription:{
    fontSize: 14,
    color: '#67acb1'
  },
  entityAddress:{
    fontSize: 14,
    color: '#606060'
  },
  entityLikes:{
    position: 'absolute',
    right: 15,
    top: 15,
    display: 'flex',
    flexDirection: 'row',
  }
});