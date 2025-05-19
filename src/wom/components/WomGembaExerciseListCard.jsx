import { View, Text } from 'react-native'
import React from 'react'
import Cards from '../../components/Cards'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'

const WomGembaExerciseListCard = ({studyTypeName,formatedStudyDate,description}) => {

 const {theme}  = useTheme()

  return (
    <>
      <Cards className={"mb-2"}>
              <View className="flex-col p-2 justify-between">
                  <View className="flex-row  justify-between">
                      <Text className={`${themes[theme].textPrimary} text-xl font-semibold`}>{studyTypeName}</Text>
                      <Text className={`${themes[theme].textPrimary} text-lg font-medium `}>{formatedStudyDate}</Text>
                  </View>
                  <View >
                      <Text className={`${themes[theme].textPrimary} text-lg font-medium `}>{description}</Text>
                  </View>
              </View>
      </Cards>
    </>
  )
}

export default WomGembaExerciseListCard