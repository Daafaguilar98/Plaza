import React, { Component } from 'react';
import axios from 'axios'
import NavBar from '../../UIComponents/navBar.js'
import TabBar from '../../UIComponents/tabBar.js'
import Style from '../../Styles/Base.js';
import {
  AsyncStorage,
  View,
  Text,
  Button
} from 'react-native';

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sync: false
    }
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar/>
        <View style={Style.body}>
          <Text>{this.state.sync}</Text>
          <Button
            title="Sincronizar datos"
            onPress={this.syncData}
          />
          <Button
            title="Cerrar mi usuario"
            onPress={this._signOutAsync}
          />
        </View>
        <TabBar/>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
  }

  syncData = () => {
    axios.get('http://api-proveedor.herokuapp.com/contapyme/sync').then((response) => {
      this.setState({
        sync: response.sync
      })
    })
  }
}
