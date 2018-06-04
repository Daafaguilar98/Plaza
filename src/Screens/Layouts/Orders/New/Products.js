import React, { Component } from 'react';
import axios from 'axios'
import Style from '../../../../Styles/Base.js';
import {
  Text,
  TextInput,
  View,
  FlatList,
  Button
} from 'react-native';
import NavBar from '../../../../UIComponents/navBar'
import TabBar from '../../../../UIComponents/tabBar'
import ProductsItem from '../../../../UIComponents/ProductsItem'

export default class OrdersNewProductsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getProducts({ first: true })
  }

  getProducts = ({ first }) => {
    const url = `https://api-proveedor.herokuapp.com/products`
    const oldData = this.state.data
    axios.get(url)
      .then(res => {
        this.setState({
          data: [...oldData, ...res.data.products]
        })
      })
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
        <View style={Style.body}>
          <View>
            <TextInput />
          </View>
          <View style={Style.ProductsList}>
            <FlatList
              data={this.state.data}
              numColumns={2}
              renderItem={({item}) => (
                <ProductsItem
                  navigation={this.props.navigation}
                  {...item}
                />
              )}
              keyExtractor={item => item.code}
            />
          </View>
        </View>
      </View>
    );
  }
}
