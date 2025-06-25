import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { themes } from '../../contexts/theme';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Buttons/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
const DailogModal = ({ show, children, onClose, title, isHeaderActive = false }) => {


  const { theme } = useTheme()



  return (
    //  <Modal visible={show} transparent animationType="fade" onRequestClose={onClose} >
    //          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 12 }}>
    //            <View className={`${themes[theme].bgPrimary} rounded-3xl px-4 py-2 m-2`} >
    //               { isHeaderActive && (
    //                   <View className={`flex flex-row justify-between  items-center ${theme === "light" ? 'border-neutral-500/50' : 'border-neutral-500/50'} border-b p-2`}>
    //                 <Text className={`text-xl font-medium ${themes[theme].textPrimary}`}>{title}</Text>
    //                 <TouchableOpacity  onPress={onClose}>
    //                     <Text className={`${themes[theme].iconColor}`}> <Ionicons name="close" size={28} /></Text>
    //                 </TouchableOpacity>
    //                </View>
    //                ) }
    //                <View className="py-2">
    //                  {children}
    //                </View>

    //            </View>
    //          </View>
    //   </Modal>
   <Modal
  isVisible={show}
  backdropOpacity={0.5}
  animationInTiming={300}
  animationOutTiming={300}
  avoidKeyboard
  backdropTransitionOutTiming={0}
  
>
  <View className={`${themes[theme].bgPrimary} rounded-3xl  p-4`}>
    {isHeaderActive && (
      <View className={`flex flex-row justify-between items-center border-b p-2 ${theme === "light" ? 'border-neutral-500/50' : 'border-neutral-500/50'}`}>
        <Text className={`text-xl font-medium ${themes[theme].textPrimary}`}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className={`${themes[theme].iconColor}`}>
            <Ionicons name="close" size={28} />
          </Text>
        </TouchableOpacity>
      </View>
    )}
    <View className="py-2">
      {children}
    </View>
  </View>
</Modal>

  )
}

export default DailogModal

