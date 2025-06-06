import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Cards = ({children, className,handlePress, isLeftBorderActive = false,borderColor = ''}) => {
  const {theme} = useTheme()

  return (
    <>
    <TouchableOpacity style={{borderLeftWidth:isLeftBorderActive ? 4 : 1 ,borderStartColor:isLeftBorderActive && `${borderColor}`}}   className={`p-1 outline-none shadow-md rounded-2xl  ${theme === 'light' && 'bg-white border border-neutral-200'} ${theme === 'dark'  && 'bg-white/5 border border-white/5'} ${className}`}  onPress={handlePress}>
         {children}
    </TouchableOpacity>
    </>

  )
}

export default Cards