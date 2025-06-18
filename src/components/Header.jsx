import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../contexts/theme';
import { screenLayout } from '../styles/style';
import { useSelector } from 'react-redux';

const Header = ({ back = false, backScreen="" , leftActionTitle = "", rightActionTitle = "", headerTitle = "", handlePressLeft }) => {
  const { theme } = useTheme()
  const navigate = useNavigation()

  



  return (
    <>
      <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, }}>
        <View className="p-2  h-16  w-full bg-w-400 flex flex-row flex-grow-1 items-center justify-between content-center bg-white ">
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
              handlePressLeft ? <TouchableOpacity onPress={handlePressLeft}>
                <View>
                  <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
                </View>
              </TouchableOpacity> 
               :
                <View className="flex flex-row " >
                  <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
                </View>
            }
          </View>
        </View>
      </View>
    </>
  )
}

export default Header

// import { StyleSheet, Platform, StatusBar } from "react-native";

// export const screenLayout = StyleSheet.create({
//       padding: 16,
//       paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//       flex: 1,
//       // backgroundColor:colors.white1,
//   })