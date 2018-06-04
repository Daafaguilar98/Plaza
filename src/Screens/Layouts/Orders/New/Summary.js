import React, { Component } from 'react';
import Style from '../../../../Styles/Base.js';
import {
  Text,
  View
} from 'react-native';
import NavBar from '../../../../UIComponents/navBar.js'
import TabBar from '../../../../UIComponents/tabBar.js'

export default class OrdersNewSummaryScreen extends React.Component {
  render() {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
        <View style={Style.body}>
          <Text>Summary Screen</Text>
        </View>
      </View>
    );
  }
}
