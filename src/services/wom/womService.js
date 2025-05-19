import apiClient from "../axiosInstance";
import { store } from "../../redux/store";

const womServices = {
    getCaseStudyListBySId: async (obj) => {
        const response = await apiClient.post('/api/wom/getCaseStudyListBySId', obj)
        return response;
    },



}



export default womServices