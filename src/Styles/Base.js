import { StyleSheet } from 'react-native';

export default {
  layout: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    flexDirection: 'column',
  },
  body: {
    width: '100%',
    flex: 1
  },
  newOrder: {
    width: '90%',
  },
  ProductsList: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  searchWrapper: {
    margin: 10,
    backgroundColor: '#FFF',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  search: {
    flex: 1
  }
};
