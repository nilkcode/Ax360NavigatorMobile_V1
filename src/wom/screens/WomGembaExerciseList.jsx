import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { screenLayout } from '../../styles/style'
import { useSelector } from 'react-redux'

const WomGembaExerciseList = () => {

  const {moduleId}  = useSelector((state) => state.moduleId)


  return (
    <>
       <View style={screenLayout}>
          <Header headerTitle="ExerciseList" />
           <Text className="text-lg">Module ID - {moduleId} </Text>
       </View>

    </>
  )
}

export default WomGembaExerciseList