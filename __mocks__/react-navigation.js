import React from 'react';
import {Text, View} from 'react-native';

class ReactNavigation extends React.Component {

    static NavigationContainer() {
        return (<View><Text>HOLA</Text></View>);
    }

    static StackNavigator() {
        return ReactNavigation.NavigationContainer
    }

    static DrawerNavigator() {
        return ReactNavigation.NavigationContainer
    }

    render() {
        return (null);
    }
}

export default ReactNavigation;