import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name:'navigation',
    initialState:{
        lastScreen:'login',
        lastActiveTime:Date.now(),
    },
    reducers:{
        setLastScreen:(state, action) => {debugger
            state.lastScreen  = action.payload;
            state.lastActiveTime = Date.now()
        }
    }
})

export const {setLastScreen} = navigationSlice.actions;
export default navigationSlice.reducer