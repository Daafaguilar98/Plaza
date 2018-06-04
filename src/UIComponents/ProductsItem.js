import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

export default class ProductsItem extends React.Component {

  handleProduct = () => {
    this.props.navigation.navigate('Product',
    {
      code: this.props.code,
      name: this.props.name,
      photo_url: this.props.photo_url
    })
  }

  render() {
    return (
      <TouchableOpacity
        style={Style.wrapper}
        onPress={this.handleProduct}>
        <View style={Style.item}>
          <Image
            style={Style.photo}
            source={{uri: this.props.photo_url}}
          />
          <Text>{ this.props.name }</Text>
          <Text>codigo: { this.props.code }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const Style = {
  wrapper: {
    width: '46%',
    margin: '2%',
    elevation: 2,
    borderRadius: 2
  },
  item: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10
  },
  photo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  name: {
    fontWeight: '600'
  }
}
