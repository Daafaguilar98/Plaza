import React, { Component } from 'react';
import axios from 'axios'
import Style from '../../../../Styles/Base.js';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import NavBar from '../../../../UIComponents/navBar.js'
import TabBar from '../../../../UIComponents/tabBar.js'
import CustomerItem from '../../../../UIComponents/CustomerItem.js'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class OrdersNewCustomerScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullData: [],
      data: [],
      query: '',
      newOrder: {}
    }
  }

  componentDidMount() {
    this.getCostumers()
  }

  _setCustomer = (item) => {
    let newOrder = JSON.stringify({
      customer: {
        id_number: item.id_number,
        type_price: item.type_price
      }
    })
    AsyncStorage.mergeItem('@newOrder:key', newOrder)
    this.props.navigation.navigate('Products')
  }

  getCostumers () {
    const url = `https://api-proveedor.herokuapp.com/customers`
    axios.get(url)
      .then(res => this.setState({fullData: res.data, data: res.data}))
  }

  handleSearch = (text) => {
    const data = this.state.fullData.filter(customer => customer.name.toLowerCase().includes(text.toLowerCase()))
    this.setState({ query: text, data })
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
        <View style={Style.body}>
          <View style={Style.searchWrapper}>
            <Icon name="magnifier" size={20} color="#262626" />
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={this.handleSearch}
              placeholder="Buscar cliente..."
              style={Style.search}
            />
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {this._setCustomer(item)}}>
                <CustomerItem
                  {...item}
                  />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id_number}
          />
        </View>
      </View>
    );
  }
}
