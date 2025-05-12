import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonServices from "../../services/common/commonService";


export const fetchSiteList = createAsyncThunk(
  'siteSeletion/fetchSiteList',
  //  async({roleId,companyId,userId, role }, rejectWithValue) =>{
  //   try {
  //     const idDto = {
  //       id: +roleId === role.companyAdmin ? companyId : userId
  //     };
  //     const response =
  //     +roleId === role.companyAdmin
  //       ? await commonServices.getSiteListByCompanyId(idDto)
  //       : await commonServices.getSiteListByUserRoleId(idDto);
      
  //       return response.data
  //   } catch (err) {
  //     return rejectWithValue(err || 'Site list fetch failed'); // Already a clean string from interceptor
  //   }
  //  }
);

const siteSeletionSlice = createSlice({
   name:'siteSelection',
   initialState:{
    siteList: [],
    userProfileData: null,
    selectedSite:null,
    isOpenSiteDropdownlistComponent: false,
    loading: false,
    error: null
   },

   reducers:{ 
      
     

     setSelectedUserSite:(state, action)=> {
        state.selectedSite = action.payload;
     },
     setIsOpenSiteDropdownlistComponent:(state, action) => {
      state.isOpenSiteDropdownlistComponent = action.payload;
     },

     resetSiteSelectionState: (state) => {
      state.siteList = [];
      state.userProfileData = null;
      state.selectedSite = null;
      state.isOpenSiteDropdownlistComponent = false;
      state.loading = false;
      state.error = null;
}
     
   },

   extraReducers: (builder) => {
    builder
      .addCase(fetchSiteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteList.fulfilled, (state, action) => {
        state.siteList = action.payload;
        state.loading = false;
      })
      .addCase(fetchSiteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

})


export const { setSelectedUserSite, setIsOpenSiteDropdownlistComponent,resetSiteSelectionState} = siteSeletionSlice.actions;

export default siteSeletionSlice.reducer;