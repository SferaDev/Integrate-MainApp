import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class EntityList extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  renderEntity(e){
    return(
      <View key={e} >
        <Text>{e}</Text>
      </View>
    );
  }

  render() {

    const entityList = this.props.entities.map(this.renderEntity);

    return (
      <View style={[{...StyleSheet.absoluteFillObject},{paddingTop: 60,backgroundColor: 'white'}]} >
        {entityList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pointNorth:{
    position: 'absolute', 
    bottom: 15, 
    left: 15, 
    height: 30, 
    width: 30, 
    borderRadius: 15, 
    backgroundColor: 'red',
  },
  goToMeButton:{
    position: 'absolute', 
    bottom: 15, 
    right: 15, 
    height: 45, 
    width: 45, 
    borderRadius: 22.5, 
    backgroundColor: 'red'
  }
});