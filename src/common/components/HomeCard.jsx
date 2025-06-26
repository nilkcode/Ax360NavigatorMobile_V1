import { View, Text,Image } from 'react-native'
import React,{memo} from 'react'
import Cards from '../../components/Cards'

import {themes} from '../../contexts/theme';
import {useTheme} from "../../contexts/ThemeContext"


const HomeCard = ({moduleName,imagePath,moduleDetails ,handlePress}) => {

    const { theme } = useTheme()



     const moduleImage = (moduleNa) => {
      switch (moduleNa) {
        case 'Asset Walkdown':
          return require('../../assets/modules/asset_registry.webp');
        case 'Gemba Exercises':
          return require('../../assets/modules/gemba_exercise.webp');
      
        default:
          return require('../../assets/modules/gemba_exercise.webp'); // fallback image
      }
    };
   
   
  return (
    <>
    {/* !bg-transparent !shadow-none !border-0 */}
         <Cards className='p-2 mb-2' handlePress={handlePress}>
          <View className="flex flex-row gap-4 items-center justify-between">
            <View >
              <Text   className={`${themes[theme].textPrimary} text-xl font-semibold`}>{moduleName}</Text>
              <Text   className={`${themes[theme].textPrimary} text-lg font-medium w-56`}>{moduleDetails}</Text>
            </View>
            <View className="p-2">
            <Image className="rounded-xl"  source={moduleImage(moduleName)}  resizeMode="cover" style={{width:65,height: 65 }} />
            </View>
          </View>
        </Cards>
    </>
  )
}

export default HomeCard