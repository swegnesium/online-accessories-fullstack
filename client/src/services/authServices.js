import api from './api'

// REGISTER POST
async function register(data){
    const response = await api.post(
        "auth/register",
        data
    );
    console.log(response?.data)
    return response
}


// LOGIN PSOT
async function login(data){
    const response = await api.post(
        "auth/login",
        data
    );
    console.log(response?.data)
    return response
}


const authService = {
    register, login
}

export default authService