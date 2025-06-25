import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView ,useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../contexts/theme';
import { screenLayout } from '../styles/style';
import { useSelector } from 'react-redux';

const Header = ({ back = false, backScreen="" , leftActionTitle = "", rightActionTitle = "", headerTitle = "", handlePressRight }) => {
  const { theme } = useTheme()
  const navigate = useNavigation()

    const insets = useSafeAreaInsets();




  return (
    <>   
             
            <View style={{ paddingTop: insets.top  }} className="p-2   w-full   flex-row items-center justify-between content-center bg-white ">
              <TouchableOpacity className="flex flex-row relative  w-1/5 " onPress={() => navigate.navigate(backScreen)}>
                <View className="flex-row items-center text-right" >
                  {back && <Text className={`${themes[theme].formLabel} `}>
                    <Icon className="relative left-0" name="chevron-left" size={30} /></Text>}
                  <Text className="text-lg font-medium " >{leftActionTitle}</Text>
                </View>
              </TouchableOpacity>
              <View className={`w-auto justify-center flex flex-row items-center self-center`}><Text className={`${themes[theme].formLabel} text-xl font-medium`}>{headerTitle}</Text></View>
              <View className=" w-1/5 flex flex-row text-left justify-end pr-3 ">
                {
                  handlePressRight ? <TouchableOpacity onPress={handlePressRight}>
                    <View>
                      <Text className={`${themes[theme].formLabel} text-lg font-medium ${rightActionTitle === 'Delete' && 'text-red-500'}`}>{rightActionTitle}</Text>
                    </View>
                  </TouchableOpacity>
                    :
                    <View className="flex flex-row " >
                      <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
                    </View>
                }
              </View>
            </View>
     
     
   
    </>
  )
}

export default Header

