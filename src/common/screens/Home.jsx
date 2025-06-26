import { View, Text,FlatList} from 'react-native'
import React, { use, useCallback, useEffect ,useRef,useState} from 'react'
import { screenLayout } from '../../styles/style'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header'
import Cards from '../../components/Cards'
import Logo  from "../../assets/images/360Nav_logo.svg"
import {themes} from '../../contexts/theme';
import {useTheme} from "../../contexts/ThemeContext"
import HomeCard from '../components/HomeCard'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout, setHasShownExerciseDialog, updateStoreDataForUser } from '../../redux/slices/authSlices'
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
    const [hasInitialSiteSelectionDone, setHasInitialSiteSelectionDone] = useState(false);

    const [isOpenSiteDropDown, setIsOpenSiteDropDown] = useState(false)
    const [loading, setLoading] = useState(true)
    const {user,isAuthenticated} = useSelector((state) => state.auth)
    const [userName, setUserName] = useState('User Name')


  useEffect(() => {
    if(user){
      setUserName(`${user.firstName.toUpperCase()}`)
    }
  },[user])  



  // Memoized Function
  const getModuleListBySId = useCallback(async (SId) => {
    var idDto = {
      id21: +user.companyId,
      id22: +SId,
      id23: +user?.userId
    }
    const response = await commonServices.getModuleListByUserAndSid(idDto);
    setModuleList(response.data)
    
  },[user]);


  const fetchSiteListData = useCallback(async () => {
    setLoading(true);
     const idDto = {
      id: +user.roleId === role.companyAdmin ? user.companyId : user.userId,
    };

   const response = +user.roleId === role.companyAdmin
      ? await commonServices.getSiteListByCompanyId(idDto)
      : await commonServices.getSiteListByUserRoleId(idDto);
    
  setSiteListData(response.data);
  setLoading(false);


    if (response.data.length > 1 && !hasInitialSiteSelectionDone) {
      setSelectedSite(response.data[0]);
      setIsOpenSiteDropDown(true);
      setHasInitialSiteSelectionDone(true);

    } else {
      setSelectedSite(response.data[0]);

      // skip modal
      // ✅ Now manually fetch here since modal is not shown
      getModuleListBySId(response.data[0].id);
      setIsOpenSiteDropDown(false);
      setHasInitialSiteSelectionDone(true);
    }
  },[user, hasInitialSiteSelectionDone])

  // Fetch site list once user is available
  useEffect(() => {
    if (!user || user.isCompanyAccess) return;
    fetchSiteListData();
  }, [user]);



  // Handle auto-site selection when siteListData length is 1
  useEffect(() => {
    if (siteListData.length === 1) {
      setSelectedSite(siteListData[0]);
    }
  }, [siteListData]);



  
  
  
  



    const handleLogout = useCallback(() => {
        dispatch(logout())
        dispatch(resetSiteSelectionState())
        navigation.navigate('login')
    },[dispatch, navigation])


    const handleChangeSite = useCallback((value) => {
       let selectedSite =  siteListData.find((item) => item.id === value)
       setSelectedSite(selectedSite)
    },[siteListData]);


    const onSelectedSiteSubmitEvent = useCallback(() => {
      if(selecteSite?.id) {
             getModuleListBySId(selecteSite?.id)
         handleCloseSiteDropDown()
      }
    },[selecteSite,getModuleListBySId])

    const handleCloseSiteDropDown = () => {
       setIsOpenSiteDropDown(false)
    }


    const handlePressEvent = useCallback((item) => {
       dispatch(removeModuleId(item.moduleId));
       dispatch(setModuleId(item.moduleId))
       dispatch(setLastScreen(item.redirectURL))
      
       if(item.redirectURL === "/wom-mob-gemba-exercise-list") {
               dispatch(setHasShownExerciseDialog(true))
       }   
        navigation.navigate(item.redirectURL);
       
    },[dispatch, navigation])

 

  return (
    <>
      <View className="flex-1">
        <View>
          <Header  leftActionTitle={"Logout"} leftIconName="chevron-left" isLeftIcon={true}  handlePressLeft={handleLogout} rightActionTitle={userName} handlePressRight={false} isRightIcon={true} rightIconName="user" />

        </View>
        <View className="flex-2">
          <View className="flex flex-col text-center justify-center items-center mb-10">
            <Logo width={250} height={80} />
            <Text className={`${themes[theme].textPrimary} text-2xl font-medium`}>Welcome, {user?.fullName}</Text>
            <Text className={`${themes[theme].textPrimary} text-2xl font-medium`}>Selected Site- {selecteSite?.siteName}</Text>
          </View>
          <FlatList
            data={moduleList}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <HomeCard
                moduleName={item.mobileModuleName}
                moduleDetails={item.description}
                imagePath={item.mobileBackGroundImagePath}
                handlePress={() => handlePressEvent(item)}
              />
            )}
            ListEmptyComponent={<Text className="text-center">No module list found</Text>}
          />
        </View>
        </View>
         
      <DailogModal title="Select Site"  show={isOpenSiteDropDown} onClose={() => setIsOpenSiteDropDown(false)}>
        <SiteSelection siteList={siteListData}  selectedValue={'id'} 
         dropDownValue={selecteSite?.siteIndustry} 
        handleChangeSite={handleChangeSite}   />
        <View className="mt-4">
                 <Button title={"Select Site"} variant='filled' size='medium'  onPress={onSelectedSiteSubmitEvent} />
          </View>
      </DailogModal>


       <Loader visible={loading}/>

    </>
)
}

export default Home