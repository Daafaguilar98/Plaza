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
    this.state.newOrder = JSON.stringify(AsyncStorage.getItem('@newOrder'))
  }

  getCostumers() {
    const url = `https://api-proveedor.herokuapp.com/customers`
    axios.get(url)
      .then(res => this.setState({fullData: res.data, data: res.data}))
  }

  handleSearch = (text) => {
    const data = this.state.fullData.filter(customer => customer.name.includes(text))
    this.setState({ query: text, data })
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
        <View style={Style.body}>
          <View>
            <Text>{ JSON.stringify(this.state.newOrder) }</Text>
            <TextInput onChangeText={this.handleSearch}/>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Products')}>
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
