import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView ,useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../contexts/theme';
import { screenLayout } from '../styles/style';
import { useSelector } from 'react-redux';

const Header = ({ back = false, backScreen="" , isLeftIcon=false, leftIconName, isRightIcon=false, leftActionTitle = "", rightActionTitle = "", headerTitle = "", handlePressRight,rightIconName, handlePressLeft }) => {
  const { theme } = useTheme()
  const navigate = useNavigation()

    const insets = useSafeAreaInsets();




  return (
    <>   
             
            <View style={{ paddingTop: insets.top  }} className=" w-full flex-grow !shadow-md  flex-row items-center justify-between content-center  bg-white ">
               {  back && <TouchableOpacity className="flex-row items-center text-right p-3  w-1/4" onPress={() => navigate.navigate(backScreen)}>
                   <Text className={`${themes[theme].formLabel} `}>
                    <Icon className="relative left-0" name="chevron-left" size={30} /></Text>
                    
                  <Text className="text-lg font-medium " >{leftActionTitle}</Text>
               
              </TouchableOpacity>}
               {handlePressLeft && <TouchableOpacity className="flex-row items-center text-right p-3  w-1/4" onPress={handlePressLeft}>
                     {isLeftIcon && <Text className={`${themes[theme].formLabel} `}>
                    <Icon className="relative left-0" name={leftIconName} size={30} /></Text>}
                  <Text className="text-lg font-medium " >{leftActionTitle}</Text>
               
              </TouchableOpacity>}
              <View className={`w-auto justify-center flex flex-row items-center self-center p-3 `}><Text className={`${themes[theme].formLabel} text-xl font-medium`}>{headerTitle}</Text></View>
              <View className=" w-1/4 flex flex-row text-left justify-end pr-3  p-3 ">
                {
                  handlePressRight ? <TouchableOpacity onPress={handlePressRight}>
                    <View>
                      
                      <Text className={`${themes[theme].formLabel} text-lg font-medium ${rightActionTitle === 'Delete' && 'text-red-500'}`}>{rightActionTitle}</Text>
                    </View>
                  </TouchableOpacity>
                    :
                    <View className="flex flex-row gap-1 " >
                       {isRightIcon&&<Text><Icon name={rightIconName} size={21} /></Text>}
                      <Text className={`${themes[theme].formLabel} text-lg font-medium`}>{rightActionTitle}</Text>
                    </View>
                }
              </View>
            </View>
     
     
   
    </>
  )
}

export default Header

