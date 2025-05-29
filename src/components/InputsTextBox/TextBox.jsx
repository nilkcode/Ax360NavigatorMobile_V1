import { View, Text,Platform,TextInput } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { themes } from '../../contexts/theme'
import { useTheme } from '../../contexts/ThemeContext'

const TextBox = ({
    isValidation = true,
    placeholder="Enter Text...",
    errorMessage = "Please Enter Valid input",
    value = "",
    onChangeText = () => {},
    inputType="text",
    customeClass

}
) => {
  const {theme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false)
//   const inputClasses = `
//   border-2  border-slate-500
// //   ${themes[theme].border} 
//   ${themes[theme].formInput}  
//   ${themes[theme].bgPrimary} 
//   px-4 h-16 text-lg font-medium rounded-full mb-5

// `;

 // Determine keybordType basend InputType

 const getKeyboardType = () => {
     switch(inputType) {
        case 'email':
        
        return "email-address";

        case "number":
            return "numeric";
        default:
            return "default";  //for text
     }
 }

 const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let emailpattern =  emailPattern.test(email);
  return emailpattern
};

 // Validation Logic

 const validationInput = (text) => {
    if(isValidation) {
        setError(text.trim().length === 0)
        if(inputType === "email") {
           setError(!validateEmail(text))
        }
    }
   
    onChangeText(text)
 }


  return (
       <>
          <View className="relative">
              <TextInput
                
                value={value}
                onChangeText={validationInput}
                keyboardType={getKeyboardType()}
                secureTextEntry={inputType === "password"}
                placeholder={placeholder}
                // style={{borderColor: isFocused ? `#3b82f6` :' '}}  
                  className={ `border border-gray-700 ${customeClass}  ${themes[theme].formInput} ${themes[theme].bgPrimary} ${isFocused && `border-blue-500 border`}
                  ${isValidation && error && `border-red-500` }
                    px-4 h-[50px] text-lg font-medium rounded-full `} // ✅ Using the variable here
                   onFocus={() =>  setIsFocused(true)}
                  onBlur={() => setIsFocused(false)} // Ensure onBlur to reset focus
                  placeholderTextColor={`${theme === "light" ? '#9ca3af' : '#9ca3af'}`}

           />
             {isValidation && error && (<Text className="px-6 absolute  -bottom-6 -left-1 text-red-500" >{errorMessage}</Text>) }
             </View>
        
       </>
  )
}

export default TextBox