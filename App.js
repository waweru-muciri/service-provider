import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers';
import AppNavigator from './src/navigations/AppNavigation';
import {AppRegistry} from 'react-native';


const store = createStore(AppReducer, applyMiddleware(thunk));


function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;