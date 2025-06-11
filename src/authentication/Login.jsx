import { View, Text, Alert, Animated, styles, StyleSheet ,Image,KeyboardAvoidingView, ScrollView,Platform, SafeAreaView,Keyboard, TouchableOpacity, Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { screenLayout } from '../styles/style'
import { useTheme } from '../contexts/ThemeContext'
import { themes } from '../contexts/theme'
import TextBox from '../components/InputsTextBox/TextBox'
import Button from '../components/Buttons/Button'
import { useNavigation } from '@react-navigation/native'
import Logo  from "../assets/images/360Nav_logo.svg"
import gembaWark from "../assets/images/gembawark.jpg"
import Header from '../components/Header'
import CheckBox from '../components/InputsTextBox/CheckBox'
import Toast from 'react-native-toast-message';
import {Buffer} from 'buffer'
// Login Imports
import {  decryptAPIResponseUsingAES256, encryptData } from '../utlis/cryptoHelper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers,loginUser } from '../redux/slices/authSlices'
import Loader from '../components/Loaders/Loader'
import {setLastScreen} from  "../redux/slices/navigationSlices"

const {height} = Dimensions.get("window");


// Set Dyanmic Height based on screen
const IMAGE_HEIGHT = (height * 0.20);
const IMAGE_HEIGHT_SMALL  =  (height * (0.05))

const Login = () => {
 
  const {theme} = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()


 // This code is for keyboard Avoiding view when we  kewyboard open images shreenk

  const imageHeight = useRef(new Animated.Value(IMAGE_HEIGHT)).current

  useEffect(() => {
    const willKeyboardShow = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillShow": "keyboardDidShow",
        (event) => {
            Animated.timing(imageHeight,{
                duration:event.duration || 300 , // This is duration for Android 
                toValue:IMAGE_HEIGHT_SMALL,                     // This height apply when keyboard showing,
                useNativeDriver:false,
            }).start()
        }
    );
    const willKeyboardHide = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillHide":"keyboardDidHide",
        (event) => {
            Animated.timing(imageHeight,{
                duration:event.duration || 300,
                toValue:IMAGE_HEIGHT,             // This height apply when keyboard hidden,
                useNativeDriver:false,
            }).start()
        }
    )
    return () => {
        willKeyboardShow.remove()
        willKeyboardHide.remove()
    }
  })








    const [isChecked, setIsChecked] = useState(false)
    const [accessCode, setAccessCode] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState(null)
    const [loginError, setLoginError] = useState(false)

    
    const { user, error, loading } = useSelector((state) => state.auth);
  

   
   

  // 🔥 Accessing the auth state
    const handleFormSubmit = async  () => {
        
        if (!accessCode ||!userName ||!password) {
            Toast.show({
                type: "error",
                text1: "Please fill all fields",
            });
            return;
        }
      
        try {
            let encryptedPsw = encryptData(password)
            await dispatch(loginUser({ userName, password: encryptedPsw, accessCode, isFromLogIn: true })).unwrap()
            dispatch(setLastScreen("home"))
            navigation.navigate("home");
            Toast.show({
                type: "success",
                text1: "Login Successfully",
            });
            setAccessCode('');
            setuserName('');
            setPassword('')
        } catch (err) {
        }


      
    }

   

  return (
      <KeyboardAvoidingView className="flex flex-col flex-grow"  >
          <View >
              {/* <Header back={false} className=""/> */}
              <Animated.Image source={require("../assets/images/gembawark.jpg")} resizeMode='cover' className={`w-full`} style={{height:imageHeight}} />
              {/* h-96 */}
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="py-10"> 
          <View className="py-20 justify-center" style={[screenLayout]} >
              <View className="flex justify-center text-center flex-row mb-4"><Logo width={300} height={70} fill="blue" /></View>
              <View className="mb-6">
                  <View className="">
                      <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Access Code</Text>
                  </View>
                  <View>
                      <TextBox   placeholder='Enter Access Code' value={accessCode}
                          onChangeText={setAccessCode}
                          isValidation={true}  />
                  </View>
              </View>
              <View className="mb-6">
                  <View className="">
                      <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>UserName</Text>
                  </View>
                  <View>
                      <TextBox inputType='email' placeholder='Enter Valid Email' value={userName}
                          onChangeText={setuserName}
                          isValidation={true} errorMessage={"Please Enter Valid Email"} />
                  </View>
              </View>
              <View className="mb-1">
                  <View className="">
                      <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Password</Text>
                  </View>
                  <View>
                      <TextBox inputType="password" placeholder='Enter password' value={password}
                          onChangeText={setPassword}
                          isValidation={true} />
                  </View>
              </View>
              <View className='flex flex-row justify-between items-center '>
                  <View className="flex flex-row items-center">
                      <Text className={`text-lg mx-4  ${themes[theme].formLabel}`}>Remember Me</Text>
                      <CheckBox label="Remember Me" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                  </View>

                  <TouchableOpacity className="mx-4">
                      <Text style={{ fontFamily: "PoppinsItalic", }} className={`underline ${theme === "light" ? 'text-blue-600' : 'text-blue-500'} text-base font-medium`}>Forgot Password ?</Text>

                  </TouchableOpacity>
              </View>
              <View className="mt-6">
                  <Button variant='filled' size='large'  title={`${loading ? 'Login...' : 'Login'}`} onPress={handleFormSubmit} />
              </View>
              {error != null   && <Text className="text-white font-medium mt-2 p-3 flex justify-center text-center items-center rounded-full bg-red-500 " >{error}</Text>   }
              

           </View>
           </ScrollView>
           <Loader visible={loading} />
      </KeyboardAvoidingView>
  )
}
export default Login