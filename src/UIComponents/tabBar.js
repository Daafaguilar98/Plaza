import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class tabBar extends React.Component {
  render() {
    return (
      <View style={Style.tabBar}>
        <TouchableOpacity onPress={() => Linking.openURL('whatsapp://app')}>
          <Icon name="speech" size={25} color="#262626" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Orders')}>
          <Icon name="notebook" size={25} color="#262626" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
          <Icon name="settings" size={25} color="#262626" />
        </TouchableOpacity>
      </View>
    )
  }
}

const Style = {
  tabBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb'
  }
}

export default withNavigation(tabBar)
