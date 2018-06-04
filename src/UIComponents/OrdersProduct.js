import React, { Component } from 'react';
import axios from 'axios'
import {
  View,
  Image,
  Text,
  TextInput,
  Button
} from 'react-native';
import NavBar from './navBar.js'

export default class OrdersProduct extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      quantity: 0
    }
  }

  componentDidMount () {
    this.getQuantity()
  }

  getQuantity () {
    const url = 'https://api-proveedor.herokuapp.com/products/quantity'
    const params = {
      code: this.props.navigation.getParam('code', '0000')
    }
    axios.post(url, params).then((response) => {
      this.setState(response.data)
    })
  }

  addProduct () {

  }

  render() {
    return (
      <View>
        <View>
          <Image
            style={Style.photo}
            source={{uri: this.props.navigation.getParam('photo_url', '')}}
            />
          <Text>{ this.props.navigation.getParam('name', '') }</Text>
          <Text>{ this.props.navigation.getParam('code', '0000') }</Text>
          <Text>{ this.state.quantity }</Text>
          <TextInput keyboardType="numeric"/>
          <Button
            onPress={this.addProduct}
            title="AGREGAR"
            />
        </View>
      </View>
    )
  }
}

const Style = {
  photo: {
    width: '98%',
    height: 200,
    resizeMode: 'contain'
  }
}
