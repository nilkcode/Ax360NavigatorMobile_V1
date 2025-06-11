import { createSlice } from "@reduxjs/toolkit";

const craftListSlice = createSlice({
    name:'craftList',
    initialState:{
        craftList:[],
    },
    reducers:{
        setCraftList:(state, action) => {
            state.craftList  = action.payload;
        },
        removeModuleId:(state,) => {
            state.craftList  = null;
        }
    }
})

export const {setCraftList}  = craftListSlice.actions;
export default craftListSlice.reducer