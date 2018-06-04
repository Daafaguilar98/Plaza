import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class CustomerItem extends React.Component {
  render() {
    return (
      <View style={Style.item}>
        <Text style={Style.name}>{ this.props.name }</Text>
        <Text>{ this.props.id_number }</Text>
      </View>
    )
  }
}

const Style = {
  item: {
    width: '100%',
    alignItems: 'flex-start',
    padding: 5,
    marginBottom: 5
  },
  name: {
    fontWeight: '600'
  }
}
