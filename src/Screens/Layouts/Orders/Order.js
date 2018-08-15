import React from 'react'
import axios from 'axios'
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native'
import NavBar from '../../../UIComponents/navBar'
import Style from '../../../Styles/Base.js'
export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      products: [],
      customer: {}
    }
  }

  componentDidMount(){
    const data = this.props.navigation.getParam('data', {})
    // console.warn(data)
    this.setState({ data }, () => {
      this._getProducts()
      this._getCustomer()
    })
  }

  componentWillReceiveProps(){
    const data = this.props.navigation.getParam('data', {})
    this.setState({ data }, () => {
      this._getCustomer()
    })
  }

  _getProducts = () => {
    const reference = this.state.data.document_number
    const date = this.state.data.date.split('/').join('-')
    const url = `https://api-proveedor.herokuapp.com/order/products?reference=${reference}&date=${date}`
    axios.get(url).then((response) => {
      this.setState({ products: response.data })
    })
  }

  _getCustomer = () => {
    console.log('props')
    // axios.get(`https://api-proveedor.herokuapp.com/customers/${this.state.data.id_number}`).then((response) => {
    //   this.setState({ customer: response.data })
    // })
  }

  render () {
    return (
      <View style={Style.layout}>
        <NavBar
          goback={true}
        />
        <View style={Style.body}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerEdit', {data: this.state.data})}>
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
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={Style2.card}>
              <View style={Style2.productsHeader}>
                <Text style={[Style2.label, Style2.headerName]}>Producto</Text>
                <Text style={[Style2.label, Style2.headerUnit]}>Unid</Text>
                <Text style={[Style2.label, Style2.headerPrice]}>Precio</Text>
              </View>
              <FlatList
                data={this.state.products}
                numColumns={1}
                renderItem={({item}) => (
                  <View style={Style2.productsItem}>
                    <Text style={Style2.itemName}>{ item.code }</Text>
                    <Text style={Style2.itemQuantity}>{ item.quantity }</Text>
                    <Text style={Style2.itemPrice}>{ item.price }</Text>
                  </View>
                )}
                keyExtractor={item => item.code}
                />
                <View style={Style2.productsItem}>
                  <Button title="Nuevo Producto" onPress={() => this.props.navigation.navigate('ProductsEdit')}/>
                </View>
            </View>
          </TouchableOpacity>
          <Button title="Guardar Cambios"/>
        </View>
      </View>
    )
  }
}

const Style2 = {
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
