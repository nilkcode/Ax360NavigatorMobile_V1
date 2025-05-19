import { View, Text,FlatList,ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { screenLayout } from '../../styles/style'
import { useSelector } from 'react-redux'
import womServices from '../../services/wom/womService'
import WomGembaExerciseListCard from '../components/WomGembaExerciseListCard'
import Loader from '../../components/Loaders/Loader'
import Footer from '../../components/Footer'

const WomGembaExerciseList = () => {

  const {moduleId}  = useSelector((state) => state.moduleId)
  const {user} = useSelector((state) => state.auth)
  const [caseStudyList,setCaseStudyList] = useState([])
  const [caseStudyListVisibleList, setCaseStudyListVisibleList] = useState([])
  const [hasMore, setHasMore]  = useState(true)
   const [loading, setLoading] = useState(true)
   const [dataLoader, setDataLoader] = useState(false)
   const Limit = 10
  

  console.log(user)

  useEffect(() => {
    getCaseStudyListBySId()
  }, [])
   
  const getCaseStudyListBySId = async () => {

    setLoading(true)

    var idDto = {
      id:user.companyId,
      id1:user.siteId
    }
    try {
          const response = await womServices.getCaseStudyListBySId(idDto)
          const data = response.data;

          setCaseStudyList(data);
          setCaseStudyListVisibleList(data.slice(0, Limit));
          if(data.length <= Limit) setHasMore(false)

    }catch(error) {
        console.error('API fetch error:', error);
    }finally {
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
    },500)
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
       <View className="p-4 flex flex-1">
         <FlatList  contentContainerStyle={{ paddingBottom: 70 }} data={caseStudyListVisibleList}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          renderItem={({item}) =><WomGembaExerciseListCard  studyTypeName={item.studyTypeName} formatedStudyDate={item.formatedStudyDate} description={item.description}/> }
          onEndReached={loadMoreList}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          />
       </View>

       <Footer/>

    </>
  )
}

export default WomGembaExerciseList