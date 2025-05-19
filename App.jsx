/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect,useContext, } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View, Text, Pressable,
  useColorScheme,
  TextInput,
  SafeAreaView
} from 'react-native';


import "./global.css"
import Button from './src/components/Buttons/Button';
// import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ThemeProvider ,{ useTheme } from './src/contexts/ThemeContext';
import Main from './Main';
import { Provider } from 'react-redux';
import {store, persistor} from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider >
            <Main />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
