import { View, Text } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import DropDownBox from '../../components/Dropdown/DropDownBox'
import { useSelector,useDispatch } from 'react-redux'
import { role } from '../../enums/globalenums'
import { fetchSiteList ,setSelectedUserSite,} from '../../redux/slices/siteSelectionSlice'

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