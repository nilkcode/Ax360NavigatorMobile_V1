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

    getCraftListBySId:async (obj) => {
         const response = await apiClient.post(`/api/cmn/getCraftListBySId`,obj)
       return response;
    },

     getCraftListByObjectId:async (obj) => {
         const response = await apiClient.post(`/api/cmn/getCraftListByObjectId`,obj)
       return response;
    }


//       getCraftListByObjectId(idDto: { id21: number; id22: number, id23: number, id51: boolean, id67: string, id24: number, id25: number }): Promise<CraftList[]> {
//     return firstValueFrom(this.http.post<CraftList[]>(`${serviceConfig.apiUrl}/api/cmn/getCraftListByObjectId`, idDto));
//   }

  

   



  
    
}



export default commonServices