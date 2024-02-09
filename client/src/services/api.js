import axios from "axios";
import { toast } from "react-toastify";


// CREATE AXIOS INSTANCE FOR API
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// AXIOS RESPONSE INTERCEPTOR
api.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status &&
        error.response.status < 500;


    if(!expectedError) {
        // Could implement a loggin system for errors
        console.log(`Interceptors - ${error}`);
        toast.error('Unexpected Error')
    } else {
        console.log(`${error?.response.data}`);
        toast.error(`${error.response.data}`)
    }


    return Promise.reject(error)
});

// SETTING DEFAULT CONFIGS (header token)
export function setHeaderToken(){
    const token = localStorage.getItem("userToken");
    if(token){
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
     delete api.defaults.headers.common['Authorization'];   
    }
}
setHeaderToken();

export default api