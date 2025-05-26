import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { screenLayout } from '../../styles/style'
import { useSelector } from 'react-redux'
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


const safetyList = [
  { saftyDescription: 'Always follow your site’s safety protocols when using a mobile device. Please obey all safety signs, stickers, and tags.' },
  { saftyDescription: 'Do not use the application while walking or in motion.' },
  { saftyDescription: 'Always stop in a safe place to record information.' },
  { saftyDescription: 'Always be alert of your workspace and surrounding areas while using the application.' },
  { saftyDescription: 'Always wear the protective equipment that is intended for your task while using the App.' },
]



const WomGembaExerciseList = () => {

  const { moduleId } = useSelector((state) => state.moduleId)
  const { user } = useSelector((state) => state.auth)
  const [caseStudyList, setCaseStudyList] = useState([])
  const [caseStudyListVisibleList, setCaseStudyListVisibleList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dataLoader, setDataLoader] = useState(false)
  const [isShowWarningDailog, setWarningDailog] = useState(false)
  const [searchQuery , setSearchQuery] = useState('')
  const Limit = 10


const categories = [
  { label: 'All', value: 'all', color: '' },       // neutral gray
  { label: 'Completed', value: 'Completed', color: '#16a34a' }, // green
  { label: 'Pending', value: 'Pending', color: '#a3a3a3' }, // amber
  
];

  useEffect(() => {
    getCaseStudyListBySId()
  }, [])

  const getCaseStudyListBySId = async () => {

    setLoading(true)

    var idDto = {
      id: user.companyId,
      id1: user.siteId
    }
    try {
      const response = await womServices.getCaseStudyListBySId(idDto)
      const data = response.data;

      setCaseStudyList(data);
      setCaseStudyListVisibleList(data.slice(0, Limit));
      setWarningDailog(true)
      if (data.length <= Limit) setHasMore(false)

    } catch (error) {
      console.error('API fetch error:', error);
    } finally {
      setLoading(false)
    }
  };

  const loadMoreList = () => {
    if (dataLoader || !hasMore) return;

    setDataLoader(true)
    setTimeout(() => {
      const start = caseStudyListVisibleList.length;
      const end = start + Limit;
      const nextItems = caseStudyList.slice(start, end);

      if (nextItems.length === 0) {
        setHasMore(false);
        setDataLoader(false);
        return;
      }

      setCaseStudyListVisibleList(prev => [...prev, ...nextItems]);

      if (end >= caseStudyList.length) {
        setHasMore(false);
      }
      setDataLoader(false);
    }, 500)
  }

  const renderFooter = () => (
    dataLoader ? (
      <View className="flex justify-center">
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    ) : null
  );

  const handleFilterExercise = (items) => {
    
  }

  const handlePressMenuList = (item) => {
    Alert.alert(item)
  }

  const handleSearch = (text) => {
    debugger
    const filterData = caseStudyList.filter((filterItem) => filterItem.objectId?.toString().includes(text)  || filterItem.description?.toLowerCase().includes(text.toLowerCase()))
    setSearchQuery(text)   
    setCaseStudyListVisibleList(filterData)
  }

  console.log(searchQuery)

  console.log(caseStudyListVisibleList)
  
  console.log(caseStudyList)

  return (
    <>
      <Header back={true} leftActionTitle="Home" rightActionTitle="Home2" headerTitle="Exercises" />
 
       <SearchInputBox placeholder='Search Here..' onSearch={handleSearch}/>

      {/* <View className="py-5">
          <PillScrollFilter data={categories} labelName={'label'} color={'color'} handlePress={handleFilterExercise} />
      </View> */}
      <View className="px-4 flex flex-1">
        <FlatList contentContainerStyle={{ paddingBottom: 70 }} data={caseStudyListVisibleList}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          renderItem={({ item }) => <WomGembaExerciseListCard handlePressMenu={handlePressMenuList} objectId={item.objectId} studyTypeName={item.studyTypeName} formatedStudyDate={item.formatedStudyDate} description={item.description}
            itemIsCompleted={item.isCompleted} />}
          onEndReached={loadMoreList}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
      <Footer />
      <DailogModal show={isShowWarningDailog}  >
        <View className="flex-row items-center mb-2">
          <Text className=""><Icon className="text-green-800" color={'#ca8a04'} name="warning" size={40} /></Text>
          <Text className="text-lg font-medium">Your safety is your personal responsibility.</Text>
        </View>
        {
          safetyList.map((item, index) => (
            <View className="flex-row items-start p-4 gap-1 " key={index}>
              <Octicons className="text-green-800 px-1 py-1" color={'black'} name="dot-fill" size={12} />
              <Text className='flex-row gap-2 leading-5'>
                {item.saftyDescription}
              </Text>
            </View>
          ))
        }
        <View className="m-4">
          <Button title={"I Agree"} variant='filled' size='large' onPress={() => setWarningDailog(false)} ></Button>
        </View>

      </DailogModal>

    </>
  )
}

export default WomGembaExerciseList