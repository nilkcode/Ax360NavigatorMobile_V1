import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React , {useEffect, useState ,useRef} from 'react'
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
import WomGembaExcerciseFormArray from '../components/WomGembaExcerciseFormArray'
import { useSelector,useDispatch } from 'react-redux'
import commonServices from '../../services/common/commonService'
import { createExcercise } from '../../redux/slices/exerciseSlice'
import womServices from '../../services/wom/womService'
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loaders/Loader'
import { useNavigation } from '@react-navigation/native'


const WomGembaExerciseAddEdit = () => {
    const {theme}  = useTheme()
    const dispatch = useDispatch();
    const [error , setError] = useState({})
    const { user } = useSelector((state) => state.auth)
    const { exerciseList, loading, success } = useSelector((state) => state.exercises);
    const [craftList, setCraftList] = useState([])
    const [selectedCraft, setSelectedCraft] = useState('')
    const [locationList, setLocationList] = useState()
    const craftRef = useRef();
    const navigation = useNavigation()

 const [formData, setFormData] = useState({
    id:0,
    studyDate: '',
    objectId:'',
    workType: '',
    description: '',
    studyType: '',
    expectedTime: '',
    area: '',
    location: '',
  });

  
  
 

    useEffect(() => {
        getCraftListBySId()
        getLocationList()
    },[])

    // This craftList Code 

    const getCraftListBySId = async () => {
        var idDto = {
            id: user?.companyId,
            id1: user?.siteId,
        }
        const response = await commonServices.getCraftListBySId(idDto);
        setCraftList(response.data)

    };

        const getLocationList = () => {
        const locations = exerciseList.filter(
        (item, i, arr) => item.location && arr.findIndex(t => t.location === item.location) === i
        );

        const locationObj = locations.map((item, index) => ({
        id: `${index + 1}`,
        name: item.location
        }));

        setLocationList(locationObj); // ✅ Set the full new list
        };


    const handleSelectCraft = (selectedCraftValue) => {
         setSelectedCraft(selectedCraftValue)
    }




  
    
 const handleSubmitExcercirseDetail = async () => {debugger

 //validation of form first
 const isValidate =   formValidate()
  if(!isValidate) {
       Toast.show({
            type: "error",
            text1: "Please fill required fields",
        });
    return;
  }



  // Step 2 - Create DTO Object


  const idDto = {
    id1: formData?.objectId?.trim() || null,
    id2: formData?.description?.trim() || null,
    id3: user?.fullName,
    id4: 'P',
    id5: null,
    id6: null,
    id7: null,
    id8: null,
    id9: selectedCraft,
    id10: formData?.location?.trim() || null,
    id21: +user?.userId,
    id22: +user?.companyId,
    id23: +user?.siteId,
    id24: formData?.id,
    id25: formData?.workType,
    id26: formData?.studyType,
    id27: +user?.userId,
    id28: null,
    id29: null,
    id41: Number(formData?.expectedTime),
    id61: new Date(formData?.studyDate),
    id62: null
  };

  // Step 3 - Call API


     try {debugger
         const response = await dispatch(createExcercise(idDto)).unwrap(); // ✅
         if (response) {
             if (formData?.id === 0) {

                 Toast.show({
                     type: "success",
                     text1: `${success}`,
                 });
             } else {
                 Alert.alert(`Failed to save: ${response?.message || 'Unknown error'}`);
             }
         }


     } catch (error) {
         Alert.alert(`Error: ${error}`);
     }
     setFormData({
         id: '',
         studyDate: new Date(),
         objectId: '',
         workType: '',
         description: '',
         studyType: '',
         expectedTime: '',
         area: '',
         location: '',
     })
      craftRef.current?.clearCraftFormArray(); // ✅ clears the child component's form
    //  navigation.push('/wom-mob-gemba-exercise-list')
};

//Form Validation Method
const formValidate = () => {
    const newError = {};

    if(!formData.objectId || formData.objectId.trim() === ''){
        newError.objectId = `WorkOrder is required`;
    }
    if(!formData.description || formData.description.trim() === '') {
        newError.description = `Description is required`
    }
    if(!formData.workType ) {
         newError.workType = `WorkType  is required`
    }
    if(!formData.studyType) {
         newError.studyType = `StudyType  is required`
    }

    setError(newError)

    // Return true if there are no error

    return Object.keys(newError).length === 0
  
}
// handle clear craft when submit form





  return (
    <>
    <View>
       <Header back={true} backScreen={'/wom-mob-gemba-exercise-list'} leftActionTitle="Home" rightActionTitle="Launch" headerTitle="Exercises" />
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
                          <InputDateTimePicker placeholder=''  onDateChange={(date) => setFormData({ ...formData, studyDate: date })} />
                      </View>
                  </View>
                  <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>WorkOrder <Text className=" text-red-500">*</Text>
                          </Text>
                          
                      </View>
                      <View>
                          <TextBox placeholder='Enter Work Order'  isValidation={true}  value={formData.objectId}
                       onChangeText={(text) => setFormData({...formData, objectId:text})} />
                         {error.objectId && <Text className="text-red-500 relative left-4">{error.objectId}</Text>}
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
                      {error.description && <Text className="text-red-500 relative left-4">{error.description}</Text>}

                  </View>
                  <View className="flex-row gap-4">
                      <View className="mb-4 w-[48%]">
                          <View className="">
                              <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Work Type <Text className=" text-red-500">*</Text></Text>
                          </View>
                          <View>
                              <DropDownBox placeholder='Work Type' data={workType} dropdownLabel='name' dropDownValue={workType.find(w => w.id === formData.workType)?.name}  selectedValue={"id"}  onSelect={(selected) => setFormData({...formData, workType:selected})} />
                          </View>
                      {error.workType && <Text className="text-red-500 relative left-4">{error.workType}</Text>}

                      </View>
                      <View className="mb-4 w-[48%]">
                          <View className="">
                              <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Study Type <Text className=" text-red-500">*</Text></Text>
                          </View>
                          <View>
                              <DropDownBox placeholder='Study Type' data={studyType} dropdownLabel='name'  dropDownValue={studyType.find(s => s.id === formData.studyType)?.name}    selectedValue={"id"}  onSelect={(selected) => setFormData({...formData, studyType:selected})} />
                          </View>
                          {error.studyType && <Text className="text-red-500 relative left-4">{error.studyType}</Text>}

                      </View>
                  </View>
                   <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Eastimated Min</Text>
                      </View>
                      <View>
                          <TextBox placeholder='Estimated Min'   value={formData.expectedTime}
                          onChangeText={(text) => setFormData({...formData, expectedTime:text})} />
                      </View>
                  </View>
                   <View className="mb-4">
                      <View className="">
                          <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Area</Text>
                      </View>
                      <View>
                              <DropDownBox placeholder='Area' data={locationList} dropdownLabel='name' dropDownValue={formData?.location}   selectedValue={"name"}  onSelect={(selected) => setFormData({...formData, location:selected})} />
                        </View>
                  </View>


               <WomGembaExcerciseFormArray craftList={craftList} 
                onSelectCraft={handleSelectCraft}    ref={craftRef} />
                  
        </ScrollView>
        <View className="flex-row px-4 py-8">
             <Button title="Save" size="medium" block="true" onPress={handleSubmitExcercirseDetail}  />
        </View>
    </KeyboardAvoidingView>
    <Loader visible={loading} />

    </>
  )
}

export default WomGembaExerciseAddEdit