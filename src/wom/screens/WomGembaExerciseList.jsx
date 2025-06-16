import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { screenLayout } from '../../styles/style'
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
  const [hasMore, setHasMore] = useState(true)
  const [dataLoader, setDataLoader] = useState(false)
  // const [isShowWarningDailog, setWarningDailog] = useState(false)
  const [searchQuery , setSearchQuery] = useState('')
  const navigation  = useNavigation()
  const Limit = 10
  const { exerciseList,loading, error} = useSelector((state) => state.exercises);
  

  useEffect(() => {

    // if(!hasActiveDailogFlag) {
    //    dispatch(setHasShownExerciseDialog(true))
    // }
     
    var idDto = {
      id: user?.companyId,
      id1: user?.siteId
    }
    dispatch(fetchExercises(idDto))
    getCaseStudyListBySId()
  }, [dispatch])



  const handleCloseWarningDailog = () => {
     if(hasActiveDailogFlag) {
       dispatch(setHasShownExerciseDialog(false))
     }
  }




  const getCaseStudyListBySId = async () => {
      setCaseStudyListVisibleList(exerciseList.slice(0, Limit));
      if (exerciseList.length <= Limit) setHasMore(false)
  };

  const loadMoreList = () => {
    if (dataLoader || !hasMore) return;

    setDataLoader(true)
    setTimeout(() => {
      const start = caseStudyListVisibleList.length;
      const end = start + Limit;
      const nextItems = exerciseList.slice(start, end);

      if (nextItems.length === 0) {
        setHasMore(false);
        setDataLoader(false);
        return;
      }

      setCaseStudyListVisibleList(prev => [...prev, ...nextItems]);

      if (end >= exerciseList.length) {
        setHasMore(false);
      }
      setDataLoader(false);
    }, 500)
  }

  const renderFooter = () => (
    loading ? (
      <View className="flex justify-center">
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    ) : null
  );

 

  const handleSearch = (text) => {
    const filterData = exerciseList.filter((filterItem) => filterItem.objectId?.toString().includes(text)  || filterItem.description?.toLowerCase().includes(text.toLowerCase()))
    setSearchQuery(text)   
    setCaseStudyListVisibleList(filterData)
  }

  const handlePressOpenExerciseDetail = (item) => {
     navigation.navigate('wom-mob-gemba-exercise-add-edit' , {
       ItemId:item?.id || null,
       IsmodeReadOnly: false, // indicate read-only mode
     })
  }

  

  return (
    <>
      <Header back={true} backScreen={'home'} leftActionTitle="Home" rightActionTitle="Home2" headerTitle="Exercises" />
 
       <SearchInputBox placeholder='Search Here..' onSearch={handleSearch}/>

      {/* <View className="py-5">
          <PillScrollFilter data={categories} labelName={'label'} color={'color'} handlePress={handleFilterExercise} />
      </View> */}
      <View className="px-4 flex flex-1">
        <FlatList contentContainerStyle={{ paddingBottom: 70 }} data={caseStudyListVisibleList}
         keyExtractor={(item, index) => (item.id ? item.id.toString() : `index-${index}`)}
          renderItem={({ item }) => <WomGembaExerciseListCard  objectId={item.objectId} studyTypeName={item.studyTypeName} formatedStudyDate={item.formatedStudyDate} description={item.description}
          handlePressOpenExerciseDetail={() => handlePressOpenExerciseDetail(item)}
            itemIsCompleted={item.isCompleted} />}
          onEndReached={loadMoreList}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}

        />
        {/* handlePressDescription={handlePressDescription} handlePressMenu={handlePressMenuList} */}
      </View>
      <Footer  />
      <DailogModal show={hasActiveDailogFlag}  >
        <View className="flex-row items-center mb-2">
          <Text className=""><Icon className="text-green-800" color={'#ca8a04'} name="warning" size={40} /></Text>
          <Text className="text-lg font-medium">Your safety is your personal responsibility.</Text>
        </View>
        {
          safetyList.map((item, index) => (
            <View className="flex-row items-start  p-4 gap-1 " key={index}>
             <Text><Octicons className="text-green-800 px-1 py-1" color={'black'} name="dot-fill" size={12} /></Text> 
              <Text className='flex-row gap-2 leading-5'>
                {item.saftyDescription}
              </Text>
            </View>
          ))
        }
        <View className="m-4">
          <Button title={"I Agree"} variant='filled' size='large' onPress={handleCloseWarningDailog} ></Button>
        </View>

      </DailogModal>

    </>
  )
}

export default WomGembaExerciseList