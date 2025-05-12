import apiClient from "../axiosInstance";


const authService = {
    login: async (credentials) => {
        const response = await apiClient.post('/api/token', credentials)
        return response;
    }
    
}


export default authService