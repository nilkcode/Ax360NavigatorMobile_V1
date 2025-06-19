import { View, Text, Alert,Image ,ScrollView , } from 'react-native'
import React, { use, useEffect ,useRef,useState} from 'react'
import { screenLayout } from '../../styles/style'
import Header from '../../components/Header'
import Cards from '../../components/Cards'
import Logo  from "../../assets/images/360Nav_logo.svg"
import {themes} from '../../contexts/theme';
import {useTheme} from "../../contexts/ThemeContext"
import HomeCard from '../components/HomeCard'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout, updateStoreDataForUser } from '../../redux/slices/authSlices'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Buttons/Button'
import DailogModal from '../../components/Modal/DailogModal'

import SiteSelection from '../components/SiteSelection'
import { role } from '../../enums/globalenums'
import { setModuleId ,removeModuleId } from '../../redux/slices/moduleIdSlice'
import { fetchSiteList,setSelectedUserSite,setIsOpenSiteDropdownlistComponent, resetSiteSelectionState } from '../../redux/slices/siteSelectionSlice'
import commonServices from '../../services/common/commonService'
import Loader from '../../components/Loaders/Loader'
import {setLastScreen} from  "../../redux/slices/navigationSlices"






const Home = () => {


    const intervalIdRef   = useRef(null)
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [moduleList, setModuleList] = useState([])
    const [siteListData, setSiteListData] = useState([])
    const [selecteSite, setSelectedSite] = useState(null)
    const [isOpenSiteDropDown, setIsOpenSiteDropDown] = useState(false)
    const [loading, setLoading] = useState(true)
     const {user,isAuthenticated} = useSelector((state) => state.auth)
    const {moduleId} = useSelector((state) => state.moduleId)


  const getModuleListBySId = async (SId) => {
    var idDto = {
      id21: +user.companyId,
      id22: +SId,
      id23: +user?.userId
    }
    const response = await commonServices.getModuleListByUserAndSid(idDto);
    setModuleList(response.data)
    
  };
  
  
  
    const next = () => {
      // implement interval logic
    };


   

   
  useEffect(() => {
      if (!user) return;
      if (user.isCompanyAccess === true) {
        //  dispatch(fetchCompanyList());
        return 
      } else {
    
         if(selecteSite) {
          dispatch(setIsOpenSiteDropdownlistComponent(false));
          getModuleListBySId(user?.siteId);
         }else {
          const idDto = {
            id: +user.roleId === role.companyAdmin ? user.companyId : user.userId
          };
          const fetchSiteList = async () => {
            setLoading(true)
            const response =
              +user.roleId === role.companyAdmin
                ? await commonServices.getSiteListByCompanyId(idDto)
                : await commonServices.getSiteListByUserRoleId(idDto);
              
              setSiteListData(response.data)
              setLoading(false)
            if(siteListData.length > 1) {
              setSelectedSite(siteListData[0])
              setIsOpenSiteDropDown(true)
             
            }else {
               setSelectedSite(siteListData[0]);
               onSelectedSiteSubmitEvent()
            }
  
          }
          fetchSiteList()
          
         }
      }

       
         if (siteListData.length === 1) {
            onSelectedSiteSubmitEvent()
         }
  


  }, [siteListData]);


  
 

    const handleLogout = () => {
        dispatch(logout())
        dispatch(resetSiteSelectionState())
        navigation.navigate('login')
    }


    const handleChangeSite = (value) => {
       let selectedSite =  siteListData.find((item) => item.id === value)
       setSelectedSite(selectedSite)
    };


    const onSelectedSiteSubmitEvent = () => {
         getModuleListBySId(selecteSite?.id)
         handleCloseSiteDropDown()

    }

    const handleCloseSiteDropDown = () => {
       setIsOpenSiteDropDown(false)
    }
    const handlePressEvent = (item) => {
       dispatch(removeModuleId(item.moduleId));
       dispatch(setModuleId(item.moduleId))
       dispatch(setLastScreen(item.redirectURL))
       navigation.navigate(item.redirectURL);
    
    }
  


  return (
    <>
      <View style={screenLayout} >
        <Header rightActionTitle={"Logout"} handlePressRight={handleLogout} />
        <View className="flex flex-col text-center justify-center items-center mb-10">
          <Logo width={250} height={80} />
          <Text className={`${themes[theme].textPrimary} text-2xl font-medium`}>Welcome, {user?.fullName}</Text>
          <Text className={`${themes[theme].textPrimary} text-2xl font-medium`}>Selected Site- {selecteSite?.siteName}</Text>

        </View>
        <ScrollView >
          <View className="flex flex-1 flex-col gap-4">

            {moduleList.length > 0 ? ( moduleList.map((module, index) => (
              <HomeCard key={index} moduleName={module.mobileModuleName} moduleDetails={module.description} imagePath={module.mobileBackGroundImagePath} 
              handlePress={() => handlePressEvent(module)}/>
            )) ) : (<Text className="text-center"> No module List found </Text>)}
          </View>
        </ScrollView>
       
      </View>
      <Loader visible={loading}/>
      <DailogModal title="Select Site"  show={isOpenSiteDropDown} onClose={handleCloseSiteDropDown}>
        <SiteSelection siteList={siteListData}  selectedValue={'id'} 
         dropDownValue={selecteSite?.siteIndustry} 
        handleChangeSite={handleChangeSite}   />
        <View className="mt-4">
                 <Button title={"Select Site"} variant='filled' size='medium'  onPress={onSelectedSiteSubmitEvent} />
          </View>
      </DailogModal>

    </>
    // selectedSiteID={}
)
}

export default Home