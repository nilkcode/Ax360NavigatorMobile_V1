import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Icon from "react-native-vector-icons/FontAwesome5"
import { themes } from '../../contexts/theme'


const  Button = ({ title,
  onPress,
  size = 'medium',         // Default size is 'medium'
  variant = 'filled',     // 'filled', 'outline', or 'block'
  icon,                   // Icon component, optional
  isLoading = false,      // Loading state (to show ActivityIndicator)
  disabled = false,       // Disable button
  className = '',         // Custom Tailwind class names
  block = false, 
  iconSize =18         // Full width button
}) => {
 const { theme } = useTheme()
 
     const sizeStyle = {
         small:  'py-2 px-4 text-sm' ,
         medium:  'py-3 px-6 text-lg',
         large:  'py-4 px-8 text-lg ',
         fabSmall:'w-16 h-16 rouded-full',
         fabMedium:'w-20 h-20  rouded-full',
         fabLarge:'w-24 h-24 rounded-full ',
     }

      // Variant styles
    const variantStyles = {
      filled: disabled ? 'opacity-50 bg-blue-500' : `bg-blue-500 `,
      outline: disabled ? 'opacity-50 bg-transparent border-2 border-blue-500 ' : 'bg-transparent border-2 border-blue-500 ',
      block: disabled ? 'opacity-50 bg-blue-500' : 'bg-blue-500 text-white', // Block buttons will be styled like 'filled' but with full width
      link:disabled ? 'opacity-50 bg-blue-500' : 'bg-transparen text-blue-500',
      fab:disabled ? 'opacity-50 bg-blue-500' : `bg-blue-500`,
  };

  const variantTextStyles = {
      filled:  `text-white ${className}`,
      outline:  `text-blue-500 ${className}`,
      link: `bg-transparent text-blue-500 ${className}`,
      block:    'text-white', // Block buttons will be styled like 'filled' but with full width,
      fab:  `text-white ${className}`,
  }

  // Apply block class if block prop is true
  const blockStyle = block ? 'w-full' : '';

  const isFab = size.includes('fab') || (!title && icon)

  // Combine all the styles
  const combinedStyles = `${sizeStyle[size]} ${variantStyles[variant]} ${blockStyle} ${className}  ${disabled ? 'opacity-50' :' ' }`;


 


  return (
              <TouchableOpacity 
                    onPress={onPress}
                     disabled={disabled || isLoading}
                     className={`${combinedStyles} rounded-full items-center justify-center `}>
                     {isLoading ?
                         (<Text>Activity Indicator</Text>) :
                         (<View className={`flex-row  items-center justify-center  ${isFab ? 'gap-0' : 'gap-2'}`}>
                             { icon && ( <Text className={`${variantTextStyles[variant]}`}><Icon name={icon} size={iconSize} /></Text>)}
                             {title && <Text className={`${variantTextStyles[variant] }  font-medium text-lg`}>{title}</Text>}
                         </View >)}
                 </TouchableOpacity>
  );
};

export default Button;
