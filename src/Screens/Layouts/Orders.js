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
      data: []
    }
  }

  componentDidMount() {
    this.getOrders()
  }

  getOrders() {
    const url = `https://api-proveedor.herokuapp.com/orders`
    axios.get(url)
      .then(res => this.setState({data: res.data}))
  }

  createOrder = () => {
    const newOrder = JSON.stringify({
      customer: {},
      products: []
    })
    AsyncStorage.setItem('@newOrder', newOrder)
    this.props.navigation.navigate('Customer')
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar/>
        <View style={Style.body}>
          <Button
            title="Create an order"
            onPress={this.createOrder}
          />
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity>
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
