import { createSlice } from "@reduxjs/toolkit";

const moduleIdSlice = createSlice({
    name:'moduleId',
    initialState:{
        moduleId:null,
    },
    reducers:{
        setModuleId:(state, action) => {
            state.moduleId  = action.payload;
        },
        removeModuleId:(state,) => {
            state.moduleId  = null;
        }
    }
})

export const {setModuleId,removeModuleId} = moduleIdSlice.actions;
export default moduleIdSlice.reducer;