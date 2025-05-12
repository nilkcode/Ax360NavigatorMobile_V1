import apiClient from "../axiosInstance";
import { store } from "../../redux/store";

const commonServices = {



    
    getSiteListByCompanyId: async (idDto) => {
        const response = await apiClient.post('/api/cmn/getSiteListByCompanyId', idDto)
        return response;
    },

    getSiteListByUserRoleId : async (idDto) => {
        const response = await apiClient.post('/api/cmn/getSiteListByUserRoleId', idDto)
        return response;
    },
    getAllCompanies: async ()  => {
        const response = await apiClient.post('/api/cmn/getAllCompanies')
        return response;
    },

    getModuleListByUserAndSid: async (obj) => {
       const response = await apiClient.post(`/api/cmn/getMobModuleListByUserAndSId`,obj)
       return response;
    },

  

   



  
    
}



export default commonServices