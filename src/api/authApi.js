import axios from "axios";
import axiosInstant from "../services/axiosInstance";
import { encryptPayloadsUsingAES256 } from "../utlis/cryptoHelper";
import { BASE_URL } from "../config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const encryptedPayload = `Hb4KjVrdz8yjC8c0Vf62PFAYS5poUBcbVDumd66NMjtNJ+lSnm7oAlGtcCOzcoo15o3H+PuT5aWfsB7aXmBriJ1IjkxxU/39JbXI05nGXyhMhZqkEuvFcOQPXkT5qLvkOq1EJolXwUZwCvc29ZBXCGZhRXSeVBHqnqvkiGeOoik=` 





// export const loginUser = createAsyncThunk('users/loginUser', async (credentials) => {debugger
    
//      const encryptedPayload = encryptPayloadsUsingAES256(credentials);


//     const response = await axios.post(`${BASE_URL}/api/token`, encryptedPayload, {
//         headers: {
//             'Content-Type': 'text/plain',
//         }
//     });

//      let resNew  =  response.data
//      console.log(response.data)
//      return resNew;
    
//   });





// export const loginApi = async(credetials) => {debugger
//       const encryptedPayload =   encryptData(credetials);
//       const response = await axios.post('http://192.168.2.73:93/api/token',encryptedPayload, {
//         headers:{
//           'Content-Type': 'text/plain',
//         }
//       });

//       const decryptedData = decryptData(response.data);
//       return decryptedData;
// }


// export const loginApi = async(credetials) => { debugger
//    const encryptedPayload = encryptData(credetials);
   
    
//     const response  = await axiosInstant.post('/api/token/',{
//         payload:encryptedPayload
//     })


//     console.log(response)

//     // Descripted the respose from backend

//     const decryptedRespose =  decryptData(response.data);
//     return decryptedRespose;


// }