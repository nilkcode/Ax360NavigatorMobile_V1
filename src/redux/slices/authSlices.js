import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authServices/authService";



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // const response = await apiClient.post('/api/token', credentials);
      const response = await authService.login(credentials);
      let data =   JSON.parse(response.data)
      return data;
    } catch (err) {
      return rejectWithValue(err); // Already a clean string from interceptor
    }
  }
);




const authSlice = createSlice({
    name:'auth',
  initialState: {
    hasActiveDailogFlag: true,
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,

  },
    reducers:{
        
      updateStoreDataForUser: (state, action) => {
        state.user = action.payload;
        state.error = action.payload;
        state.isAuthenticated = action.payload;
        
      },

      logout: (state) => {
        state.user = null;
        state.error = null
        state.isAuthenticated = false;
        state.hasActiveDailogFlag = false;
      },

      setHasShownExerciseDialog: (state, action) => {
        state.hasActiveDailogFlag = action.payload;
      },

      
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.loading  = true;
            state.error = null;
        })
          .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload?.message) {
              // If backend return error message
              state.error = action.payload
            } else {
              state.user = action.payload
            }
            state.isAuthenticated = true
            state.loading = false;
            // state.user = action.payload;
          })
        .addCase(loginUser.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload; // 'Login failed'

        })
    
    }
})

export const {logout ,updateStoreDataForUser,setHasShownExerciseDialog} =  authSlice.actions;
export default authSlice.reducer;