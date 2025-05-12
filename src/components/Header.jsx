import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../contexts/theme';

const Header = ({back = false , leftActionTitle="" ,rightActionTitle="" ,headerTitle="", handlePressLeft}) => {
   const { theme } = useTheme()
   const navigate = useNavigation()

  return (
    <>
      <View  className="h-12   w-full bg-w-400 flex flex-row flex-grow-1 items-center justify-between content-center">
              <TouchableOpacity className="flex flex-row relative  w-1/5  "  onPress={() => navigate.goBack()}> 
                  <View className="flex-row items-center " >
                      {back && <Text className={`${themes[theme].formLabel} text-left`} style={{position:'relative',left:-5}}><Icon className="relative left-9" name="chevron-left" size={35}/></Text>}<Text className="text-lg font-medium " >{leftActionTitle}</Text>
                  </View>
               </TouchableOpacity>
              <View className={` justify-center flex flex-row items-center self-center text-center`}><Text className={`${themes[theme].formLabel} text-2xl font-medium`}>{headerTitle}</Text></View>
        {
          handlePressLeft ? <TouchableOpacity className=" w-1/5  flex flex-row items-center justify-end " onPress={handlePressLeft}>
            <View  >
            <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
          </View>
          </TouchableOpacity>  :
            <View className=" w-1/5  flex flex-row items-center justify-end " >
              <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
            </View>
        }
              
             
      </View>
    </>
  )
}

export default Header