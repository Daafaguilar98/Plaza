import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navBar:{
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 3,
  },
  navBarLogo:{
    width: 100,
    height: 60,
    resizeMode: 'contain'
  },
  section: {
    flex: 1,
  },
  sectionCenter: {
    alignItems: 'center'
  },
  right: {
    alignItems: 'flex-end'
  }
});
