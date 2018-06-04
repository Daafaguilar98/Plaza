import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={Style.layout}>
        <View style={Style.body}>
          <Image
            style={Style.LoginLogo}
            source={{uri: 'http://plaza.netlify.com/static/img/logo.e219ed5.png'}}
          />
        <View style={Style.inputs}>
            <TextInput
              placeholder="Correo electrónico"
              />
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={true}
              />
          </View>
          <Button
            title="Ingresar"
            onPress={this._signInAsync}
          />
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Layouts');
  }
}

const Style = {
  layout: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  LoginLogo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: -60,
  },
  inputs: {
    marginTop: 40,
    marginBottom: 20
  }
}
