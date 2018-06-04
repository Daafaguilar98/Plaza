import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Style from '../Styles/navBar.js';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class navBar extends React.Component {
  render() {
    return (
      <View style={Style.navBar}>
        <View style={Style.section}>
          { this.props.goback &&
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#262626" />
            </TouchableOpacity>
          }
        </View>
        <View style={[Style.section, Style.sectionCenter]}>
          <Image
            style={Style.navBarLogo}
            source={{uri: 'http://plaza.netlify.com/static/img/logo.e219ed5.png'}}
            />
        </View>
        <View style={Style.section}/>
      </View>
    )
  }
}

export default withNavigation(navBar)
