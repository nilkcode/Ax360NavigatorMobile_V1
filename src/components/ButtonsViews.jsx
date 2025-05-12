import { View, Text, Alert,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from './Buttons/Button'
import { useTheme } from '../contexts/ThemeContext'
import { themes } from '../contexts/theme'
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonsViews = () => {


    const {theme} = useTheme()

  
    const handlePress = () => {
        Alert.alert("Hello")
    }



    return (
        <> 
          
             <View className="flex gap-3 ">
             <Text className={` ${themes[theme].textPrimary}`}>Filed Buttons</Text>
               
               <View className="flex-row justify-end">
                  <ScrollView horizontal={true} className="gap-2 flex flex-1" >
                    {/* <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} />
                     <AxButton variant="filled" size='medium'  icon="home"  disabled={false} title="Click" onPress={handlePress} /> */}

                  </ScrollView>
                     
               </View>

{/* 
               <AxButton variant="outline" size='large' icon="pen"  title="Click "   className='border-green-600 text-green-600'/>

               <AxButton variant="filled" size='large' icon="file" title="Click Me" disabled={false}  className='bg-green-600' onPress={handlePress}  />
    
               <AxButton variant="filled" size='large' icon="file" disabled={false} title="Click Me" className='bg-purple-500'  />

                <Text className={` ${themes[theme].textPrimary}`}>Outline Buttons</Text>


                <Text className={` ${themes[theme].textPrimary}`}>Outline Buttons</Text>

                <AxButton variant="filled"  size='large' disabled={true} title="Click Me"   className='' />
              
                <AxButton variant="outline"  size='large' disabled={true} title="Click Me" icon="user"   className='border-yellow-500 text-yellow-500' />
                
                <Text className={` ${themes[theme].textPrimary} uppercase `}>FAB Buttons</Text>

                <View className="flex-row justify-end gap-2 items-center">
                    <AxButton variant="fab" size='fabSmall'  icon="plus" disabled={false} />
                    <AxButton variant="fab" size='fabMedium'  icon="home" disabled={true}  />
                    <AxButton variant="fab" size='fabLarge'  icon="plus"  />
                </View>
                <Text className={` ${themes[theme].textPrimary} uppercase `}>Link Buttons</Text>
                <AxButton variant="link"    title="Please Add Time Stamp Detail"   /> */}


              
             </View>
        </>
    )
}

export default ButtonsViews