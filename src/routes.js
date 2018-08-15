import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {
  Text
} from 'react-native';

import LoginScreen from './Screens/Auth/Login.js'
import AuthLoadingScreen from './Screens/Auth/Loading.js'

import OrdersScreen from './Screens/Layouts/Orders.js'
import OrderScreen from './Screens/Layouts/Orders/Order.js'
import OrdersNewCustomerScreen from './Screens/Layouts/Orders/New/Customer.js'
import OrdersNewProductsScreen from './Screens/Layouts/Orders/New/Products.js'
import OrdersProduct from './UIComponents/OrdersProduct.js'
import OrdersNewSummaryScreen from './Screens/Layouts/Orders/New/Summary.js'
import OrdersEditCustomerScreen from './Screens/Layouts/Orders/Edit/Customer.js'
import OrdersEditProductsScreen from './Screens/Layouts/Orders/Edit/Products.js'
import OrdersEditProduct from './UIComponents/OrdersEditProduct.js'

import SettingsScreen from './Screens/Layouts/Setting'

const OrdersStack = createStackNavigator(
  {
    Main: OrdersScreen,
    Order: OrderScreen,
    Customer: OrdersNewCustomerScreen,
    Products: OrdersNewProductsScreen,
    Summary: OrdersNewSummaryScreen,
    Product:  OrdersProduct,
    CustomerEdit: OrdersEditCustomerScreen,
    ProductsEdit: OrdersEditProductsScreen,
    ProductEdit:  OrdersEditProduct
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
