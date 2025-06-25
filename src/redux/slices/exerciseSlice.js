import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import womServices from "../../services/wom/womService";



// fetch excercise  
export const fetchExercises = createAsyncThunk('exercise/fetchAll', async (idDto , { rejectWithValue }) => {
    try {
      const response = await womServices.getCaseStudyListBySId(idDto);
      return response.data;
    } catch (error) {
      // Handles API errors gracefully
      return rejectWithValue(error.response?.data || error.message);
    }
});


// POST (Create Excercise)

export const createExcercise = createAsyncThunk('exercise/createExcercise', async (idDto, {rejectWithValue}) => {
   try {
      const response = await womServices.insertOrUpdateCaseStudyDetails(idDto);
      return response.data;

   }catch (error) {
     return rejectWithValue(error.response?.data)
   }
})


export const deleteExercise = createAsyncThunk('exercise/deleteExercise', async(idDto, { rejectWithValue }) => {
  try {
     await womServices.deleteCaseStudyById(idDto);
     return idDto.id21; // return the deleted ID
  } catch (error) {
    return rejectWithValue(error.response?.data)
  }
})



const exerciseSlice = createSlice({
    name:'exercises',
    initialState:{
        exerciseList:[],
        loading:false,
        error:null,
        success:null
    },

    reducers:{
       clearStatus:(state) => {
        state.error = null;
        state.success = null;
       }
    },
    extraReducers:(builder) => {
        builder
         .addCase(fetchExercises.pending, (state) => {state.loading = true})
         .addCase(fetchExercises.fulfilled,(state, action ) => {
            state.loading = false;
            state.exerciseList = action.payload
         })
         .addCase(fetchExercises.rejected,(state, action) => {
            state.loading = false;
            state.error =  action.payload
         })

            // createExercise
          .addCase(createExcercise.pending, (state) => {
            state.loading = true;
          })
          .addCase(createExcercise.fulfilled, (state, action) => {
            state.loading = false;
            state.success = 'Exercise created successfully!';
            state.exerciseList.push(action.payload); // ⬅️ Add new item to list
          })
          .addCase(createExcercise.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          
          // deleteExercise

          // delete
          .addCase(deleteExercise.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteExercise.fulfilled, (state, action) => {
            state.loading = false;
            state.success = "Exercise deleted successfully!";
            state.exerciseList = state.exerciseList.filter(
              (item) => item.id !== action.payload
            );
          })
          .addCase(deleteExercise.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });


    }
})



export const {clearStatus} =  exerciseSlice.actions;
export default exerciseSlice.reducer;