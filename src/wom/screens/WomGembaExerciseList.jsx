import { View, Text, FlatList, ActivityIndicator } from 'react-native'
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
  const Limit = 10


const categories = [
  { label: 'All', value: 'all', color: '#9CA3AF' },       // neutral gray
  { label: 'Tech', value: 'tech', color: '#3B82F6' },     // blue
  { label: 'Health', value: 'health', color: '#10B981' }, // green
  { label: 'Sports', value: 'sports', color: '#F59E0B' }, // amber
  { label: 'Finance', value: 'finance', color: '#8B5CF6' }, // purple
  { label: 'Travel', value: 'travel', color: '#EF4444' }, // red
  { label: 'Food', value: 'food', color: '#EC4899' },     // pink
  { label: 'Education', value: 'education', color: '#0EA5E9' }, // sky blue
  { label: 'Movies', value: 'movies', color: '#14B8A6' }, // teal
  { label: 'Music', value: 'music', color: '#F43F5E' }    // rose
];


  console.log(user)

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





  console.log(caseStudyList)
  return (
    <>
      <Header back={true} leftActionTitle="Home" rightActionTitle="Home2" headerTitle="Exercises" />

      

            <PillScrollFilter data={categories} labelName={'label'} color={'color'} />
        
     


      <View className="px-4 flex flex-1">
        <FlatList contentContainerStyle={{ paddingBottom: 70 }} data={caseStudyListVisibleList}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          renderItem={({ item }) => <WomGembaExerciseListCard studyTypeName={item.studyTypeName} formatedStudyDate={item.formatedStudyDate} description={item.description} />}
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