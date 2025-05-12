import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Octicons  from "react-native-vector-icons/Octicons"
import { themes } from '../../contexts/theme'
import { useTheme } from '../../contexts/ThemeContext'

const CheckBox = ({ label, checked, onChange }) => {
 
  const {theme} = useTheme()

  return (
    <TouchableOpacity className="flex flex-row items-center my-2"
  
    onPress={onChange}
  >
    <View 
       className={`w-[22px] h-[22px] leading-9 text-center items-center justify-center self-center rounded-md border-2 ${checked ? 'bg-blue-500 border-blue-500' :'bg-trasparent border-blue-500' }`}
    >
      {checked && (
        <Text className="text-white relative "><Octicons  name="check" size={18} className="" /></Text>
      )}
    </View>
      {/* {label && (
      <Text className={`ml-3 text-base ${themes[theme].formLabel}}`} >
        {label}
      </Text>
    )} */}
  </TouchableOpacity>
  )
}

export default CheckBox