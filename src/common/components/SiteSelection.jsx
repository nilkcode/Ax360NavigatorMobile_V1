import { View, Text } from 'react-native'
import React from 'react'
import DropDownBox from '../../components/Dropdown/DropDownBox'


const SiteSelection = ({siteList, selectedValue,dropDownValue ,handleChangeSite}) => {




    return (
    <>
       <View className="my-2">
           <DropDownBox data={siteList} 
            placeholder={dropDownValue}
            onSelect={handleChangeSite}
            selectedValue={selectedValue} 
            dropdownLabel='siteIndustry'
            dropDownValue = {dropDownValue}
            
            />
       </View>
    </>
  )
}

export default SiteSelection