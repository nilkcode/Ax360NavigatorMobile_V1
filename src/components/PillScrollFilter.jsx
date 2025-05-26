import { View, Text ,ScrollView,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {  } from 'react-native-gesture-handler'
import Icon from  'react-native-vector-icons/FontAwesome'

const PillScrollFilter = ({children, labelName ,data,color,handlePress}) => {
  return (
    <> 
     
      <View className="flex-row  gap-2" >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {
            data.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(item[labelName])}>
                 
                <View className="bg-neutral-200 px-6 p-2 rounded-lg mx-1 flex-row items-center gap-2"> 
                  {item.color && <Icon name='circle' size={20} color={item[color]} />}
                  <Text>{item[labelName]}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
       
     
    </>
  )
}

export default PillScrollFilter

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    marginRight: 10,
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
  },
});