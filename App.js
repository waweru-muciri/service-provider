import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers';
import AppNavigator from './src/navigations/AppNavigation';
import { AppRegistry } from 'react-native';
import { useFonts } from 'expo-font';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const store = createStore(AppReducer, applyMiddleware(thunk));
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

function App() {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
  });
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
      <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;