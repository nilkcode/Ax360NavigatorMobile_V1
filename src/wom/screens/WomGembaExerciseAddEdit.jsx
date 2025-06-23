import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-native-modal'
import Header from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'
import DropDownBox from '../../components/Dropdown/DropDownBox'
import InputDateTimePicker from '../../components/DateTimePicker/InputDateTimePicker'
import TextBox from '../../components/InputsTextBox/TextBox'
import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/Buttons/Button'
import { workType, studyType } from '../../enums/globalenums'
import WomGembaExcerciseFormArray from '../components/WomGembaExcerciseFormArray'
import { useSelector, useDispatch } from 'react-redux'
import commonServices from '../../services/common/commonService'
import { createExcercise, fetchExercises } from '../../redux/slices/exerciseSlice'
import womServices from '../../services/wom/womService'
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loaders/Loader'
import { useNavigation, useRoute } from '@react-navigation/native'



const WomGembaExerciseAddEdit = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch();
    const route = useRoute()
    const [error, setError] = useState({})
    const { user } = useSelector((state) => state.auth)
    const { ItemId = null, IsmodeReadOnly } = route.params || {};
    const { exerciseList, loading, success } = useSelector((state) => state.exercises);
    const [craftList, setCraftList] = useState([])
    const [selectedCraft, setSelectedCraft] = useState('')
    const [locationList, setLocationList] = useState()
    const craftRef = useRef(null);
    const navigation = useNavigation()
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isShowFormMode, setIsShowFormMode] = useState(IsmodeReadOnly)
    const [submittedExercise, setSubmittedExercise] = useState([])
    const [submittedCraftList, setSubmittedCraftList] = useState([])
    const { moduleId } = useSelector((state) => state.moduleId)
    const [exerciseId, setExerciseId] = useState('')
    const [isCraftListLoaded, setIsCraftListLoaded] = useState(false);
    const [actionHeader, setActionHeader] = useState(false)
    const [actionHeaderTitle, setActionHeaderTitle] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);


    // this useState use for craftList edit 
    const [shouldPatchCraft, setShouldPatchCraft] = useState(false); // flag for patching

    const [formData, setFormData] = useState({
        id: 0,
        studyDate: null,
        objectId: null,
        workType: null,
        description: null,
        studyType: null,
        expectedTime: null,
        area: null,
        location: null,
    });

    // console.log(IsmodeReadOnly)


    // useEffect(() => {
    //     if (ItemId !== null) {
    //         getUserExerciseDetail(ItemId);
    //     } 
    // }, [ItemId]);

    useEffect(() => {
        getCraftListBySId()
        getLocationList()


        if (ItemId !== null && isShowFormMode) {
            // Viewing an existing exercise
            setActionHeaderTitle('Submit');
            getUserExerciseDetail(ItemId);
        } else if (ItemId !== null && !isShowFormMode) {
            // Editing existing exercise
            setActionHeaderTitle('Delete');
        } else {
            // New exercise (form mode with no ID)
            setActionHeaderTitle('');
        }
    }, [ItemId, isShowFormMode]);


    // useEffect(() => {
    //     getCraftListBySId()
    //     getLocationList()

    //     if (isFormSubmitted) {
    //         var idDtoForList = {
    //             id: user?.companyId,
    //             id1: user?.siteId
    //         }
    //         dispatch(fetchExercises(idDtoForList))
    //     }
    // }, [isFormSubmitted])


    // useEffect(() => {
    //     if (isFormSubmitted && exerciseList.length > 0 && exerciseId) {
    //         // Now Redux has the latest list after fetchExercises
    //         const latestExercise = exerciseList.filter((item) => item.id === Number(exerciseId));
    //         const [exercise] = latestExercise;

    //         console.log(exercise)
    //         if (latestExercise) {
    //             setSubmittedExercise(exercise); // ✅ patch latest data
    //             getCraftListByObjectId(exercise); // ✅ patch craft form
    //         }
    //         setIsShowFormMode(true)
    //         setActionHeader(true)
    //     }
    // }, [exerciseList, exerciseId])



    useEffect(() => {
        if (shouldPatchCraft && craftRef.current) {
            const craftString = submittedExercise?.craftString || ''; // e.g. "61-1~47-1~"
            craftRef.current.patchCraftFormArray(craftString,);
            setShouldPatchCraft(false); // reset flag
        }
    }, [shouldPatchCraft]);



    useEffect(() => {
        if (isCraftListLoaded && submittedExercise?.craftString) {
            patchCraftList(submittedExercise.craftString);
        }
    }, [isCraftListLoaded, submittedExercise]);





    // This Existing craftList Code 

    const getCraftListBySId = async () => {
        var idDto = {
            id: user?.companyId,
            id1: user?.siteId,
        }
        const response = await commonServices.getCraftListBySId(idDto);
        setCraftList(response.data)
        setIsCraftListLoaded(true); // ✅ Mark as loaded
    };


    // This is GET Location List  
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

    // This is HandleSubmit Exercise List 


    const handleSelectCraft = (selectedCraftValue) => {
        setSelectedCraft(selectedCraftValue)
    }


    // This is method for getCraftListByObjectId when form submited
    const getCraftListByObjectId = async (latestExercise) => {
        const idDto = {
            id21: +user?.companyId,
            id22: +user?.siteId,
            id23: moduleId,
            id51: false,//this.isFromSourceTbl,
            id67: 'G',
            id24: latestExercise?.id,
            id: null, // objectNum
            id25: 0   // 0 - jpo-original skills,1- jpo-optimized-skills
        };


        const response = await commonServices.getCraftListByObjectId(idDto)
        setSubmittedCraftList(response.data)

    }




    // This method for Submitting Exercise   
    const handleSubmitExcercirseDetail = async () => {
        //validation of form 
        const isValidate = formValidate()
        if (!isValidate) {
            Toast.show({
                type: "error",
                text1: "Please fill required fields",
            });
            return;
        }
        // Step 2 - Create idDto Object
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
        // try {
        //     const response = await dispatch(createExcercise(idDto)).unwrap(); // ✅
        //     if (response) {

        //         if (formData?.id === 0) {
        //             Toast.show({
        //                 type: "success",
        //                 text1: `${success}`,
        //             });
        //             setIsFormSubmitted(true);
        //             setExerciseId(response)

        //         } else {

        //             setIsFormSubmitted(true);
        //             setExerciseId(formData?.id)
        //             Toast.show({
        //                 type: "success",
        //                 text1: `Form Updated Successfully`,
        //             });
        //         }

        //     }
        // } catch (error) {
        //     Alert.alert(`Error: ${error}`);
        // }
        // setFormData({
        //     id: '',
        //     studyDate: new Date(),
        //     objectId: '',
        //     workType: '',
        //     description: '',
        //     studyType: '',
        //     expectedTime: '',
        //     area: '',
        //     location: '',
        // })
        // craftRef.current?.clearCraftFormArray(); // ✅ clears the child component's form
        //  navigation.push('/wom-mob-gemba-exercise-list')
        try {
            const response = await dispatch(createExcercise(idDto)).unwrap();
            if (response) {
                const isNew = formData?.id === 0;
                Toast.show({
                    type: "success",
                    text1: isNew ? success : "Form Updated Successfully",
                });

                setExerciseId(isNew ? response : formData?.id);

                const idDtoForList = {
                    id: user?.companyId,
                    id1: user?.siteId,
                };

                dispatch(fetchExercises(idDtoForList)).unwrap().then((newList) => {
                    const latestExercise = newList.find(item => item.id === Number(isNew ? response : formData?.id));
                    if (latestExercise) {
                        setSubmittedExercise(latestExercise);
                        getCraftListByObjectId(latestExercise);
                        setIsShowFormMode(true);
                        setActionHeader(true);
                    }
                });

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
                });
                craftRef.current?.clearCraftFormArray();
            }
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }

    };



    //Form Validation Method on Submit and Edit

    const formValidate = () => {
        const newError = {};

        if (!formData.objectId || formData.objectId.trim() === '') {
            newError.objectId = `WorkOrder is required`;
        }
        if (!formData.description || formData.description.trim() === '') {
            newError.description = `Description is required`
        }
        if (!formData.workType) {
            newError.workType = `WorkType  is required`
        }
        if (!formData.studyType) {
            newError.studyType = `StudyType  is required`
        }
        setError(newError)
        // Return true if there are no error
        return Object.keys(newError).length === 0
    }

    const getUserExerciseDetail = (userId) => {
        setIsShowFormMode(true)
        const exerciseDetail = exerciseList.filter((item) => item.id === userId)
        patchCraftList(exerciseDetail[0].craftString)
        setSubmittedExercise(...exerciseDetail);
    }


    const patchCraftList = (craftString) => {
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
                    qty: String(qty),
                };
            }

            // fallback for not found
            return { id, qty: String(qty) };
        });

        //   // Add an empty row with numeric qty
        //   parsedArray.push({ id: '', qty: 1 });

        setSubmittedCraftList(parsedArray)


    }


    // This is method for handleEditExerciseDetail

    const handleEditExerciseDetail = () => {
        setIsShowFormMode(false)
        setFormData({
            id: submittedExercise?.id || 0,
            studyDate: new Date(submittedExercise?.formatedStudyDate || ''),
            objectId: submittedExercise?.objectId || '',
            workType: submittedExercise?.workType || '',
            description: submittedExercise?.description || '',
            studyType: submittedExercise?.studyType || '',
            expectedTime: submittedExercise?.expectedTime?.toString() || '',
            area: submittedExercise?.location || '',
            location: submittedExercise?.location || '',
        })

        // Patch craft data string
        //  setActionHeader(true)
        setShouldPatchCraft(true); // trigger patch in effect


    }

    // this header actions

    const handlePressExerciseAction = (headerTitle) => {
        switch (headerTitle) {
            case 'Submit':
                // logic for submitting
                console.log('Submit logic executed');
                break;
            case 'Delete':
                // logic for deleting
               toggleModal()

                break;
            case 'Lock':
                // logic for editing
                console.log('Edit logic executed');
                break;
            default:
                console.warn('Unknown action:', headerTitle);
        }
    }

    // const deleteExercise =  () => {

    //     console.log('delete exercise')
    // }

    const toggleModal =  (status) => {
         setModalVisible(!isModalVisible);
        if (status === 1) {
            var idDto = {
                id: user?.companyId,
                id1: user?.siteId,
            }
             
           
            setModalVisible(!isModalVisible);
        } else {
            setModalVisible(!isModalVisible);
        }

    }

    console.log(ItemId)


    return (
        <>
            <View>
                <Header back={true} backScreen={'/wom-mob-gemba-exercise-list'} leftActionTitle="Exercises" rightActionTitle={actionHeaderTitle} handlePressRight={() => handlePressExerciseAction(actionHeaderTitle)} headerTitle="Exercises" />
            </View>
            <View className="bg-blue-200 p-4 my-3 mx-4 rounded-lg ">
                <Text className="text-lg font-medium text-center">Observer : Nilesh Kahalkar</Text>
            </View>
            <KeyboardAvoidingView className="flex-1 flex-col flex-grow " behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
                {!isShowFormMode ? (<ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled">
                    <View className="mb-4">
                        <View className="">
                            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Exercise Date </Text>
                        </View>
                        <View>
                            <InputDateTimePicker placeholder='' onDateChange={(date) => setFormData({ ...formData, studyDate: date })} />
                        </View>

                    </View>
                    <View className="mb-4">
                        <View className="">
                            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>WorkOrder <Text className=" text-red-500">*</Text>
                            </Text>

                        </View>
                        <View>
                            <TextBox placeholder='Enter Work Order' isValidation={true} value={formData.objectId}
                                onChangeText={(text) => setFormData({ ...formData, objectId: text })} />
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
                                onChangeText={(text) => setFormData({ ...formData, description: text })} />
                        </View>
                        {error.description && <Text className="text-red-500 relative left-4">{error.description}</Text>}

                    </View>
                    <View className="flex-row gap-4">
                        <View className="mb-4 w-[48%]">
                            <View className="">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Work Type <Text className=" text-red-500">*</Text></Text>
                            </View>
                            <View>
                                <DropDownBox placeholder='Work Type' data={workType} dropdownLabel='name' dropDownValue={workType.find(w => w.id === formData.workType)?.name} selectedValue={"id"} onSelect={(selected) => setFormData({ ...formData, workType: selected })} />
                            </View>
                            {error.workType && <Text className="text-red-500 relative left-4">{error.workType}</Text>}

                        </View>
                        <View className="mb-4 w-[48%]">
                            <View className="">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Study Type <Text className=" text-red-500">*</Text></Text>
                            </View>
                            <View>
                                <DropDownBox placeholder='Study Type' data={studyType} dropdownLabel='name' dropDownValue={studyType.find(s => s.id === formData.studyType)?.name} selectedValue={"id"} onSelect={(selected) => setFormData({ ...formData, studyType: selected })} />
                            </View>
                            {error.studyType && <Text className="text-red-500 relative left-4">{error.studyType}</Text>}

                        </View>
                    </View>
                    <View className="mb-4">
                        <View className="">
                            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Eastimated Min</Text>
                        </View>
                        <View>
                            <TextBox placeholder='Estimated Min' value={formData.expectedTime}
                                onChangeText={(text) => setFormData({ ...formData, expectedTime: text })} />
                        </View>
                    </View>
                    <View className="mb-4">
                        <View className="">
                            <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>Area</Text>
                        </View>
                        <View>
                            <DropDownBox placeholder='Area' data={locationList} dropdownLabel='name' dropDownValue={formData?.location} selectedValue={"name"} onSelect={(selected) => setFormData({ ...formData, location: selected })} />
                        </View>
                    </View>


                    <WomGembaExcerciseFormArray craftList={craftList}
                        onSelectCraft={handleSelectCraft} ref={craftRef}
                    />

                </ScrollView>) :
                    (
                        <ScrollView className="p-4 divide-y " contentContainerStyle={{ paddingBottom: 20 }}
                            keyboardShouldPersistTaps="handled">
                            <View className="mb-4 " >
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                    Exercise Date
                                </Text>
                                <Text className="mx-4 text-base text-gray-800">
                                    {submittedExercise?.formatedStudyDate || '--'}
                                </Text>
                            </View>

                            <View className="mb-4">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                    Work Order
                                </Text>
                                <Text className="mx-4 text-base text-gray-800">
                                    {submittedExercise?.objectId || '--'}
                                </Text>
                            </View>

                            <View className="mb-4">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                    Description
                                </Text>
                                <Text className="mx-4 text-base text-gray-800">
                                    {submittedExercise?.description || '--'}
                                </Text>
                            </View>

                            <View className="flex-row gap-4">
                                <View className="mb-4 w-[48%]">
                                    <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                        Work Type
                                    </Text>
                                    <Text className="mx-4 text-base text-gray-800">
                                        {submittedExercise?.workType || '--'}
                                    </Text>
                                </View>
                                <View className="mb-4 w-[48%]">
                                    <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                        Study Type
                                    </Text>
                                    <Text className="mx-4 text-base text-gray-800">
                                        {submittedExercise?.studyType || '--'}
                                    </Text>
                                </View>
                            </View>

                            <View className="mb-4">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                    Estimated Min
                                </Text>
                                <Text className="mx-4 text-base text-gray-800">
                                    {submittedExercise?.expectedTime || '--'}
                                </Text>
                            </View>

                            <View className="mb-4">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-2 mx-4`}>
                                    Area
                                </Text>
                                <Text className="mx-4 text-base text-gray-800">
                                    {submittedExercise?.location || '--'}
                                </Text>
                            </View>

                            <View className="mb-4 mx-4">
                                <Text className={`text-lg font-medium ${themes[theme].formLabel} mb-4 `}>Selected Craft Summary</Text>

                                {submittedCraftList.length > 0 ? (
                                    submittedCraftList.map((craft, index) => (
                                        <View key={index} className="border border-gray-300 p-2 rounded-xl mb-3 bg-white">
                                            <Text className="text-base font-medium text-gray-800 mb-1">
                                                {craft.name}
                                            </Text>

                                            <Text className="text-sm text-gray-600">
                                                <Text className="font-medium">Qty:</Text> {craft.qty}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="text-base text-gray-600">No craft selected.</Text>
                                )}
                            </View>


                        </ScrollView>
                    )

                }
                {!isShowFormMode ? (
                    <View className="flex-row px-4 py-8">
                        <Button title="Save" size="medium" block="true" onPress={handleSubmitExcercirseDetail} />
                    </View>
                )
                    : (
                        <View className="flex-row px-4 py-8">
                            <Button title="Edit" size="medium" block="true" onPress={handleEditExerciseDetail} />
                        </View>)
                }
            </KeyboardAvoidingView>



           


            <Loader visible={loading} />



        </>
    )
}

export default WomGembaExerciseAddEdit