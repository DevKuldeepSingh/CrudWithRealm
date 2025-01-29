import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/routes';
import {store} from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
