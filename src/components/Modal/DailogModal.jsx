import { View, Text, Modal ,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { themes } from '../../contexts/theme';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Buttons/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DailogModal = ({ show ,children,onClose , title ,isHeaderActive=false}) => {


    const {theme} = useTheme()

   

    return (
         <Modal visible={show} transparent animationType="fade" onRequestClose={onClose} >
                 <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 12 }}>
                   <View className={`${themes[theme].bgPrimary} rounded-3xl px-4 py-2 m-2`} >
                      { isHeaderActive && (
                          <View className={`flex flex-row justify-between  items-center ${theme === "light" ? 'border-neutral-500/50' : 'border-neutral-500/50'} border-b p-2`}>
                        <Text className={`text-xl font-medium ${themes[theme].textPrimary}`}>{title}</Text>
                        <TouchableOpacity  onPress={onClose}>
                            <Text className={`${themes[theme].iconColor}`}> <Ionicons name="close" size={28} /></Text>
                        </TouchableOpacity>
                       </View>
                       ) }
                       <View className="py-2">
                         {children}
                       </View>
                       
                   </View>
                 </View>
          </Modal>
    )
}

export default DailogModal

