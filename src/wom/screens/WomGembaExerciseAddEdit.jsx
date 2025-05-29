import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import Header from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'
import DropDownBox from '../../components/Dropdown/DropDownBox'
import InputDateTimePicker from '../../components/DateTimePicker/InputDateTimePicker'
import TextBox from '../../components/InputsTextBox/TextBox'
import Icon  from 'react-native-vector-icons/Entypo'
import Button from '../../components/Buttons/Button'
import { workType, studyType } from '../../enums/globalenums'

const WomGembaExerciseAddEdit = () => {
 const {theme}  = useTheme()

   const [formData, setFormData] = useState({
    exerciseDate: '',
    objectId:'',
    workType: '',
    description: '',
    studyType: '',
    expectedTime: '',
    area: '',
    craft: null,
    quantity: '',
    studyDate: '',
    location: ''
  });

  
 console.log(formData)
//  console.log(studyType)



 const handleSelecteDropDown = (value) => {
    console.log(value)
 }


 const handlePressDropDown = () => {
 }
  return (
    <>
    <View>
       <Header back={true} leftActionTitle="Home" rightActionTitle="Launch" headerTitle="Exercises" />
    </View>
    <View className="bg-blue-200 p-4 my-3 mx-4 rounded-lg ">
            <Text className="text-lg font-medium text-center">Observer : Nilesh Kahalkar</Text>
    </View>
    <KeyboardAvoidingView className="flex-1 flex-col flex-grow " behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <ScrollView className="p-4"   contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled">
                  <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Exercise Date </Text>
                      </View>
                      <View>
                          <InputDateTimePicker placeholder=''  onDateChange={(date) => setFormData({ ...formData, exerciseDate: date })} />
                      </View>
                  </View>
                  <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>WorkOrder <Text className=" text-red-500">*</Text>
                          </Text>
                          
                      </View>
                      <View>
                          <TextBox placeholder='Enter Work Order'   value={formData.objectId}
                       onChangeText={(text) => setFormData({...formData, objectId:text})} />
                      </View>
                  </View>
                  <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Description <Text className=" text-red-500">*</Text></Text>
                      </View>
                      <View>
                          <TextBox placeholder='Enter Worder Description'  
                           value={formData.description}
                       onChangeText={(text) => setFormData({...formData, description:text})} />
                      </View>
                  </View>
                  <View className="flex-row gap-4">
                      <View className="mb-4 w-[48%]">
                          <View className="">
                              <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Work Type <Text className=" text-red-500">*</Text></Text>
                          </View>
                          <View>
                              <DropDownBox placeholder='Work Type' data={workType} dropdownLabel='name' dropDownValue={workType?.name}  selectedValue={"name"}  onSelect={(selected) => setFormData({...formData, workType:selected})} />
                          </View>
                      </View>
                      <View className="mb-4 w-[48%]">
                          <View className="">
                              <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Study Type <Text className=" text-red-500">*</Text></Text>
                          </View>
                          <View>
                              <DropDownBox placeholder='Study Type' data={studyType} dropdownLabel='name'  selectedValue={"name"}  onSelect={(selected) => setFormData({...formData, studyType:selected})} />
                          </View>
                      </View>
                  </View>
                   <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Eastimated Min</Text>
                      </View>
                      <View>
                          <TextBox placeholder='Estimated Min' />
                      </View>
                  </View>
                   <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Area</Text>
                      </View>
                      <View>
                          <TextBox placeholder='Area' />
                      </View>
                  </View>
                  
                     <View className="flex-row gap-4">
                      <View className="mb-4 w-[48%]">
                          <View className="">
                              <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Craft <Text className=" text-red-500">*</Text></Text>
                          </View>
                          <View>
                              <DropDownBox placeholder='Enter Access Code' />
                          </View>
                      </View>
                      <View className="mb-4 w-[48%]">
                            <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Quantity <Text className=" text-red-500">*</Text></Text>
                      </View>
                      <View className="flex-row w-[75%] items-center gap-4">
                          <TextBox placeholder='Quantity' />
                         <TouchableOpacity className="bg-red-200 rounded-full ">
                            <Text>
                                <Icon name="cross" size="25" color="red"/>
                            </Text>
                            </TouchableOpacity> 
                      </View>
                      </View>
                  </View>
           
        </ScrollView>
        <View className="flex-row px-4 py-8">
             <Button title="Save" size="medium" block="true"  />
        </View>
    </KeyboardAvoidingView>
    </>
  )
}

export default WomGembaExerciseAddEdit