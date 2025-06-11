import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer  from "./slices/authSlices";
import navigationReducer from "./slices/navigationSlices"
import siteSelectionReducer  from "./slices/siteSelectionSlice"
import moduleIdReducer from "./slices/moduleIdSlice"
import exerciseReducer from "./slices/exerciseSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({
    auth:authReducer,
    navigation:navigationReducer,
    siteselection:siteSelectionReducer,
    moduleId:moduleIdReducer,
    exercises:exerciseReducer
})


const persistConfig   = {
    key:'root',
    storage:AsyncStorage,
    whitelist:['auth','navigation','siteselection','moduleId','exercises']   // only persist 'auth' slice
}

const persistedReducer  = persistReducer(persistConfig, rootReducer)


const store  = configureStore({

    reducer:persistedReducer ,
    // reducer:{
    //     auth:authReducer,
      
    // },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
    devTools: true // ✅ Explicitly enable Redux DevTools
})

const persistor = persistStore(store)

export { store, persistor };