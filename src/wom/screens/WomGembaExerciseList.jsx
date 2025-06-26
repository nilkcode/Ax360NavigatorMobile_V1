import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import womServices from '../../services/wom/womService'
import WomGembaExerciseListCard from '../components/WomGembaExerciseListCard'
import Loader from '../../components/Loaders/Loader'
import Footer from '../../components/Footer'
import DailogModal from '../../components/Modal/DailogModal'
import Icon from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Button from '../../components/Buttons/Button'
import PillScrollFilter from '../../components/PillScrollFilter'
import SearchInputBox from '../../components/InputsTextBox/SearchInputBox'
import { useNavigation } from '@react-navigation/native'
import { setLastScreen } from '../../redux/slices/navigationSlices'
import { fetchExercises } from '../../redux/slices/exerciseSlice'
import { setHasShownExerciseDialog } from '../../redux/slices/authSlices'


const safetyList = [
  { saftyDescription: 'Always follow your site’s safety protocols when using a mobile device. Please obey all safety signs, stickers, and tags.' },
  { saftyDescription: 'Do not use the application while walking or in motion.' },
  { saftyDescription: 'Always stop in a safe place to record information.' },
  { saftyDescription: 'Always be alert of your workspace and surrounding areas while using the application.' },
  { saftyDescription: 'Always wear the protective equipment that is intended for your task while using the App.' },
]



const WomGembaExerciseList = () => {
  const dispatch = useDispatch()
  const { user ,hasActiveDailogFlag,isAuthenticated} = useSelector((state) => state.auth)
  const [caseStudyListVisibleList, setCaseStudyListVisibleList] = useState([])
  const [searchQuery , setSearchQuery] = useState('')
  const navigation  = useNavigation()
  const [filteredList, setFilteredList] = useState([]);
  const { exerciseList,loading, error} = useSelector((state) => state.exercises);
  

  useEffect(() => {
    if (user?.companyId && user?.siteId) {
      const idDto = {
        id: user.companyId,
        id1: user.siteId
      };
      dispatch(fetchExercises(idDto));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (exerciseList?.length) {
      setFilteredList(exerciseList);
    }
  }, [exerciseList]);

  const handleCloseWarningDailog = () => {
    if (hasActiveDailogFlag) {
      dispatch(setHasShownExerciseDialog(false))
    }
  }



  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredList(exerciseList);
      return;
    }

    const filtered = exerciseList.filter((item) =>
      item.objectId?.toString().includes(text) ||
      item.description?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handlePressOpenExerciseDetail = (item) => {
    navigation.navigate('wom-mob-gemba-exercise-add-edit', {
      ItemId: item?.id,
      IsmodeReadOnly: true, // indicate read-only mode
    })
  }

  const onShowAddNewExercise = () => {
     navigation.navigate('wom-mob-gemba-exercise-add-edit', {
      IsmodeReadOnly: false, // indicate read-only mode
    })
  }





  return (
    <>
      <View className="flex-1 ">
        <View >
          <Header back={true} backScreen={'home'} leftActionTitle="Home" headerTitle="Exercises" />
        </View>
        <View className="flex-2 mx-4" >

          <SearchInputBox placeholder='Search Here..' onSearch={handleSearch} />

          {/* <Text>{filteredList.length}</Text> */}
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            data={filteredList}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `index-${index}`
            }
            renderItem={({ item }) => (
              <WomGembaExerciseListCard
                objectId={item.objectId}
                studyTypeName={item.studyTypeName}
                formatedStudyDate={item.formatedStudyDate}
                description={item.description}
                handlePressOpenExerciseDetail={() =>
                  handlePressOpenExerciseDetail(item)
                }
                itemIsCompleted={item.isCompleted}
              />
            )}
            onEndReachedThreshold={0.5}

          />





        </View>
        <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={0.9}
          onPress={() => onShowAddNewExercise()}
        >
          <View className="flex-row items-center">
                <Text className="text-white">
            <Icon name="add" size={24} />
          </Text>
          <Text style={styles.buttonText}>Add Exercise</Text>
          </View>
      
        </TouchableOpacity>
      </View>
      {/* <Footer handlePressCenter={onShowAddNewExercise} /> */}
      <DailogModal show={hasActiveDailogFlag}  >
        <View className="flex-row items-center  justify-center mb-2 gap-3">
          <Text className=""><Icon className="text-green-800" color={'#ca8a04'} name="warning" size={40} /></Text>
         <View >
          <Text className="text-lg font-medium" numberOfLines={3} >Your safety is your </Text>
          <Text className="text-lg font-medium">personal responsibility
            </Text>
         </View>
          
        </View>
        {
          safetyList.map((item, index) => (
            <View className="flex-row  p-4 gap-2 " key={index}>
              <Text><Octicons className="text-green-800 px-1 py-1" color={'black'} name="dot-fill" size={12} /></Text>
              <Text className='flex-row gap-2 leading-5' >
                {item.saftyDescription}
              </Text>
            </View>
          ))
        }
        <View className="m-4">
          <Button title={"I Agree"} variant='filled' size='medium' onPress={handleCloseWarningDailog} ></Button>
        </View>

      </DailogModal>

    </>
  )
}

export default WomGembaExerciseList



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // Tailwind's gray-300
  },
  floatingButton: {
    position: 'absolute',
    bottom: 38, // Tailwind's bottom-6
    left: '50%',
    transform: [{ translateX: -100 }], // Half of button width to center it
    backgroundColor: '#3b82f6', // Blue-500
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999, // Fully rounded
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: 200, // Required for centering transform
    alignItems: 'center',
    zIndex: 100,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
