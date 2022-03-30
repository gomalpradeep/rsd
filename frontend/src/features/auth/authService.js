import axios from 'axios'

const API_URL = '/api/users'

//Registe User
const  register = async(userData) =>{
    const response = await axios.post(API_URL,
        userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
//Logout user

const logout = () => localStorage.removeItem('user')



//login User
const  login = async(userData) =>{
    const response = await axios.post(API_URL+'/login',
        userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
const authService = {
    register,
    logout,
    login
}


export default authService