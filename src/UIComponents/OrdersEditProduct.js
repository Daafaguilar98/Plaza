import React, { Component } from 'react';
import axios from 'axios'
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import NavBar from './navBar.js'
import Icon from 'react-native-vector-icons/Feather';

export default class OrdersProduct extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      quantity: 0,
      quantityPurchased: 0,
      price: 0,
    }
  }

  componentDidMount () {
    this.getQuantity()
    this.getInfo()
  }

  getInfo = () => {
    AsyncStorage.getItem('@newOrder:key', (err, result) => {
      axios.get(`https://api-proveedor.herokuapp.com/products/${this.props.navigation.getParam('code', '0000')}`)
      .then((response) => {
        let price = response.data.listaprecios.filter(price => price.ilista == JSON.parse(result).customer.type_price)[0]
        this.setState({ price: price.mprecio })
      })
    })
  }

  getQuantity = () => {
    const url = 'https://api-proveedor.herokuapp.com/products/quantity'
    const params = {
      code: this.props.navigation.getParam('code', '0000')
    }
    axios.post(url, params).then((response) => {
      this.setState(response.data)
    })
  }

  lessQuantity = () => {
    const newValue = this.state.quantityPurchased - 1
    this.setState({quantityPurchased: newValue})
  }

  moreQuantity = () => {
    const newValue = this.state.quantityPurchased + 1
    this.setState({quantityPurchased: newValue})
  }

  _setProduct = () => {
    AsyncStorage.getItem('@newOrder:key', (err, result) => {
      let newOrder = JSON.parse(result)
      let newProduct = {
        name: this.props.navigation.getParam('name', ''),
        code: this.props.navigation.getParam('code', '0000'),
        quantity: this.state.quantityPurchased,
        price: this.state.price
      }
      newOrder.products.push(newProduct)
      AsyncStorage.setItem('@newOrder:key', JSON.stringify(newOrder))
    })
    this.props.navigation.navigate('Products')
  }

  render() {
    return (
      <View>
        <View style={Style.photoWrapper}>
          <Image
            style={Style.photo}
            source={{uri: this.props.navigation.getParam('photo_url', '')}}
          />
        </View>
        <View style={Style.contentWrapper}>
          <Text style={Style.name}>{ this.props.navigation.getParam('name', '') }</Text>
          <Text>{ this.props.navigation.getParam('code', '0000') }</Text>
          <Text>{ this.state.quantity } unidades disponibles</Text>
          <Text>{ this.state.price }</Text>
          <View style={Style.quantityCount}>
            <TouchableOpacity
              style={Style.countButton}
              onPress={this.lessQuantity}>
              <Icon name="minus" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={Style.count}>{this.state.quantityPurchased}</Text>
            <TouchableOpacity
              style={Style.countButton}
              onPress={this.moreQuantity}>
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Button
            onPress={this._setProduct}
            title="EDITAR"
          />
        </View>
      </View>
    )
  }
}

const Style = {
  photoWrapper: {
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: '98%',
    height: 200,
    resizeMode: 'contain'
  },
  contentWrapper: {
    width: '100%',
    height: 600,
    padding: 20
  },
  name: {
    fontSize: 26
  },
  quantityCount: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  countButton: {
    borderRadius: 4,
    backgroundColor: '#2c3e50',
    padding: 10,
    elevation: 3
  },
  count: {
    width: 30,
    textAlign: 'center'
  }
}
