import React, { Component } from 'react';
import axios from 'axios'
import Style from '../../../../Styles/Base.js';
import {
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  AsyncStorage
} from 'react-native';
import NavBar from '../../../../UIComponents/navBar'
import TabBar from '../../../../UIComponents/tabBar'
import ProductsItem from '../../../../UIComponents/ProductsItem'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class OrdersNewProductsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullData: [],
      data: [],
      query: '',
    }
  }

  componentDidMount() {
    this.getProducts({ first: true })
    this.getAllProducts()
  }

  getProducts = ({ first }) => {
    const url = `https://api-proveedor.herokuapp.com/products?first=${first}`
    const oldData = this.state.fullData
    axios.get(url)
      .then(res => {
        this.setState({
          fullData: [...oldData, ...res.data],
          data: [...oldData, ...res.data],
        })
      })
  }

  getAllProducts = () => {
    const url = `https://api-proveedor.herokuapp.com/products?first=true&per=9999`
    axios.get(url)
      .then(res => {
        this.setState({
          fullData: res.data
        })
      })
  }

  handleSearch = (text) => {
    const data = this.state.fullData.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
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
              placeholder="Buscar productos..."
              style={Style.search}
            />
          </View>
          { this.state.fullData.length != 0  && <View style={Style.ProductsList}>
            <FlatList
              data={this.state.data}
              numColumns={2}
              renderItem={({item}) => (
                <ProductsItem
                  navigation={this.props.navigation}
                  route="ProductEdit"
                  {...item}
                />
              )}
              onEndReached={() => this.getProducts({first:false})}
              onEndReachedThreshold={0.5}
              keyExtractor={item => item.code}
            />
          </View>}
        </View>
      </View>
    );
  }
}
