import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Cards from '../../components/Cards'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../contexts/theme'
import  Icon  from 'react-native-vector-icons/Entypo'

const WomGembaExerciseListCard = ({objectId, studyTypeName,formatedStudyDate,description,itemIsCompleted, handlePressDescription,handlePressOpenExerciseDetail}) => {

 const {theme}  = useTheme()

  return (
    <>
      <Cards className={"mb-2"}  isLeftBorderActive={true} borderColor={`${itemIsCompleted === 1 ? '#22c55e' :'#94a3b8' }`}>
              <View className="flex-col gap-1 p-2 justify-between">
                  <View className="flex-row  justify-between">
                     <Text className={`${themes[theme].textPrimary} text-base font-medium`}>{objectId}</Text>
                     <View className='flex-row gap-2 items-center '>
                        <Text className={`${themes[theme].textPrimary} text-base font-medium  `}>{formatedStudyDate}</Text>
                       <TouchableOpacity onPress={handlePressOpenExerciseDetail} className="pl-2"><Text><Icon name='dots-three-vertical' size={16}  /></Text></TouchableOpacity> 
                     </View>
                     
                  </View>
                    
                  <View className="flex-row  justify-between">
                      <Text className={`${themes[theme].textPrimary} text-lg font-medium`}>{studyTypeName}</Text>
                     
                  </View>
                  <View >
                     <TouchableOpacity onPress={handlePressDescription}> <Text className={`${themes[theme].textPrimary} text-base font-medium !text-blue-600`}>{description}</Text></TouchableOpacity>
                  </View>
              </View>
      </Cards>
    </>
  )
}

export default WomGembaExerciseListCard