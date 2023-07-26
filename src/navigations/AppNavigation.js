import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import AppointmentInputScreen from '../screens/AppointmentInputScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { AppStyles } from '../AppStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ServicesScreen from '../screens/ServicesScreen';
import AccountProfileScreen from '../screens/AccountProfileScreen';
import ServiceInputScreen from '../screens/ServiceInputScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// login stack
const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />

  </Stack.Navigator>
);

const HomeStack = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = "home"
      } else if (route.name === 'Services') {
        iconName = "book-plus";
      }
      else if (route.name === 'Appointments') {
        iconName = "calendar";
      } else if (route.name === 'Account') {
        iconName = "account";
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}>
    {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
    <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Account" component={AccountProfileScreen} />
  </Tab.Navigator >
);


// Manifest of possible screens
const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="LoginStack"
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="ServiceInputScreen" component={ServiceInputScreen} />
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen name="HomeStack" component={HomeStack} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
  iconStyle: { tintColor: AppStyles.color.tint, width: 30, height: 30 },
});

export default AppNavigator;
