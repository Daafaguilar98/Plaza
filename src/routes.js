import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {
  Text
} from 'react-native';

import LoginScreen from './Screens/Auth/Login.js'
import AuthLoadingScreen from './Screens/Auth/Loading.js'

import OrdersScreen from './Screens/Layouts/Orders.js'
import OrdersNewCustomerScreen from './Screens/Layouts/Orders/New/Customer.js'
import OrdersNewProductsScreen from './Screens/Layouts/Orders/New/Products.js'
import OrdersProduct from './UIComponents/OrdersProduct.js'
import OrdersNewSummaryScreen from './Screens/Layouts/Orders/New/Summary.js'

import SettingsScreen from './Screens/Layouts/Setting'

const OrdersStack = createStackNavigator(
  {
    Main: OrdersScreen,
    Customer: OrdersNewCustomerScreen,
    Products: OrdersNewProductsScreen,
    Product:  OrdersProduct,
    Summary: OrdersNewSummaryScreen
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#fafafa'}
  }
)

const Layouts = createBottomTabNavigator(
  {
    Orders: OrdersStack,
    Settings: SettingsScreen
  },
  {
    navigationOptions: {
      tabBarVisible: false
    },
  }
);

const Auth = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#FFF'}
  }
)

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Layouts,
    Auth
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
