import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'
import DropDownBox from '../../components/Dropdown/DropDownBox'
import TextBox from '../../components/InputsTextBox/TextBox'
import Icon from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler'

const WomGembaExcerciseFormArray = forwardRef(({ craftList, onSelectCraft,error  }, ref) => {
  const { theme } = useTheme()

  const [craftFormArray, setCraftFormArray] = useState([{ id: '', qty: '1' }]  || [])
  const [qtyValue, setQtyValue] = useState('')
  // useEffect(() => {

  // },[handleEditCraftList])


  useImperativeHandle(ref, () => ({

    clearCraftFormArray: () => {
      setCraftFormArray([{ id: '', qty: '1' }]);
      onSelectCraft('');
    },

    patchCraftFormArray: (craftString) => {
      if (!craftString) return;

      const normalize = craftString.replace(/~/g, ',').replace(/,+$/, '');

      const parsedArray = normalize.split(',').map(item => {
        const [idStr, qtyStr] = item.split('-');
        const id = parseInt(idStr, 10);
        const qty = parseInt(qtyStr, 10) || 1;

        const matchedCraft = craftList.find(craft => Number(craft.id) === id);

        if (matchedCraft) {
          return {
            ...matchedCraft,
            id,
            qty:String(qty),
          };
        }

        // fallback for not found
        return { id, qty: String(qty) };
      });

      // Add an empty row with numeric qty
      parsedArray.push({ id: '', qty: 1 });

      setCraftFormArray(parsedArray);
      
      onSelectCraft(generateCraftQtyString(parsedArray));


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



 

  const handleRemoveCraftForm = (index) => {
    if (craftFormArray.length === 1) {
      Alert.alert('At least one craft entry is required.')
      return
    }

    const updatedCraft = craftFormArray.filter((_, i) => i !== index)
    setCraftFormArray(updatedCraft)

      // 🔁 Update selectedCraft after removal
  onSelectCraft(generateCraftQtyString(updatedCraft));

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
          
            <DropDownBox
              placeholder="Select Craft"
              data={craftList}
              dropdownLabel="name"
              selectedValue={'id'}
              dropDownValue={craftList.find(c => c.id === item.id)?.name}
              onSelect={(selectedId) => handleCraftChange(index, 'id', selectedId)}
            />
          </View>

          {/* Quantity + Remove Button */}
          <View className="mb-4 w-[43%]">
           
            <View className="flex-row items-center justify-between gap-1">
              <View className={`${craftFormArray.length !== 1 ? 'w-[65%]' : 'w-full'}`}>
                <TextBox
                  isValidation={false}
                  inputType="number"
                  placeholder="Quantity"
                  className="flex-1"
                  value={item.qty}
                  onChangeText={(text) => handleCraftChange(index,'qty', text)}
                />
              </View>
              {
                craftFormArray.length !== 1 &&  index !== craftFormArray.length - 1 && <TouchableOpacity
                  className="bg-red-200 rounded-full p-3 "
                  onPress={() => handleRemoveCraftForm(index)}
                >
                  <Icon name="cross" size={20} color="red" />
                </TouchableOpacity>
              }

            </View>
          </View>
        </View>
      ))}
      {error?.selectedCraft ? craftFormArray.length > 1 ? ('') : <Text className="text-red-500 text-sm mt-1 mx-4">{error.selectedCraft}</Text>  : (
        <Text className="text-red-500 text-sm mt-1 mx-4">{error.selectedCraft}</Text>
      )} 
    </ScrollView>
  )
})

export default WomGembaExcerciseFormArray
