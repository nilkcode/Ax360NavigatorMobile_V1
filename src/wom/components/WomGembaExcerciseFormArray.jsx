import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState,forwardRef, useImperativeHandle } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'
import DropDownBox from '../../components/Dropdown/DropDownBox'
import TextBox from '../../components/InputsTextBox/TextBox'
import Icon from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler'

const WomGembaExcerciseFormArray = forwardRef(({ craftList, onSelectCraft  },ref) => {
  const { theme } = useTheme()

  const [craftFormArray, setCraftFormArray] = useState([{ id: '', qty: '1' }])

  
  useImperativeHandle(ref ,() => ({ 
    
    clearCraftFormArray: () => {
      setCraftFormArray([{ id: '', qty: '1' }]);
      onSelectCraft('');
    }
  }))


  const handleCraftChange = (index, field, value) => {
    const updatedCraft = [...craftFormArray]
    updatedCraft[index][field] = value

    // Add new row if last row has a valid craft selected
    if (field === 'id' && value !== '' && index === craftFormArray.length - 1) {
      updatedCraft.push({ id: '', qty: '1' })
    }

    setCraftFormArray(updatedCraft)
     onSelectCraft(generateCraftQtyString(updatedCraft))

  }

  const handleQtyChange = (index, value) => {
    const updatedCraft = [...craftFormArray]
    updatedCraft[index].qty = value
    setCraftFormArray(updatedCraft)
    onSelectCraft(generateCraftQtyString(updatedCraft))

  }

  const handleRemoveCraftForm = (index) => {
    if (craftFormArray.length === 1) {
      Alert.alert('At least one craft entry is required.')
      return
    }

    const updatedCraft = craftFormArray.filter((_, i) => i !== index)
    setCraftFormArray(updatedCraft)

  }

  const generateCraftQtyString = (array) => {
  return array
    .filter(item => item.id !== '') // avoid empty row
    .map(item => `${item.id}-${item.qty}`)
    .join('~') + '~'; // add trailing ~
}

  return (
    <ScrollView>
      <View className="flex-row gap-4" >
          {/* Craft Dropdown */}
          <View className=" w-[48%]">
            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
              Craft <Text className="text-red-500">*</Text>
            </Text>
           
          </View>

          {/* Quantity + Remove Button */}
          <View className=" w-[45%]">
            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
              Quantity <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row items-center justify-between gap-1">
              <View className={`${craftFormArray.length !== 1 ? 'w-[80%]' : 'w-full'}`} >
              
              </View>
              
             
            </View>
          </View>
        </View>
      {craftFormArray.map((item, index) => (  
        <View className="flex-row gap-4" key={index}>
          {/* Craft Dropdown */}
          <View className="mb-2 w-[48%]">
            {/* <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
              Craft <Text className="text-red-500">*</Text>
            </Text> */}
            <DropDownBox
              placeholder="Select Craft"
              data={craftList}
              dropdownLabel="name"
              selectedValue={'id'}
               dropDownValue={craftList.find(c => c.id === item.id)?.name}
              onSelect={(selected) => handleCraftChange(index, 'id', selected)}
            />
          </View>

          {/* Quantity + Remove Button */}
          <View className="mb-4 w-[45%]">
            {/* <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
              Quantity <Text className="text-red-500">*</Text>
            </Text> */}
            <View className="flex-row items-center justify-between gap-1">
              <View className={`${craftFormArray.length !== 1 ? 'w-[80%]' : 'w-full'}`} >
                <TextBox
                  inputType="number"
                  placeholder="Quantity"
                  className="flex-1"
                  value={item.qty}
                  onChangeText={(text) => handleQtyChange(index, text)}
                />
              </View>
              {
                craftFormArray.length !== 1 &&   <TouchableOpacity
                className="bg-red-200 rounded-full p-2 ml-2"
                onPress={() => handleRemoveCraftForm(index)}
              >
                <Icon name="cross" size={20} color="red" />
              </TouchableOpacity>
              }
             
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
})

export default WomGembaExcerciseFormArray
