import React, { Component } from 'react';
import axios from 'axios'
import {
  AsyncStorage,
  Image,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      phone: '',
      password: '',
      messageError: ''
    }
  }

  render() {
    return (
      <View style={Style.layout}>
        <View style={Style.body}>
          <Image
            style={Style.LoginLogo}
            source={{uri: 'http://plaza.netlify.com/static/img/logo.e219ed5.png'}}
          />
        <Text>{ this.state.messageError }</Text>
        <View style={Style.inputs}>
            <TextInput
              placeholder="Numero de celular"
              onChangeText={(text) => this.setState({phone: text})}
              value={this.state.phone}
              />
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
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

  _signInAsync = () => {
    let params = {
      phone: this.state.phone,
      password: this.state.password,
    }
    axios.post(`https://api-proveedor.herokuapp.com/auth/login`, params).then((response) => {
      if (response.data.auth) {
        AsyncStorage.setItem('@userToken:key', JSON.stringify(response.data.data))
        this.props.navigation.navigate('Layouts')
      } else {
        this.setState({ messageError: response.data.message })
      }
    })
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
