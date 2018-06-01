import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import language_settings from './language_settings';


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navSectionStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    borderColor: 'lightgrey',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5
  },
  navItemStyle: {
    padding: 10,
    fontSize: 15
  },
  navItemLogo:{
    alignSelf: 'center',
    marginLeft: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});

class Drawer extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../Images/ic_launcher.png')} style={{height: 100, width: 100,alignSelf: 'center'}} />
        <ScrollView>

            <View style={styles.navSectionStyle}>
              <Icon style={styles.navItemLogo} name="home" size={25}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Buscador')}>{language_settings[ global.lang ].home.searcher}</Text>
            </View>

            <View style={styles.navSectionStyle}>
              <Icon style={styles.navItemLogo} name="ticket-percent" size={25}/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('LlistaVals')}>{language_settings[ global.lang ].home.goods}</Text>
            </View>

            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Page3
              </Text>
            </View>

        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.object
};

export default Drawer;