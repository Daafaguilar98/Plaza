import React from 'react'
import {
  View,
  Text
} from 'react-native';

export default class OrdersItem extends React.Component {
  render() {
    return (
      <View style={Style.item}>
        <View style={Style.row}>
          <Text style={Style.documentNumber}>{ this.props.document_number }</Text>
          <Text>{ this.props.date }</Text>
        </View>
        <Text>{ this.props.name }</Text>
      </View>
    )
  }
}

const Style = {
  item: {
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: '2%',
    marginVertical: 3,
    padding: 10,
    borderRadius: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  documentNumber: {
    fontWeight: '600'
  }
}
