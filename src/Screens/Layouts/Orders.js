import React, { Component } from 'react';
import axios from 'axios'
import Style from '../../Styles/Base.js';
import {
  View,
  FlatList,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native';
import NavBar from '../../UIComponents/navBar'
import TabBar from '../../UIComponents/tabBar'
import OrdersItem from '../../UIComponents/OrdersItem'

export default class OrdersScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      user: {}
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@userToken:key', (err, result) => {
      this.setState({ user: JSON.parse(result) })
    })
    this.getOrders()
  }

  getOrders() {
    const url = `https://api-proveedor.herokuapp.com/orders`
    axios.get(url)
      .then(res => this.setState({data: res.data}))
  }

  createOrder = () => {
    const newOrder = JSON.stringify({
      seller: this.state.user.phone,
      customer: {},
      products: []
    })
    AsyncStorage.setItem('@newOrder:key', newOrder)
    this.props.navigation.navigate('Customer')
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar/>
        <View style={Style.body}>
          <Button
            style={Style.newOrder}
            title="Crear un pedido"
            onPress={this.createOrder}
          />
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Order', {data: item})}>
                <OrdersItem
                  {...item}
                  />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.document_number}
          />
        </View>
        <TabBar/>
      </View>
    );
  }
}
