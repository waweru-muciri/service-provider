import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import AppointmentInputScreen from '../screens/AppointmentInputScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { AppStyles } from '../AppStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ServicesScreen from '../screens/ServicesScreen';
import AccountProfileScreen from '../screens/AccountProfileScreen';
import AppointmentDetailsScreen from '../screens/AppointmentDetailsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';


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
    headerShown: false,
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
    <Tab.Screen name="Appointments"  component={AppointmentsScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Account" component={AccountProfileScreen} />
  </Tab.Navigator >
);


// Manifest of possible screens
const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="LoginStack">
    <Stack.Screen name="AppointmentDetailsScreen" component={AppointmentDetailsScreen} />
    <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} />
    <Stack.Screen name="AppointmentInputScreen" component={AppointmentInputScreen} />
    <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
    <Stack.Screen name="LoginStack" options={{ headerShown: false }} component={LoginStack} />
    <Stack.Screen name="Home" component={HomeStack} />
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
