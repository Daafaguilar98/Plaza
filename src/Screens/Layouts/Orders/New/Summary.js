import React, { Component } from 'react';
import axios from 'axios';
import Style from '../../../../Styles/Base.js';
import {
  Text,
  View,
  Button,
  FlatList,
  AsyncStorage
} from 'react-native';
import NavBar from '../../../../UIComponents/navBar.js'
import TabBar from '../../../../UIComponents/tabBar.js'

export default class OrdersNewSummaryScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      order: {},
      customer: {},
      total: 0
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('@newOrder:key', (err, result) => {
      this.setState({ order: JSON.parse(result)})
      this._calculateTotal()
      this._getCustomer()
    })
  }

  _calculateTotal = () => {
    this.setState({ total: 0 })
    let newTotal = 0
    this.state.order.products.forEach(product => {
      newTotal += parseInt(product.price * product.quantity)
    })
    this.setState({ total: newTotal })
  }

  _createOrder = () => {
    axios.post('https://api-proveedor.herokuapp.com/order', this.state.order).then((response) => {
      axios.get(`https://api-proveedor.herokuapp.com/order/process/${response.data.result[0].respuesta.datos.inumoper}`).then(() => {
        this.props.navigation.navigate('Main')
      })
    })
  }

  _getCustomer = () => {
    axios.get(`https://api-proveedor.herokuapp.com/customers/${this.state.order.customer.id_number}`).then((response) => {
      this.setState({ customer: response.data })
    })
  }

  _formatCurrency = (value) => {
      return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  render() {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
      <View style={[Style.body, Style2.body]}>
          <View style={Style2.header}>
            <Text style={Style2.total}>{this._formatCurrency(this.state.total)}</Text>
          </View>
          <View style={Style2.card}>
            <View style={Style2.textArea}>
              <Text style={Style2.label}>Nombre</Text>
              <Text style={Style2.text}>{ this.state.customer.name } { this.state.customer.lastname }</Text>
            </View>
            <View style={Style2.textArea}>
              <Text style={Style2.label}>Numero de identificacion</Text>
              <Text style={Style2.text}>{ this.state.customer.id_number }</Text>
            </View>
            <View style={Style2.textArea}>
              <Text style={Style2.label}>Dirección</Text>
              <Text style={Style2.text}>{ this.state.customer.address }</Text>
            </View>
          </View>
          <View style={Style2.card}>
            <View style={Style2.productsHeader}>
              <Text style={[Style2.label, Style2.headerName]}>Producto</Text>
              <Text style={[Style2.label, Style2.headerUnit]}>Unid</Text>
              <Text style={[Style2.label, Style2.headerPrice]}>Precio</Text>
            </View>
            <FlatList
              data={this.state.order.products}
              numColumns={1}
              renderItem={({item}) => (
                <View style={Style2.productsItem}>
                  <Text style={Style2.itemName}>{ item.name }</Text>
                  <Text style={Style2.itemQuantity}>{ item.quantity }</Text>
                  <Text style={Style2.itemPrice}>{ item.price }</Text>
                </View>
              )}
              keyExtractor={item => item.code}
            />
          </View>
          <View style={Style2.button}>
            <Button
              title="Finalizar pedido"
              onPress={this._createOrder}
              color="#ff4057"
              />
          </View>
        </View>
      </View>
    );
  }
}

const Style2 = {
  body: {
    backgroundColor: '#111329',
    color: '#FFF'
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 3,
    elevation: 3,
    margin: 10,
    padding: 10
  },
  total: {
    fontSize: 40,
    color: '#fff'
  },
  textArea: {
    marginBottom: 5
  },
  label: {
    color: '#A4A4A5',
    fontSize: 15
  },
  text: {
    fontWeight: 'bold'
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerName: {
    flex: 2
  },
  headerUnit: {
    flex: 1,
    textAlign: 'center'
  },
  headerPrice: {
    flex: 1,
    textAlign: 'right'
  },
  productsItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  itemName: {
    flex: 2
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center'
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right'
  },
  button: {
    margin: 10
  }
}
