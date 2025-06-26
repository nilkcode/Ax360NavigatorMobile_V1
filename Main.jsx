import { View, Text,useColorScheme, ActivityIndicator} from 'react-native'
import React, { useReducer, useState ,useEffect} from 'react'
import Toast from "react-native-toast-message";
  
import { useTheme } from './src/contexts/ThemeContext'
import { themes } from './src/contexts/theme'
import Button from './src/components/Buttons/Button'
import { screenLayout } from './src/styles/style'
import TextBox from './src/components/InputsTextBox/TextBox'
import Login from './src/authentication/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { DefaultTheme } from './src/contexts/DefaultTheme';
import { DarkTheme } from './src/contexts/DarkTheme'
import Home from './src/common/screens/Home'
import Loader from './src/components/Loaders/Loader';
import { useSelector } from 'react-redux';
import WomGembaExerciseList from './src/wom/screens/WomGembaExerciseList';
import WomGembaExerciseAddEdit from './src/wom/screens/WomGembaExerciseAddEdit';
import { navigationRef } from './src/services/authServices/NavigationService';

const Stack = createNativeStackNavigator()



const Main = ({}) => {
   const { theme, toggleTheme } = useTheme()

   const {isAuthenticated} =  useSelector((state) => state.auth)
   const {lastScreen,lastActiveTime} = useSelector((state) => state.navigation)
   const [initialRoute, setInitialRoute ] =  useState(null)

 
  useEffect(() => {
    const now = Date.now();
     const diff = lastActiveTime ? (now - lastActiveTime) / 60000 : Infinity // in minutes


    if (!isAuthenticated) {
      setInitialRoute('login')
    } else if (diff > 5) {
      setInitialRoute('home')
    } else {     
       setInitialRoute(lastScreen || 'login')
    }

    // fallback timeout to prevent stuck loader 
    const timeout =  setTimeout(() => {
       if(!initialRoute){
        setInitialRoute('login')
       }
    },3000)

     return () => clearTimeout(timeout)

  }, [isAuthenticated, lastScreen, lastActiveTime])

  
 // 👉 Wait until initialRoute is set
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme} ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRoute}
          screenOptions={{ headerShown: false, }}>
          <Stack.Group>
            <Stack.Screen name='login' component={Login} screenOptions={{ headerShown: false, }} />
            <Stack.Screen name='home' component={Home} screenOptions={{ headerShown: false }} />
            <Stack.Screen name='/wom-mob-gemba-exercise-list' component={WomGembaExerciseList}   options={{ headerShown: false ,title:'Exercise'}}/>
               <Stack.Screen name='wom-mob-gemba-exercise-add-edit' component={WomGembaExerciseAddEdit}
             options={{ headerShown: false ,title:'Exercise'}}
              />
          </Stack.Group>
        </Stack.Navigator>
        <Toast position="top" />
      </NavigationContainer>
      {/* <View style={{ position: 'absolute', bottom: 4, right: 20 }}>
        <Button variant="fab" size='fabMedium' icon={`${theme === 'light' ? 'sun' : 'moon'}`} iconSize={24} onPress={toggleTheme} />
      </View> */}
      
    </>
  )
}

export default Main